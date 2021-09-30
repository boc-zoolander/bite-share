# bite-share

![GitHub Logo](https://drive.google.com/uc?export=view&id=1v3i0H4FXavDUyJsgGL-tfBST0Vqo2W6h)

### Contributors

* Jorge Brake - [Jorge's Github](https://github.com/jabrake)
* Michael Duckworth - [Mike's Github](https://github.com/dworthm)
* Chris Floyd - [Chris' Github](https://github.com/milofultz)
* Milo Fultz - [Milo's Github](https://github.com/pplexed)
* Tom Ho - [Tom's Github](https://github.com/TomHo521)
* Sara Landis - [Sara's Github](https://github.com/saralandis)
* Ming Ma - [Ming's Github](https://github.com/MingHacker)

### Introduction

This was a month long student project where our team completed an MVP full stack application requested by a "client".

Time to pay up. The meal has ended and the waiter/waitress asks "separate or together?" obviously hoping for the ladder. With Bite Share, the answer can confidently be "together" with no worried thoughts about the aftermath. No more tracking everyone down, pulling out calculators, or passing bills around to make proper change.

Bite Share allows its users to select their favorite restaurant, invite their friends or colleagues to a meal session, have everyone enter their order, total the bill, add tip, calculate tax, split evenly or by item, and route to payment all in one app.

Enjoy the food. Enjoy the company. End the meal on a high note with Bite Share.

### Tech stack

* React + React Router
* Bootstrap, Normalize CSS + Skeleton CSS
* JQuery
* Axios
* Express
* PostgreSQL
* Socket.io
* Jest, React Testing Library + Enzyme
* CircleCI
* APIs: Documenu, Tax + and Paypal

### Technical Challenges and research that you anticipated

* Why, what was the plan to overcome those challenges?
* What did you learn?

* Designing the database
* Handling multiple users from multiple devices (socket.io)
* Adding functionality for payments via Paypal
* Testing asynchronous elements within the application

### Challenges that were unexpected

* Why was it a challenge
* What did you learn?

* Setting a larger scale plan for the project and holding to it
	* Starting (UI, architecture, assigning components)
	* Development/Testing
	* Deployment
	* Meeting all deadlines
* Dealing with package conflicts before realizing it was NVM
* Handling server requests and using React Router on the same server
* Backend unexpected challenges:

	Backend entailed database design & deployment, API design and implementation, and API documentation.  

	At the design and technical implementation level my task was extremely open-ended.  For example, in the early part of the work, it was not fully clear yet what the flow of the App would be, what data would be used by which team member, and how I could make life as simple as possible for them.  

	This begged the question, how to build the design when the exact contours of what we were going to build was not fully fleshed out?  How to do this in a manner that could serve the needs of Front End that could make their lives as simple as possible, while being flexible and scalable to future changes to the front end flow?

	In the schema design for example, there was no way to know for instance whether the team would eventually choose to implement the rolling session price.  However, for purposes of the backend, the MVP schema needed to be designed to accomodate a multi-session rollout, should that be the future design decision by front end.

	To meet that challenge, I decided upon a core functionality of four major tables.  These would meet MVP.  Additional tables such as a multi-session table was built into the schema in the form of a BOC_Rollover session table, where the primary key of BOC_Sessions was a foreign key.  This functionality was deactivated for our MVP, and ready to be activated had front end moved in that direction.

	Moreover, I found myself making design decisions on behalf of Front End.  This was not intentional on my part so much work on backend design would end up commiting frontend to design their work flow in a particular manner. 

	For instance, there was initial ambiguity on "creating a session" vs "joining a session", "logging in a user" vs "registering a new user" in the front end flow.   However on the backend, the logical separation of those concepts into different tables, would affect front end to distingush between a user login from a user registration.  On this point, it was advantageous that Milo served as a point of contact as project manager because overarching UI flow decisions could be relayed to the rest of the team.

	Another challenge was both deciding upon the exact contours of the API that front end would work with and to prepare both them and myself--what would be the "contract" between frontend and backend?

	In the case of API design, initial routes were built based on dummy test data, prior to implementation and schema design.  At a second phase, basic routes were built up concerning addGuest, createNewSession, updateSession, etc.  These would serve to be the routes to be consumed by the front end.  To ensure clarity in how to use the API produced by backend, API documentation was written for the team to use.  As work progressed, any API changes could be therefore be relayed in a central location as needed.
	
	Finally in the third phase, all information any front end dev could use would be available in a single route: /getSession2 would in a single API call, provide all relevant data with respect to a given session, ensuring that front end would avoid any situation requiring multiple API calls.

	Although I understand that it was Hack Reactor's intention that each team member should "own" a particular page, including both the front end and back end, our particular team structure nevertheless produced its own set of challenges and learning experiences.  It pushed the team into a social contract between front end and backend, and led to an iterative design/implementation process which allowed robust progress even in the face of and separation of concerns between front and backend, and moving and as yet-to-be-determined design decisions. 


### Video Demo / Screen shot walkthrough of the app

* What were the user stories / what was MVP (mention Minimal Viable Product)

### How does the app work?

* What happens behind the scenes when the user interacts with it?
* OR What are all the places the data travels?  What happens to that data?
* Optionally include a diagram
* How does the tech stack come together?

### What research was required?

To get our testing framework together, a lot of research was needed to get Jest and React Testing Library to fully test functionality for asynchronous calls, full user interaction with the DOM, and with React Router. The most difficult of these was learning how to get the DOM interaction together, as the documentation for React Testing Library is not very thorough in the way their API is laid out. Lots of trial and error, trawling through Stack Overflow, and asking peers for help was needed to get our test suite to where it is now.

* Socket.io

### Workflow and Key Lessons

#### Git Workflow

* After creating the initial skeleton of the app, everyone pulled down the repo and completed their work in separate branches
* Commit as often as possible, and make a pull request when the functionality being worked on works as expected locally
* Request 2 code reviewers for every PR - after both approve, the branch should be merged with the main branch and deleted
* When changes are requested, the person who made the pull request should make the changes, discuss with reviewer(s) and decide when the branch can be merged

#### Tests

* We primarily leveraged Jest + React Testing Library to test our application
* Our goal was to follow a test-driven development approach, but we weren't always able to keep up a rigid workflow around that
* We had some basic tests written which were tested with every push to the repo via CircleCI

#### Key Takeaways

* Getting more tests written early on: we sacrificed writing tests early to quickly develop an MVP to reach client goals
* Establishing more clear guidelines around time expectations for code reviews
* Improve our time estimates for tickets, and better managaement of tickets as they change status
* Look into Github Actions for continuous integration to be used instead of CircleCI
* Consistent and honest code reviews to keep our code clean and DRY (remove console.logs, comments, and make code as re-usable and readable as possible)

#### Project Board

* View our tickets [here](https://github.com/orgs/boc-zoolander/projects/1)

### Future Improvements

* Users can have a friends list and can create sessions more easily by choosing from it.
* Hosts can send payments directly to the restaurants.
* Sessions can end and then rollover into another with the same host and guests.

### Code refactorings

* Refactored SQL strings within the controller to use pg-format, a library which uses C language style delimeters in constructing SQL query strings to thwart SQL injection attacks.
 
* Refactored the database model to properly use environmental variables.

### Performance Optimizations
### Additional features
####etc
### Notes from your Sprint Retro
### What additional features do you plan to add, how do you plan to implement those features?
* Future refactoring?
* Additional dev ops considerations?
* UI/UX additions?
* Backend (Server and DB)
	* Create Routes and populate tables in DB schema to allow for split-session rollovers
	* Create Routes and populate tables to enable to storage of user chats
	* Optimize backend routes to store repeatedly called restaurant API route data in Redis
