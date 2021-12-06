
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

House Breakdown
- When a user signs up, they can create a new house by providing its address and a password that other members will use to join this house. 
- A house has associated chores and laundry machines

### Users
Roommate Model Fields
- Username (String, unique identifier for a user)
- Name (String, representing their first name/ nickname)
- Password (String)
- HouseID (String, representing the houseID they are registered to)

Roommmate Breakdown
- Use their username and password to log in 
- When signing up, they have to provide a username, password, and name
- Also upon signing up, a user can join a current house in the system or register a new house 
- A roommate/ user has the ability to create new chores, modify current chores, register new laundry machines, and "do laundry"


### Laundry
Laundry Model Fields
- HouseID (String, representing the houseID the machiine is registered to)
- Tyoe (String, either Washer or Dryer)
- Duration (Number, represnting the length this machine takes to run in minutes)
- inUse (boolean field representing whether or not their or clothes cuurrently in that machine)
- timeCompleted (Date field representing if the machine is in use, what time that load will be over)

Laundry Breakdown
- Their document _id is stored in the Laundry array of the house they are associated with
- If a machine is currently not in use, a user can start a load. Starting a load modifies the timeCompleted field and similarly will display a timer on the frontend laundry page indicating how much time is left in this load.
- When the timer runs out/ the timeCompleted field becomes equal to the current time, the frontend displays a message that says the load is complete and a button to "take clothing out"
  - This is because a lot of times people don't take their clothing out of machines at the exact time the load ends. This will help roommies know if a machine is actually empty or if they will need to remove someones clothes if they want to put in a load
- When the "take clothing out" button is clicked, the inUse field toggles to false for the machine, and then a button to start a new load will appear on the laundry frontend page. 
- When registering a new laundry machine, the duration field must be a number that indicates the length that machine takes to run in minutes. 
  - If an invalid input is given, the creation of the machine will be rejected. 
  - Also when registering the machine, the only options for the type are washer and dryer. 

 

### Chores
Chore Model Fields
- HouseID (String, representing the houseID it is registered to)
- AssignedTo (String, represting the username of the roommate this chore is assigned to)
- Completed (Boolean field representing whether or not this task has been completed)
- Task (String, actual task that needs to be done)
- Description (String, description of the task where you can include more information about it)

Chore Breakdown
- The default _id of the house object they are associated with is stored in the houseID field
- A chore can either be assigned to a roommate of your house, or to no one. 
- All roommates have the ability to change who a chore is associated to
- A chore can be marked as completed, and when this happens it will visually disappear from the current chores section and move to the completed chores section on the front end
- A chore that is marked as completed can be untoggled and thus marked as uncompleted


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
