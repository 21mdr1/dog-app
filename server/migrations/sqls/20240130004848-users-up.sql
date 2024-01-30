/* Replace with your SQL commands */
IF NOT EXISTS (
    CREATE TABLE users (
        user_id int unsigned NOT NULL AUTO_INCREMENT,
        username varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        accnt_creation timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id) 
    )
);