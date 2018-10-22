

## Instructions

  
**Running Locally**

Step 1: [command line] $ npm install -g

Step 2: Create database called `ufinity` import data.sql and import `db/data.sql`

Step 4: Create `.env` file on root project directory with following contents:

```
DB_USER=root
DB_PASS=<db password>
DB_DATABASE=ufinity
```

Step 3: [command line] `$ npm start`

Step 4: (optional) If database error occured during the connection of the app open directory 

> db/connect.js and edit the `mysql.createPool({})` configuration. Restart the app when applicable

  
**To access unit test:**  `$ npm run test`


**Heroku URL**: http://glossy-radio-215012.appspot.com/  

## End points:

####  1. [POST] http://localhost:3000/api/register

A teacher can register multiple students. A student can also be registered to multiple teachers.

• Endpoint: POST /api/register

• Headers: Content-Type: application/json

• Success response status: **HTTP 204**

```
Request body example: 
{
	"teacher": "teacherken@gmail.com"
	"students": [
		"studentjon@example.com",
		"studenthon@example.com"
	]
}
```

####  2. [GET] http://localhost:3000/api/commonstudents

As a teacher, I want to retrieve a list of students common to a given list of teachers (i.e. retrieve students who are registered to ALL of the given teachers). 

• Endpoint: GET /api/commonstudents 

• Success response status: HTTP 200 

• Request example 1: GET /api/commonstudents?teacher=teacherken%40example.com 

• Success response body 1: 

```
{
	"students": [
		"commonstudent1@gmail.com",
		"commonstudent2@gmail.com",
		"student_only_under_teacher_ken@gmail.com"
	]
}
```

• Request example 2: GET /api/commonstudents?teacher=teacherken%40example.com&teacher=teacherjoe%40example.com 

• Success response body 2: 

```
{
	"students": [
		"commonstudent1@gmail.com",
		"commonstudent2@gmail.com"
	]

}
```

#### 3. [POST] http://localhost:3000/api/suspend

As a teacher, I want to suspend a specified student.

• Endpoint: POST /api/suspend

• Headers: Content-Type: application/json

• Success response status: HTTP 204

• Request body example:

```

{
	"student" : "studentmary@gmail.com"
}

```

#### 4. [POST] http://localhost:3000/api/retrievefornotifications

As a teacher, I want to retrieve a list of students who can receive a given notification.

• A notification consists of:

- the teacher who is sending the notification, and

- the text of the notification itself.



To receive notifications from e.g. 'teacherken@example.com', a student:

MUST NOT be suspended,

AND MUST fulfill AT LEAST ONE of the following:

- i. is registered with “teacherken@example.com"

- ii. has been @mentioned in the notification



The list of students retrieved should not contain any duplicates/repetitions.

• Endpoint: POST /api/retrievefornotifications

• Headers: Content-Type: application/json

• Success response status: HTTP 200

• Request body example 1:

  

```
{
	"teacher": "teacherken@example.com",
	"notification": "Hello students! @studentagnes@example.com @studentmiche@example.com"
}
```

  

• Success response body 1:

```
{
	"recipients": [
		"studentbob@example.com",
		"studentagnes@example.com",
		"studentmiche@example.com"
	]
}
```

  

In the example above, `studentagnes@example.com and studentmiche@example.com` can receive the notification from `teacherken@example.com`, regardless whether they are registered to him, because they are @mentioned in the notification text. `studentbob@example.com however`, has to be registered to `teacherken@example.com.`

• Request body example 2:

```
{
	"teacher": "teacherken@example.com",
	"notification": "Hey everybody"
}
```

  

• Success response body 2:

```
{
	"recipients": [
		"studentbob@example.com",
	]
}
```

  

## Error Responses

For all the above API endpoints, error responses should:

have an appropriate HTTP response code

have a JSON response body containing a meaningful error message:

  

`{ "message": "Some meaningful error message" }`