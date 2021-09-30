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
### Performance Optimizations
### Additional features
####etc
### Notes from your Sprint Retro
### What additional features do you plan to add, how do you plan to implement those features?
* Future refactoring?
* Additional dev ops considerations?
* UI/UX additions?
