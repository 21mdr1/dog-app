# Dog App

## Overview

Dog app lets you track your steps and visualize your walk history. But, it's not like your average pedometer app: dog app gives you a virtual companion to take on walks with you, helping you build healthier habits by reminding you to take care of your new found friend.


## Instalation Instructions

### Prereqs

- Node.js
- A running installation of MySQL

### Steps

1. Clone the git repository
2. Create a mysql database for the project
```
$ mysql -u root -p
mysql> CREATE DATABASE dog_app;
```

#### For the server

1.  Go into the server folder
``` 
cd server
```

2. Create a `.env` file based on `example.env` and fill out the variable values:
```
PORT = <server's port>
CORS_ORIGIN = <client's domain>

DB_HOST = <database domain>
DB_PORT = <database port>
DB_USER = <database username>
DB_PASS = <database password>
DB_NAME = <database name>
NODE_ENV = dev

SECRET_KEY = <a string to be used by jwt>
SALT_ROUNDS = <a number to be used by bcrypt>
```

3. Install server dependencies
```
npm install
```

4. Run migrations and seeding
```
$ npm run migrate:up
$ npm run seed
```

5. Start the server

#### For the client

1. Go into the client folder
```
cd client
```

2. Create a `.env` file based on `example.env` and fill out the variable values:
```
REACT_APP_API_URL = <domain of backend>
```

3. Install dependencies
```
npm install
```

4. Run client
```
npm start
```

The app will be running on http://localhost:3000/. Feel free to use the app without an account, make your own account, or use the test user `testUser/test123`.

## Gallery

![](./readme_images/home-mobile.png) ![](./readme_images/user-mobile.png)

![](./readme_images/walk-mobile.png) ![](./readme_images/form-mobile.png)

![](./readme_images/login-mobile.png) ![](./readme_images/register-mobile.png)
