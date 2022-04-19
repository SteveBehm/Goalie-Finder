require('dotenv/config');
const db = require('./db');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');
const authorizationMiddleware = require('./authorization-middleware');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(staticMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

// user can sign in with their username and password
app.post('/api/users/sign-in', (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }

  const sql = `
    select "userId", "hashedPassword"
      from  "users"
     where "username" = $1;
  `;

  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      } else {
        argon2
          .verify(user.hashedPassword, password)
          .then(isMatching => {
            if (!isMatching) {
              throw new ClientError(401, 'invalid login');
            } else {
              const payloadObj = {
                userId: user.userId,
                username: username
              };
              const token = jwt.sign(payloadObj, process.env.TOKEN_SECRET);
              const payloadToken = { token: token, user: payloadObj };
              res.status(200).json(payloadToken);
            }
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});

// get all of the users data except the hashedPassword
app.get('/api/users', (req, res, next) => {
  const sql = `
    select "userId",
           "name",
           "joinedAt",
           "profilePicUrl",
           "location",
           "position",
           "availability"
      from "users"
    `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

// get a specific users profile based on their userId
app.get('/api/users/:userId', (req, res, next) => {
  const { userId } = req.params;

  const sql = `
    select "profilePicUrl",
           "name",
           "position",
           "location",
           "availability"
      from "users"
     where "userId" = $1;
  `;

  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

// update the users data with a specific userId
app.put('/api/me', uploadsMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const { name, position, location, availability } = req.body;
  const profilePicUrl = req.file
    ? `/images/${req.file.filename}`
    : null;

  const sql = `
    update "users"
       set "profilePicUrl" = coalesce($2, "profilePicUrl"),
           "name"          = $3,
           "position"      = $4,
           "location"      = $5,
           "availability"  = $6
     where "userId" = $1
 returning "profilePicUrl", "name", "position", "location", "availability";
    `;

  const params = [userId, profilePicUrl, name, position, location, availability];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err))
  ;
});

// get all messages between two users from conversations
app.get('/api/conversations/:otherUserId', (req, res, next) => {
  const { otherUserId } = req.params;
  const userId = req.user.userId;

  const sql = `
      select "conversations".*,
             "users"."username"
        from "users"
        join "conversations"
        on   "users"."userId" = "senderId"
       where ("recipientId" = $1 and "senderId" = $2)
          or ("recipientId" = $2 and "senderId" = $1)
    order by "sentAt" asc
      `;

  const params = [userId, otherUserId];
  db.query(sql, params)
    .then(result => res.json(result.rows))
    .catch(err => next(err));

});

// post a message to conversations
app.post('/api/conversations', (req, res, next) => {
  const senderId = req.user.userId;
  const { recipientId, content } = req.body;

  const sql = `
    insert into "conversations" ("senderId", "recipientId", "content", "sentAt")
    values ($1, $2, $3, now())
 returning *;
  `;

  const params = [senderId, recipientId, content];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

// chat code
io.on('connection', socket => {
  // console.log(`user connected: ${socket.id}`);

  socket.on('disconnect', () => {
    // console.log('user disconnected', socket.id);
  });
});

app.use(errorMiddleware);

server.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is running on port ${process.env.PORT}`);
});
