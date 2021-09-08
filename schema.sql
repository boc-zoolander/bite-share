DROP DATABASE IF EXISTS users;

CREATE DATABASE users;

\c users

CREATE TABLE users (
  user_id integer PRIMARY KEY,
  user_name text
);

CREATE TABLE friendship (
  user_id integer,
  friend_id integer,
  primary key (user_id, friend_id),
  foreign key (user_id) references users(user_id),
  foreign key (friend_id) references users(user_id)
);


-- insert some users
insert into users (user_id, user_name) values (1, 'Sara');
insert into users (user_id, user_name) values (2, 'Tom');
insert into users (user_id, user_name) values (3, 'Jorge');
insert into users (user_id, user_name) values (4, 'Milo');
insert into users (user_id, user_name) values (5, 'Chris');
insert into users (user_id, user_name) values (6, 'Michael');
insert into users (user_id, user_name) values (7, 'Ming');

--build some friendship between our team members
insert into friendship (user_id, friend_id) values (1, 2);
insert into friendship (user_id, friend_id) values (2, 1);
insert into friendship (user_id, friend_id) values (3, 4);
insert into friendship (user_id, friend_id) values (4, 3);
insert into friendship (user_id, friend_id) values (3, 5);
insert into friendship (user_id, friend_id) values (5, 3);
insert into friendship (user_id, friend_id) values (6, 3);


--user1 sends a friendship to user2
--insert into friendship (user_id, friend_id) values (1, 2);

--user2 denies the request
--delete from friendship where user_id = 1 and friend_id = 2;

--user2 accepts
--insert into friendship (user_id, friend_id) values (2, 1);

-- find user 3 friends
select f1.*
from friendship f1
inner join friendship f2 on f1.user_id = f2.friend_id and f1.friend_id = f2.user_id and f1.user_id = 3;