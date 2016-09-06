# The Septa Unella Honors Program (SUHP)

Description
-----------
This one of a kind motivation app allows users to make goals and set a deadline to accomplish those goals. If the user is able to accompish his or her goal by the deadline, a congratulations email is sent out to the user and a chosen list of his or her friends. However, if the user does not accomplish a goal by the set deadline, Game of Throne's own Septa Unella will visit the user and his or her friends via email and cry out SHAME! SHAME! SHAME!



Style Guide
-----------

######Commenting

At the beginning of each file, write a 1-2 line comment explaining the purpose of the file in relation to the project.
Write a multiline comment explaining the purpose of any function / method / variable / service / element that may be confusing or unclear to the reader.


Front End 
---------

Utilizes Angular 1.5, ng-route and Bootstrap. All factories are located in the services.js file. Routing is located in app.js. 


|Endpoint | Method | Response | Expected |
|         |        |          |          |
| /signin | GET | **Array of single user where user login matched user in database | [{
    "id": 1,
    "username": "Lee",
    "email": "lee@gmail.com",
    "password": "pass",
    "createdAt": "2016-08-28T18:12:15.031Z",
    "updatedAt": "2016-08-28T18:12:15.031Z"
  }]

{
“username”:”lee”,
“password”:”MKS”

} |

| /signup| POST|***If Successful |{
    "username": "Lee",
    "email": "lee@gmail.com",
    "password": "pass",
} |
|/goals | GET| ***An array of all goals belonging to a user
[  {
    "id": 1,
    "description": "to be the best lucas EVER",
    "deadline": "2020-01-12T08:00:00.000Z",
    "hasExpired": false,
    "hasCompleted": false,
    "createdAt": "2016-08-30T18:48:17.491Z",
    "updatedAt": "2016-08-30T18:48:17.491Z",
    "UserId": 1
  }
...{}....{}] | {
    "username": "Lee",
}|
|/goals | POST| ***if successful |  {
“username”:”lucas”,
“description”:”lose 5 lbs”,
“deadline”: “September 20, 2016 17:58:00”
}|
|/goals | PUT | **if successful |  ***get the goal ID from the field ID in the goals JSON object returned in the GET request
{
     goalId:1;
}|
| /email | POST | ***if successful | **an array of emails
{“username”:”lucas”,
“emails”: 
[ ‘lucas@gmail’,
   ‘lee@gmail’ ]
}|


