# Goalie Finder

A full stack web application for ice and roller hockey players to find goalies

## Technologies Used
  * React
  * Socket.IO
  * React Bootstrap
  * JavaScript
  * Node.Js
  * Express.Js
  * PostgreSQL
  * HTML5
  * babel
  * Webpack
  * Argon2
  * JSON webtoken
  * Dotenv
  * npm
## Try it
[Goalie Finder](http://goalie-finder-app.herokuapp.com/)
## Features
  * User can sign up
  * User can create a profile
  * User can login
  * User can view a list of all users
  * User can edit their profile
  * User can chat with other user in real-time
  * User can see previous messages between other user and them
  * User can see notifications for missed messages
  * User can follow a notification to chat with that user
  * User can notify other user of unread message when other user is not in chat
## Strecth Features
  * User can filter list of other users based on availability
  * User can sign out of account
## Preview
  ![Goalie Finder](assets/goalie-finder-1.gif)
  ![Goalie Finder](assets/goalie-finder-2.gif)
  ![Goalie Finder](assets/goalie-finder-3.gif)
## Development
#### System Requirements
  * Node.Js 16 or higher
  * NPM 6 or higher
  * Postgres

#### Getting Started
1. Clone the repository.

```shell
git clone https://github.com/SteveBehm/Goalie-Finder.git
cd Goalie-Finder
```

2. Install all dependencies with NPM.

```shell
npm install
```

3. Create a new .env file the .env.example file and copy it.
```shell
cp .env.example .env
```

4. This .env will also require you to populate some information.
  * You will need an AWS account, AWS access key ID, secret access key, and unique bucket name.
  * This is because users will store their images via S3
  * You can create an account [here](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all)
```shell
process.env.AWS_ACCESS_KEY_ID=yourkey
process.env.AWS_SECRET_ACCESS_KEY=yourkey
AWS_S3_BUCKET=yourbucketname
```

5. Start PostgreSQL
```shell
sudo service postgresql start
```
6. Check to see if PostgreSQL is running
```shell
sudo service postgresql status
```

7. Create a database (make sure it matches .env.example)
```shell
createdb yourDatabaseName
```

8. Import your database into Postgres
```shell
npm run db:import
```

9. Start the project. Once started, you can view the application by opening localhost:3000 in your browser
```shell
npm run dev
```

10. View your database through pgweb. Look at it in your browser at localhost:8081
```shell
pgweb --db=yourDatabaseName
```
