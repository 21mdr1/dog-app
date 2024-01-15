
let up = `CREATE TABLE steps (
    steps_id int unsigned NOT NULL AUTO_INCREMENT,
    entry_logged timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    steps int unsigned NOT NULL DEFAULT 0,
    mins_walked int unsigned NOT NULL DEFAULT 0,
    user_id int unsigned NOT NULL,
    PRIMARY KEY (steps_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);`

let down = `DROP TABLE steps;`