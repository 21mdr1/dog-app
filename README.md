# Dog App

## Overview

Dog app lets you track your steps and visualize your walk history. But, it's not like your average pedometer app: dog app gives you a virtual companion to take on walks with you, helping you build healthier habits by reminding you to take care of your virtual friend.

### Problem



Why is your app needed? Background information around any pain points or other reasons.
 

### User Profile

People who are looking for a fun way to track their steps, and who want an empathetic form of external accountability.

Who will use your app? How will they use it? Any special considerations that your app must take into account.

### Features

- As a user, I want to have a virtual dog I can bring as a walking companion
- As a user, I want to be able to log my walks
- As a user, I want to be able to see my past walk data in the form of graphs
- As a user, I want to be able to record my data (walks) without an account
- As a user, I want to be able to create an account to backup my data
- As a user, I want to be able to access the site as an mobile app (a mobile view)
- As a user, I want to be able to use the site as a new-tab extension (a desktop view)
- As a user, in the desktop view, I want to be able to see a short summary of my daily progress

## Implementation

### Tech Stack

- React
- MySQL
- Express
- Client libraries
    - react
    - react-router-dom
    - react-select (or a similar library for dropdowns)
    - axios
    - sass
- Server libraries
    - express
    - cors
    - mysql2
        - I want to write SQL queries directly reather than use a query builder or ORM, but I have found it hard to solve the issue of migrations.
    - bcrypt for password hashing

### APIs

- The multiavatar API will be used to generate user avatars off their username

### Sitemap

- Home page - displays a dog sitting up
- Walking page
    - Record-a-walk form
- User statistics page
- User settings page
- Login page
- Register page

### Mockups

#### Home Page
![](./readme_images/home-mobile.png)
![](./readme_images/home-desktop.png)

#### Walking Page
![](./readme_images/walk-mobile.png)
![](./readme_images/walk-desktop.png)

#### Record-a-Walk Form
![](./readme_images/form-mobile.png)
![](./readme_images/form-desktop.png)

#### User Statistics Page
![](./readme_images/user-mobile.png)
![](./readme_images/user-desktop.png)

#### Login Page
![](./readme_images/login-mobile.png)
![](./readme_images/login-desktop.png)

#### Register Page
![](./readme_images/register-mobile.png)
![](./readme_images/register-desktop.png)

### Data

- This app intends to mimic the experience of using a mobile app. This means: before login, a user's walk data will be saved locally (in localStorage).
    - Only a week's worth of data will be saved at any time to alleviate space usage
    - If a user decides to create an account, any data stored locally will be transferred to the database

#### Local Storage Structure

```
"stepsWalked": [
    {
        "minsWalked": 2,
        "steps": 120,
        "timestamp": 1705259672162
    }
]
```

```
"preferences": {
    "avatar": 'https://api.multiavatar.com/maria.svg',
    "tooltips": true
}
```


#### Database Structure
![](./readme_images/database_structure.png)

### Endpoints

**GET /steps/:userId**

- Get steps the user has walked in the last number of days.

Parameters: 
- userId: the id of the user to get data from (this may be fully replaced by the JWT token?)
- token: user's JWT token

Queries:
- days (optional): the number of days to get data for, defaults to 7

Response:
```
[
    {
        "logged_date": "15/1/2024",
        "total_steps": "360"
    },
    ...
]
```

**POST /steps**

- Record a 'walk'

Parameters:
- token: JWT of the user

Body of request: 
```
{
    "steps": 320,
    "minsWalked": 2,
    "userId": 1
}
```
Note: userId may be fully replaced by JWT?

Response:
```
{
    "steps_id": 10,
    "entry_logged": 2024-01-15 01:22:37,
    "steps": 320,
    "mins_walked": 2,
    "user_id": 1
}
```

**POST /user/register**
- Create a new user

Body:
```
{
    "username": example,
    "email": exampe@example.com,
    "password": example123
}
```

Response:
```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

**POST /users/login**

- Login user

Body:
```
{
    "email": exampe@example.com,
    "password": example123
}
```

Response:
```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

### Auth

- Authentiaction will be done using JWT
    - Added after core features have first been implemented
    - Store JWT in localStorage, remove when a user logs out
    - Add states for logged in that will change where the user's data gets sent to and whether 'Log In' prompts are shown

## Roadmap

**These steps have already been done:**

- Create client structure and boilerplates

- Create server structure and boilerplates

- Create home page

- Create 'walking' page

- Feature: Form to record walk 
    - Implement form
    - Create functionality to save steps to local storage
    - Create POST /steps/:userid

- Feature: Show graph of user's walk data
    - Create user data page
    - Make graph
    - Create functionality to get steps from local storage
    - Create GET /steps/:userid

- Feature: Create account
    - Create register page and form
    - Create POST /user

- Feature: Login
    - Implement login page and form

**These steps need to be done:**

- Create migrations

- Create seeds with sample walking data

- Handle errors and bad input in api requests

- Create tooltips for buttons

- Add reminders / motivational phrases in home page

- Feature: walking companion (animations)
    - Animate sitting dog
    - Create and animate walking dog

- Feature: Desktop view
    - Create home page for desktop view
        - Create side panel
    - Create walk form desktop view
    - Create walk page desktop view
    - Create user data page desktop view
    - Create login page desktop view
    - Create register page desktop view

- Feature: Create account
    - Change POST /user to POST /user/register
    - Implement functionality to move local data to database

- Feature: Login
    - Create POST /user/login

- Feature: Implement JWT tokens
    - Server: Update expected requests / responses on protected endpoints
    - Client: Store JWT in local storage, include JWT on axios calls

## Nice-to-haves

- Create user preferences/settings page
    - Change avatar
    - Disable tooltips
    - Change username / email / password
    - Delete account

- Add water-intake tracking functionality
    - Water tracking page and dog
    - Water intake form
    - Water intake graph

- Add ability to set goals (ie. 15,000 steps in a day)
    - Goal input in settings
    - Show progress against goals in graphs and home side panel

- Allow user to customize virtual pet
    - Add accessories
    - Change pet to other animals or dog breeds

- Make virtual pet react to how user's behavior
    - Pet looks sad if user hasn't walked in a while, etc.