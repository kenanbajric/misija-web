misija-web 

Dependecies: 
nodemo,
bcrypt,
jwt,
nodemailer,
multer,
uuid,
slugify,


README
Start app by using comand "npm start";

If I had more time I would:
- implement mail verification with nodemailer,
- implement text search for fetchng all offers,
- write a couple of unit tests (I wrote these only while I was watching courses. I never write any unit test on my own)
- data validations (assignment didnt ask for it, but I know how to validate data)



Observations:

I think there are some logical inconsistencies in assignment. Examples:

"Endpoint to retrieve a single section. There should be an option to optionally include the section and author"

"'Sections' table should contain 'order'"




Tasks I dont know how to solve without help:

- Timestamps for publishedAt and unpublishedAt



Tasks I am not sure about

- Migrations and seeders - I think this is only for Laravel/mySql stack, not sure is it a must to do if you are using MongoDB (collections create on fly)