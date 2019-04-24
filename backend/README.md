# Backend Server
## How to run
npm install
npm start

## test

### users
localhost:3000/users (Get an users list from database)

POST localhost:3000/users (Create a new user from database)
	{
    "username": "aaa",
    "password": "123456789",
    "email": "aaa@123.com"
  }

GET localhost:3000/users/aaa (Get a certain user from database)

PATCH localhost:3000/users/aaa (Updata a user from database)
	{
    "username": "aaa",
    "password": "987654321",
    "email": "aaa@123.com"
	}

DELETE localhost:3000/users/aaa (Delete a user from database)



### events
GET localhost:3000/events (Get an events list from database)

GET localhost:3000/events/yujxie (Get all events of one certain user from database)

POST localhost:3000/events (Create a new event from database)
	{
    "username": "yujxie",
    "title": "final project start",
    "location": "Snell Library",
    "starttime": "2019-04-11T18:00:00.000Z",
    "endtime": "2019-04-22T18:00:00.000Z"
  }

GET localhost:3000/events/5cb11c65db2ac70afc78545b (Get a certain event from database)

PATCH localhost:3000/events/5cb11c65db2ac70afc78545b (Update an event from database)
	{
	  "_id": "5cb11c65db2ac70afc78545b",
	  "username": "yujxie",
	  "title": "final project start?",
	  "location": "Snell Library",
	  "starttime": "2019-04-11T18:00:00.000Z",
	  "endtime": "2019-04-22T18:00:00.000Z"
	}

DELETE localhost:3000/events/5cb11c65db2ac70afc78545b (Delete an event from database)
