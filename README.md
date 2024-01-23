# Dog App

## Overview

Dog App provides a fun way to track daily steps paired with an intrinsic motivation model (walking your dog)

### Problem

Why is your app needed? Background information around any pain points or other reasons.

### User Profile

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

- No external APIs will be used for the first sprint

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

#### Walking Page
![](./readme_images/walk-mobile.png)

#### Record-a-Walk Form
![](./readme_images/form-mobile.png)

#### User Statistics Page
![](./readme_images/user-mobile.png)

#### Login Page
![](./readme_images/login-mobile.png)

#### Register Page
![](./readme_images/register-mobile.png)

### Data

![](./readme_images/database_structure.png)

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

### Auth

Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.

## Nice-to-haves

Your project will be marked based on what you committed to in the above document. Under nice-to-haves, you can list any additional features you may complete if you have extra time, or after finishing.

- Add friends too compare dog walks
- Implement mobile part of the project as a react native app
- Use the expo-sensors library to automatically detect steps
- Make web app into a chrome extension
- Add water-intake-tracking functionality
- Add sleep-tracking functionality (allowing user to record sleeping time)
- Add food tracking functionality (record a 'snacks' - however, there are no plans for calorie or nutrition tracking functionality)
- Give the walking-page different backgrounds that change per season
- Allow user to customize their virtual pet
    - Change to other animals or dog breeds
    - Dress up pet
- Allow user to randomly generate an avatar fo themselves if they don't like their own
- Change home-page dog to react to how the user has been taking care of themselves (ie. looks sad if the user hasn't walked in some time, etc.)
- 