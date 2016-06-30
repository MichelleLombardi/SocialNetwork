
CREATE TABLE app_user (
                id_app_user INTEGER NOT NULL,
                name_app_user VARCHAR(200) NOT NULL,
                lastname_app_user VARCHAR(200) NOT NULL,
                email_app_user VARCHAR(320) NOT NULL,
                nickname_app_user VARCHAR(300) NOT NULL,
                password_app_user VARCHAR(30) NOT NULL,
                access_token_app_user VARCHAR(400) NOT NULL,
                CONSTRAINT id_app_user PRIMARY KEY (id_app_user)
);


CREATE TABLE publish (
                id_publish INTEGER NOT NULL,
                title_publish VARCHAR(200) NOT NULL,
                media_publish VARCHAR(200) NOT NULL,
                media_type_publish VARCHAR(300) NOT NULL,
                description_publish VARCHAR(300) NOT NULL,
                location_publish VARCHAR(300) NOT NULL,
                date_time_publish DATE NOT NULL,
                id_app_user INTEGER NOT NULL,
                tag_publish VARCHAR(200) NOT NULL,
                CONSTRAINT id_publish PRIMARY KEY (id_publish)
);


CREATE TABLE likes (
                id_app_user INTEGER NOT NULL,
                id_publish INTEGER NOT NULL,
                CONSTRAINT id_likes PRIMARY KEY (id_app_user, id_publish)
);


ALTER TABLE publish ADD CONSTRAINT app_user_publish_fk
FOREIGN KEY (id_app_user)
REFERENCES app_user (id_app_user)
ON DELETE CASCADE
ON UPDATE CASCADE
NOT DEFERRABLE;

ALTER TABLE likes ADD CONSTRAINT app_user_likes_fk
FOREIGN KEY (id_app_user)
REFERENCES app_user (id_app_user)
ON DELETE CASCADE
ON UPDATE CASCADE
NOT DEFERRABLE;

ALTER TABLE likes ADD CONSTRAINT publish_likes_fk
FOREIGN KEY (id_publish)
REFERENCES publish (id_publish)
ON DELETE CASCADE
ON UPDATE CASCADE
NOT DEFERRABLE;
