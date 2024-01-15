let up = `CREATE TABLE users (
    user_id int unsigned NOTNULL AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    accnt_creation timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id) 
);`

let down = `DROP TABLE users;`