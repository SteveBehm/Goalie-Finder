insert into "users" (
  "username",
  "name",
  "hashedPassword",
  "joinedAt",
  "profilePicUrl",
  "location",
  "position",
  "availability"
) values (
  'chrisosgood30',
  'Chris Osgood',
  '$argon2i$v=19$m=4096,t=3,p=1$2iIKd1MlrwMPc7eNwMFAUQ$Q7/1PCw/ZMw+i4jEkL+YDDH2hmuInppG+3FhXZQO6wI',
  '2022-01-10',
  '/images/chris-osgood.jpeg',
  'Detroit, MI',
  'Goalie for either',
  'Unavailable to play goalie'
), (
  'patrickroy30',
  'Patrick Roy',
  '$argon2i$v=19$m=4096,t=3,p=1$g6MBipTUxyG6QJeO5Imn9A$foSzOATBKS/scbTCvDHMx3Hs3PlgWvd2sRCJ9jNis0E',
  '2022-01-12',
  '/images/patrick-roy.jpeg',
  'Denver, CO',
  'Goalie for either',
  'Available to play goalie'
), (
  'guylafleur1',
  'Guy Lafleur',
  '$argon2i$v=19$m=4096,t=3,p=1$SnQSAlLIm1waJXwkSqTpCg$qFAY2rZUwPUkqTrxwm1OMM4fb8cgtdzHtEMxeCPAcaw',
  '2022-01-14',
  '/images/guy-lafleur.jpeg',
  'Montreal, QC',
  'Ice player',
  'Looking for goalie'
), (
  'thedominator',
  'Dominik Hasek',
  '$argon2i$v=19$m=4096,t=3,p=1$RKXYtyrfD50PzxKEt+z/Gg$WX9Pvla3rfiHC34H/KeY/3lASzPtyy4YT7ixVWYHZDs',
  '2022-01-10',
  '/images/hasek-goalie.jpeg',
  'Buffalo, NY',
  'Goalie for either',
  'Available to play goalie'
), (
  'RonnieHex27',
  'Ron Hextall',
  '$argon2i$v=19$m=4096,t=3,p=1$jhnDycTPZI9/8jRv8v3tPA$6eJhixuixcfd8OlqyUP2RlkziH1PE2criZIE6JQGR0M',
  '2022-01-12',
  '/images/ron-hextall.jpeg',
  'Philadelphia, PA',
  'Goalie for either',
  'Unavailable to play goalie'
), (
  'zamboniGoalie',
  'David Ayres',
  '$argon2i$v=19$m=4096,t=3,p=1$zuVXO31ORG6zKRniYMQ7kw$H/rt38DkyIZKGldbEr79+5cPIVbheUlcdFoWn4EARAc',
  '2022-01-14',
  '/images/emergency-goalie.jpeg',
  'Toronto, ON',
  'Ice goalie',
  'Available to play goalie'
);

insert into "messages" (
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
  '2022-02-14'
), (
  3,
  2,
  'Awesome to hear!. We play on Wednesday nights between 6:00 and 8:00pm.',
  '2022-03-14'
);

insert into "notifications" (
  "senderId",
  "recipientId"
) values (
  2,
  3
), (
  1,
  3
)
