# Thumbs Check

> An in-lecture thumbs checker.

## Team

  - Rob St. Lezin
  - Michael Clausen
  - Shyan Kashani
  - Chris Aaker

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements
Node.js

## Development

### Installing Dependencies

From within the root directory:
npm install


### Roadmap



## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

##Documentation

##Client Side 

Index.js

This file is the entry point into the application where the es6 App Class exists. 

App Class

Introduction

The App class is a stateful react component. The App Class plays a key part in this application because it the highest point where state is maintained. The lower level components receive references to this state on the App Class via props. 

Helper Methods

The App class contains helper methods which are used by the other components. Like state on the App class, it is also passed into child components via props.

-componentDidMount
Function will call once the App component mounts. It sets the state of the view for everyone to login. 

-onSignIn
Function will initiate Google Auth. The tokenId will be sent to the server, resulting in an asynch response with a user_type property on it. Based on what the value is determines how the view property on the App Class state will be set. 

For users assigned as Instructors in the back end. The client will also send a socket event to the server called instructor. 

- startLecture
Function changes the status of a lecture to lectureStarted, thereby changing the view for the Student and the Instructor

-endLecture
Function ends the current lecture. It can be called from the LectureButtons component to update lectureStatus to lectureNotStarted.

-endLectureStudent
Function is called from the Student component in response to a lectureEnded socket event from the server. It changes the lectureStatus for students to lectureNotStarted.

-setCountdownInterval
Function starts the countdown timer. It can be called from the startThumbsCheck function as a callback inside of setState once the state has changed.

-clearCountdownInterval
Function resets the countdown timer. NOTE: ClearInterval is necessary to end the interval properly. It changes the lectureStatus to lecture started and resets the countdown timer to where it needs to be. 

-startThumbsCheck
absolete

-clearThumbsCheck 
Function can be called from the ThumbsChecker component to change the lectureStatus state to lectureStarted and resets the countdown

-changeThumbValue
Function is used in both Student and Instructor component views as props.

For the Instructor it can be called in response to a averageThumbValue socket event sent from the server. The invocation accepts  an object from the server containing an average thumb value:

	{
	  averageThumbValue: value

	}

For the Student it can be called from the ThumbInput component which changes the top level App Class thumbValue state. 

Render 

Depending on whether the user is registered as a Student or an Instructor in the backend will determine which Component is rendered. 


Student View

Will register Socket IO event listeners inside the constructor. Callback functions invoke methods on the props object.

Instructor View

Will register a single Socket IO event listener, the changeThumbValue event, and whose callback will invoke a method on the props object. 

lectureButtons.jsx

-onThumbsCheck
Function is called once Check Thumbs button is clicked. It sends a post request to the server, and in response, results in a questionId and the invocation of the startThumbsCheck function. The lecture_id is necessary for the database to create a new question.The questionId is necessary for StartThumbsCheck updates the App level state to checkingThumbs and starts the countdown function. The Student will also receive an emit from the server which starts thumbsCheck for those users inside the Student View.

lectureStart.jsx

-handleChange
Function updates the name property on the App Class state which changes the name of the lecture. 

-onLectureStart
Function creates a new lecture with the App Class state name property. It sends a post request to the server creating a new lecture in the database. Once that is done, the response back from the server will be a new lectureId. The startLecture function will be executed with the lectureId coming back from the server.

###Server Side 

Endpoints

'/login'
Initiates Google Auth and gets the type of user from the database, if there are no results then add the user to the database. Send the user type back to the user in the response.

'/lecture'
Create a new lecture in the database. Return a lectureId as a response. It will also emit a socket event called lectureStarted.

'/checkthumbs'
Create a new question in the database. Once added to the database then create a new ThumbsData object, and send a socket event to the students marking a new question has been created. After 12000 milliseconds add a new ThumbData entry in the database and add the average thumb data for the question to the database.

'/endLecture'
 Calculate the average for all thumbs in lecture and store it in the database. Once completed send an event to the client saying it has been completed.

 Socket Server Event Handlers

 'connection'
 Create a new connection instance

 'username'
 Listen for a username event. Put the username on each socket that is connected.

 'instructor'
 Listen for an instructor event. Get the id property on the socket and assign it to an variable. Get the username property on the data object and assign it the instructor property of that particular socket. 

 'thumbValue'
 Listen from the thumbValue from the students. If student is not in the ThumbsData data structure then add a new one with proper username and socket id. After that, set the thumb value for the student. Calculate the average thumb value and emit it as a socket event called averageThumbValue.


 Database Functions

 -getUserType
 Get user type matching gmail

 -createNewLecture
 Create a new lecture with a certain name

 -createNewQuestion
 Create a new question with a lecture_Id

 -addAvgThumbForQuestion
 Updates average thumb for a question

 -addAvgThumbForLecture
 Updates average thumb for a lecture

 -getAvgThumbsForQuestionsInLecture
 Returns the average thumb for questions in lecture

 -createThumbData
 Create a new thumbs record

 -getUserId
 Return id that matches a gmail

 -addStudent
 Create a new users record

-asyncTimeout
a promise returning function 


ThumbsData.jsx

ThumbsData Class
The ThumbsData Class initializes a new ThumbsData object with helper methods and values.

lectureId - a lecture ID
questionId - a question ID
students - an object with Students


-addStudent
Function which adds a student

-setThumbValueForStudent
Function which sets the thumb value for a student

-getAverageThumbValue
Function which gets the average thumb value

-hasStudent
Function which checks if a student is connected


Student Class
A Student Class which intializes a new Student object with a gmail, a socketId, and a thumbValue

asyncTimeout


Things to Be Aware About
Any open window is an instance of a Socket. When testing it's recommended to close old instances open in the browser or else those instances will continue to try to reconnect. 



