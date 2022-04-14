require('dotenv/config');
const db = require('./db');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();

app.use(staticMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

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

// get all of the conversations data
app.get('/api/conversations', (req, res, next) => {
  const sql = `
    select "conversationId",
           "senderId",
           "recipientId",
           "content",
           "sentAt"
      from "conversations
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

// update the users data with a specific userId
app.put('/api/users/:userId', (req, res, next) => {
  const { userId } = req.params;
  const { profilePicUrl, name, position, location, availability } = req.body;

  const sql = `
    update "users"
       set "profilePicUrl" = $2,
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
      res.json(result.rows);
    })
    .catch(err => next(err))
  ;
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
