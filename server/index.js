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
           "username",
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

// post a new users data to the database
app.post('/api/users', (req, res, next) => {
  // const sql = `
  //   insert into "users" ("username", "joinedAt", "profilePicUrl, "location", "position", "availability")
  //   vales ($1, (now()), $3, $4, $5, $6)
  //   returning *
  //   `;
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

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
