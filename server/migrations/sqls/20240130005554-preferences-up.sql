/* Replace with your SQL commands */
IF NOT EXISTS (
    CREATE TABLE preferences (
        preference_id int unsigned NOT NULL AUTO_INCREMENT,
        avatar VARCHAR(255),
        user_id int unsigned NOT NULL,
        tooltips BOOLEAN NOT NULL,
        PRIMARY KEY (preference_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    )
);