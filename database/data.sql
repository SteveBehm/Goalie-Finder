insert into "users" (
  "userId",
  "username",
  "name",
  "hashedPassword",
  "joinedAt",
  "profilePicUrl",
  "location",
  "position",
  "availability"
) values (
  1,
  'chrisosgood30',
  'Chris Osgood',
  'jhwgugwfkfku',
  '2022-01-10',
  '/images/chris-osgood.jpeg',
  'Detroit, MI',
  'Goalie for either',
  'Unavailable to play goalie'
), (
  2,
  'patrickroy30',
  'Patrick Roy',
  'jhwgugwfkfkua',
  '2022-01-12',
  '/images/patrick-roy.jpeg',
  'Denver, CO',
  'Goalie for either',
  'Available to play goalie'
), (
  3,
  'guylafleur1',
  'Guy Lafleur',
  'jhwgugwfkfkub',
  '2022-01-14',
  '/images/guy-lafleur.jpeg',
  'Montreal, QC',
  'Ice player',
  'Looking for goalie'
), (
  4,
  'ChrisOsgood30',
  'Christopher Osgood',
  'jhwgugwfkfkua',
  '2022-01-10',
  '/images/chris-osgood.jpeg',
  'Detroit, MI',
  'Goalie for either',
  'Unavailable to play goalie'
), (
  5,
  'PatrickRoy30',
  'Pat Roy',
  'jhwgugwfkfkuab',
  '2022-01-12',
  '/images/patrick-roy.jpeg',
  'Denver, CO',
  'Goalie for either',
  'Available to play goalie'
), (
  6,
  'GuyLafleur1',
  'Guyski Lafleur',
  'jhwgugwfkfkubc',
  '2022-01-14',
  '/images/guy-lafleur.jpeg',
  'Montreal, QC',
  'Ice player',
  'Looking for goalie'
);

insert into "conversations" (
  "senderId",
  "recipientId",
  "content",
  "sentAt"
) values (
  3,
  2,
  'Hey Pat, we could use a goalie if you are free?',
  '2022-01-14'
), (
  2,
  3,
  'Hi Guy, I am interested! What are the details?',
  '2022-01-14'
)
