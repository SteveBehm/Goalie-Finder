insert into "users" (
  "userId",
  "username",
  "hashedPassword",
  "joinedAt",
  "profilePicUrl",
  "location",
  "position",
  "availability"
) values (
  1,
  'chrisosgood30',
  'jhwgugwfkfku',
  '2022-01-10',
  'images/chris osgood in net.jpg',
  'Detroit, MI',
  'Goalie for either',
  'Available to play goalie'
), (
  2,
  'patrickroy30',
  'jhwgugwfkfkua',
  '2022-01-12',
  'images/Patrick Roy goalie.jpg',
  'Denver, CO',
  'Goalie for either',
  'Available to play goalie'
), (
  3,
  'guylafleur1',
  'jhwgugwfkfkub',
  '2022-01-14',
  'images/Guy Lafleur photo.jpg',
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
