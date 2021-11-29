
# Roommate House Manager Application 

## Overview 
description of what you hope to build and what your project will accomplish

### Features


### Technologies
Express
NextJS
React
Axios
Mongoose
Moment

Styling
- Bootstrap
- React Bootstrap

State management
React hooks/ life cycle methods
Routing
Styling/ Design
Backend (35 points)

### Milestone Breakdown
#### Accomplished for Project MS1
- A user can register for an account/ login
- When a user signs up they can either create a new house to join, or join an existing one as long as they have the associated password 
- Once logged in a user can view chores tagged for their house, or they have an option to create new chores
- A user can mark a chore as completed, and this will cause it to disapear from the current chores section
- Basic Laundry Set up
  - User can register new machines for their house
  - Machines can only be of type washer or dryer
  - User can start a load, view how much time is left on a load, and "take the load out" 
  - Used a packaged called motion to manipulate the timestamp/ date fields on the laundry


#### Accomplished for Project MS2
Backend
- Needed to clean up routes for creating/ joining houses so proper error messages would be displayed

Navigation/ Navigation Bar
- Will only display the page options if someone is logged in
- Routes are authenticated so if someone tries to access the chores page but they are not logged in, they will be redirected to the login page
- Similarly, if you are logged in you cannot access the login/ signup pages

Overall
- Restructured the the project so its using NextJS
  - Had to change the folder layout as well as the server.js for the backend so it starts up the backend/ frontend at the same time with the Next package

Chores
- User can now modify a chore to assign/ reassign it to someone else!
