-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'BOC_User-Session-jt'
-- 
-- ---

DROP TABLE IF EXISTS "BOC_User-Session-jt" CASCADE;
		
CREATE TABLE "BOC_User-Session-jt" (
  id SERIAL,
  session_id INTEGER,
  user_id INTEGER,
  user_done_ordering BOOLEAN,
  PRIMARY KEY (id)
);

-- ---
-- Table 'BOC_Users'
-- 
-- ---

DROP TABLE IF EXISTS "BOC_Users" CASCADE;
		
CREATE TABLE "BOC_Users" (
  user_id SERIAL,
  first_name VARCHAR(90),
  last_name VARCHAR(90),
  email VARCHAR(90),
  password VARCHAR(25),
  PRIMARY KEY (user_id)
);

-- ---
-- Table 'BOC_Sessions'
-- 
-- ---

DROP TABLE IF EXISTS "BOC_Sessions" CASCADE;
		
CREATE TABLE "BOC_Sessions" (
  session_id SERIAL,
  host_id INTEGER,
  rollover_session_id INTEGER,
  restaurant_name VARCHAR(75),
  restaurant_id_api VARCHAR(25),
  host_firstname VARCHAR(50),
  host_lastname VARCHAR(50),
  session_name VARCHAR(50),
  split_method INTEGER,
  PRIMARY KEY (session_id)
);

-- ---
-- Table 'BOC_Orders'
-- 
-- ---

DROP TABLE IF EXISTS "BOC_Orders" CASCADE;
		
CREATE TABLE "BOC_Orders" (
  order_pk SERIAL,
  orderer_id INTEGER,
  order_session_id INTEGER,
  food_id_api VARCHAR(25),
  food_name_api VARCHAR(75),
  price FLOAT,
  qty INTEGER NOT NULL DEFAULT 1,
  restaurant_id_api VARCHAR(25),
  restaurant_name_api VARCHAR(75),
  currency VARCHAR(7) DEFAULT 'usd',
  PRIMARY KEY (order_pk)
);

-- ---
-- Table 'BOC_User-Friend-jt'
-- 
-- ---

DROP TABLE IF EXISTS "BOC_User-Friend-jt" CASCADE;
		
CREATE TABLE "BOC_User-Friend-jt" (
  user_friend_pk SERIAL,
  requestor_id INTEGER,
  requestee_id INTEGER,
  PRIMARY KEY (user_friend_pk)
);

-- ---
-- Table 'BOC_Session-Chat'
-- 
-- ---

DROP TABLE IF EXISTS "BOC_Session-Chat" CASCADE;
		
CREATE TABLE "BOC_Session-Chat" (
  session_chat_id SERIAL,
  message_text VARCHAR(255),
  speaker_id INTEGER,
  timestamp TIMESTAMP DEFAULT NULL,
  PRIMARY KEY (session_chat_id)
);

-- ---
-- Table 'BOC_Rollover-Sessions'
-- 
-- ---

DROP TABLE IF EXISTS "BOC_Rollover-Sessions" CASCADE;
		
CREATE TABLE "BOC_Rollover-Sessions" (
  rollover_pk SERIAL,
  placeholder INTEGER,
  PRIMARY KEY (rollover_pk)
);

-- ---
-- Table 'BOC_Restaurants'
-- 
-- ---

DROP TABLE IF EXISTS "BOC_Restaurants" CASCADE;
		
CREATE TABLE "BOC_Restaurants" (
  restaurant_id_pk SERIAL,
  restaurant_name VARCHAR(75),
  restaurant_website VARCHAR(250),
  restaurant_phone VARCHAR(10),
  restaurant_hours VARCHAR(10),
  price_range VARCHAR(5),
  restaurant_id_api BIGINT,
  restaurant_address VARCHAR(90),
  zip INTEGER,
  latitude FLOAT,
  longitude FLOAT,
  PRIMARY KEY (restaurant_id_pk)
);

-- ---
-- Table 'BOC_Menu-Items'
-- 
-- ---

DROP TABLE IF EXISTS "BOC_Menu-Items" CASCADE;
		
CREATE TABLE "BOC_Menu-Items" (
  id SERIAL,
  menu_item_name VARCHAR(75),
  menu_item_description VARCHAR(255),
  menu_item_price FLOAT,
  subsection VARCHAR(50),
  subsection_description VARCHAR(75),
  item_id_api VARCHAR(25),
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys 
-- ---

-- ALTER TABLE "BOC_User-Session-jt" ADD FOREIGN KEY (session_id) REFERENCES "BOC_Sessions" (session_id);
-- ALTER TABLE "BOC_User-Session-jt" ADD FOREIGN KEY (user_id) REFERENCES "BOC_Users" (user_id);
-- ALTER TABLE "BOC_Sessions" ADD FOREIGN KEY (session_id) REFERENCES "BOC_Session-Chat" (session_chat_id);
-- ALTER TABLE "BOC_Sessions" ADD FOREIGN KEY (rollover_session_id) REFERENCES "BOC_Rollover-Sessions" (rollover_pk);
-- ALTER TABLE "BOC_Orders" ADD FOREIGN KEY (orderer_id) REFERENCES "BOC_Users" (user_id);
-- ALTER TABLE "BOC_Orders" ADD FOREIGN KEY (order_session_id) REFERENCES "BOC_Sessions" (session_id);
-- ALTER TABLE "BOC_Session-Chat" ADD FOREIGN KEY (speaker_id) REFERENCES "BOC_Users" (user_id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `BOC_User-Session-jt` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `BOC_Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `BOC_Sessions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `BOC_Orders` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `BOC_User-Friend-jt` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `BOC_Session-Chat` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `BOC_Rollover-Sessions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `BOC_Restaurants` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `BOC_Menu-Items` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `BOC_User-Session-jt` (`user-session_id`,`session_id`,`user_id`,`user_done_ordering`) VALUES
-- ('','','','');
-- INSERT INTO `BOC_Users` (`user_id`,`first_name`,`last_name`,`email`,`join_date`,`password`) VALUES
-- ('','','','','','');
-- INSERT INTO `BOC_Sessions` (`session_id`,`host_id`,`food_api_id`,`rollover_session_id`,`new field`,`restaurant_name`,`restaurant_id_api`,`host_firstname`,`host_lastname`,`session_name`,`split_method`) VALUES
-- ('','','','','','','','','','','');
-- INSERT INTO `BOC_Orders` (`order_pk`,`orderer_id`,`order_session_id`,`food_id_api`,`food_name_api`,`price`,`qty`,`restaurant_id_api`,`restaurant_name_api`,`currency`) VALUES
-- ('','','','','','','','','','');
-- INSERT INTO `BOC_User-Friend-jt` (`user_friend_pk`,`requestor_id`,`requestee_id`) VALUES
-- ('','','');
-- INSERT INTO `BOC_Session-Chat` (`BOC_Session-Chat_id`,`message_text`,`speaker_id`,`timestamp`) VALUES
-- ('','','','');
-- INSERT INTO `BOC_Rollover-Sessions` (`rollover_pk`,`new field`) VALUES
-- ('','');
-- INSERT INTO `BOC_Restaurants` (`restaurant_id_pk`,`restaurant_name`,`restaurant_website`,`restaurant_phone`,`hours`,`price_range`,`restaurant_id_api`,`address`,`zip`,`latitude`,`longitude`) VALUES
-- ('','','','','','','','','','','');
-- INSERT INTO `BOC_Menu-Items` (`id`,`menu_item_name`,`menu_item_description`,`menu_item_price`,`subsection`,`subsection_description`,`item_id_api`) VALUES
-- ('','','','','','','');

INSERT INTO "BOC_Users"(first_name, last_name, email, password) VALUES ('Scott', 'Summers', 'iheartjeangrey@gmail.com', '1234');
INSERT INTO "BOC_Users"(first_name, last_name, email, password) VALUES ('Jean', 'Grey', 'iheartlogan@gmail.com', '1234');
INSERT INTO "BOC_Users"(first_name, last_name, email, password) VALUES ('Jubilation', 'Lee', 'ijoinedgenx@gmail.com', '1234');
INSERT INTO "BOC_Users"(first_name, last_name, email, password) VALUES ('Logan', 'James Howlett', 'jeangreyisok@gmail.com', '1234');
INSERT INTO "BOC_Users"(first_name, last_name, email, password) VALUES ('Remy', 'Etienne LeBeau', 'iheartrogue@gmail.com', '1234');
INSERT INTO "BOC_Users"(first_name, last_name, email, password) VALUES ('Anna', 'MarieRogue', 'iheartgambit@gmail.com', '1234');
INSERT INTO "BOC_Users"(first_name, last_name, email, password) VALUES ('Hank', 'McCoy', 'iheartscience@gmail.com', '1234');
INSERT INTO "BOC_Users"(first_name, last_name, email, password) VALUES ('Charles', 'Xavier', 'iheartmutantkind@gmail.com', '1234');

INSERT INTO "BOC_Users"(first_name, last_name, email, password) VALUES ('Destiny', 'of the Endless', 'destiny@sandman.com', '0001');
INSERT INTO "BOC_Users"(first_name, last_name, email, password) VALUES ('Dream', 'of the Endless', 'dream@sandman.com', '0002');
INSERT INTO "BOC_Users"(first_name, last_name, email, password) VALUES ('Death', 'of the Endless', 'death@sandman.com', '0003');
INSERT INTO "BOC_Users"(first_name, last_name, email, password) VALUES ('Destruction', 'of the Endless', 'destruction@sandman.com', '0004');
INSERT INTO "BOC_Users"(first_name, last_name, email, password) VALUES ('Delight', 'of the Endless', 'delight@sandman.com', '0005');
INSERT INTO "BOC_Users"(first_name, last_name, email, password) VALUES ('Desire', 'of the Endless', 'desire@sandman.com', '0006');
INSERT INTO "BOC_Users"(first_name, last_name, email, password) VALUES ('Despair', 'of the Endless', 'despair@sandman.com', '0007');

INSERT INTO "BOC_Sessions"(host_id, session_name, host_firstname, host_lastname, restaurant_name, restaurant_id_api) VALUES (276, 'The Gathering of the Endless', 'Destiny', 'of the Endless', 'The Table of Destiny', 888888);

INSERT INTO "BOC_User-Session-jt"(session_id, user_id, user_done_ordering) VALUES (93, 276, false);
INSERT INTO "BOC_User-Session-jt"(session_id, user_id, user_done_ordering) VALUES (93, 277, false);
INSERT INTO "BOC_User-Session-jt"(session_id, user_id, user_done_ordering) VALUES (93, 278, false);
INSERT INTO "BOC_User-Session-jt"(session_id, user_id, user_done_ordering) VALUES (93, 279, false);
INSERT INTO "BOC_User-Session-jt"(session_id, user_id, user_done_ordering) VALUES (93, 280, false);
INSERT INTO "BOC_User-Session-jt"(session_id, user_id, user_done_ordering) VALUES (93, 281, false);
INSERT INTO "BOC_User-Session-jt"(session_id, user_id, user_done_ordering) VALUES (93, 282, false);

INSERT INTO "BOC_Orders"(orderer_id, order_session_id, food_name_api, food_id_api, price, qty) VALUES (276, 93, 'steak and potatos', 7676, 49.99, 1);
INSERT INTO "BOC_Orders"(orderer_id, order_session_id, food_name_api, food_id_api, price, qty) VALUES (277, 93, 'steak and brie', 7677, 59.99, 1);
INSERT INTO "BOC_Orders"(orderer_id, order_session_id, food_name_api, food_id_api, price, qty) VALUES (278, 93, 'steak and cheddar soup', 7678, 69.99, 1);
INSERT INTO "BOC_Orders"(orderer_id, order_session_id, food_name_api, food_id_api, price, qty) VALUES (279, 93, 'steak and broccoli', 7679, 79.99, 1);
INSERT INTO "BOC_Orders"(orderer_id, order_session_id, food_name_api, food_id_api, price, qty) VALUES (280, 93, 'steak and scallop', 7680, 89.99, 1);
INSERT INTO "BOC_Orders"(orderer_id, order_session_id, food_name_api, food_id_api, price, qty) VALUES (281, 93, 'steak and shrimp', 7681, 99.99, 1);
INSERT INTO "BOC_Orders"(orderer_id, order_session_id, food_name_api, food_id_api, price, qty) VALUES (282, 93, 'steak and lobster', 7682, 109.99, 1);

INSERT INTO "BOC_Orders"(orderer_id, order_session_id, food_name_api, food_id_api, price, qty) VALUES (276, 93, 'Dream Wine', 8000, 9.99, 1);
INSERT INTO "BOC_Orders"(orderer_id, order_session_id, food_name_api, food_id_api, price, qty) VALUES (277, 93, 'Dream Wine', 8000, 9.99, 1);
INSERT INTO "BOC_Orders"(orderer_id, order_session_id, food_name_api, food_id_api, price, qty) VALUES (278, 93, 'Dream Wine', 8000, 9.99, 1);
INSERT INTO "BOC_Orders"(orderer_id, order_session_id, food_name_api, food_id_api, price, qty) VALUES (279, 93, 'Dream Wine', 8000, 9.99, 1);
INSERT INTO "BOC_Orders"(orderer_id, order_session_id, food_name_api, food_id_api, price, qty) VALUES (280, 93, 'Dream Wine', 8000, 9.99, 1);
INSERT INTO "BOC_Orders"(orderer_id, order_session_id, food_name_api, food_id_api, price, qty) VALUES (281, 93, 'Dream Wine', 8000, 9.99, 1);
INSERT INTO "BOC_Orders"(orderer_id, order_session_id, food_name_api, food_id_api, price, qty) VALUES (282, 93, 'Dream Wine', 8000, 9.99, 1);