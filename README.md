
# Roommate House Manager Application 

## Overview 
This is a basic house manager application, ideally for college roommates sharing a common living space. This application allows people to sign up and register to a house. Each house has a list of chores that need to be done and similarly laundry machines associated with the house. This will help roommates track what needs to get done and who needs to do it. In addition, by tracking laundry machines this will help roommates keep track of if a laundry machine is in use, how much is left in a load, and whether or not someone has actually removed the clothes from the machine if the load is over. These are common problems my college house struggles with, so the goal was to create an application to solve these problems.  


## Features
### Houses
House Model Fields
- Address (String)
- Members (List of Strings representing usernames)
- Creator (String; username of member who originally created the house)
- Password (String)
- Laundry (List of Strings representing laundry IDs)


### Users
Roommate Model Fields
- Username (String, unique identifier for a user)
- Name (String, representing their first name/ nickname)
- Password (String)
- HouseID (String, representing the houseID they are registered to)

### Laundry
Laundry Model Fields
- HouseID (String, representing the houseID the machiine is registered to)
- Tyoe (String, either Washer or Dryer)
- Duration (Number, represnting the length this machine takes to run in minutes)
- inUse (boolean field representing whether or not their or clothes cuurrently in that machine)
- timeCompleted (Date field representing if the machine is in use, what time that load will be over)



### Chores
Chore Model Fields
- HouseID (String, representing the houseID it is registered to)
- AssignedTo (String, represting the username of the roommate this chore is assigned to)
- Completed (Boolean field representing whether or not this task has been completed)
- Task (String, actual task that needs to be done)
- Description (String, description of the task where you can include more information about it)

## Technologies
- Express
- NextJS
- React
- Axios
- Mongoose
- Moment

#### Used for styling:
- Bootstrap
- React Bootstrap

## Milestone Breakdown For Project
### Accomplished for MS1
User Accounts
- Login and signup functionality for users
- When a user signs up they can either register a new house and join it, or they can join an existing house as long as they have the associated password 
- Once logged in, a user can view chores tagged for their house and create new chores
- A user can mark a chore as completed/ uncompleted, and this will cause it to move between the current chores and completed chores section

Basic laundry Set up
  - User can register new machines for their house
  - Machines can only be of type washer or dryer
  - User can start a load, view how much time is left on a load, and "take the load out" 
  - Used a packaged called motion to manipulate the timestamp/ date fields on the laundry

### Accomplished for Project MS2
Backend
- Cleaned up routes for creating and joining houses in order to display proper error messages

Navigation
- The navigation bar will only display the available pages/ signup button if someone is logged in
- Authenticated Routes
  - If someone is not logged in and they trie to access the chores page, they will be redirected to the login page
  - Similarly, if you are logged in you cannot access the login/ signup pages

NextJS Setup
- Restructured the project setup utilizing NextJS
- Had to change the folder layout as well as the server.js for the backend so it starts up the backend/ frontend at the same time with the Next package

Chores
- A user can modify a chore by reassigning it to one of their roommates 
