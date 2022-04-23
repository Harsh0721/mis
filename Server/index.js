const express = require('express');
const app = express();

const welcome = require('./welcome');
const login = require('./login/login');
const Teacher = require('./Teacher/Teacher');
const Student = require('./Student/Student');
const Courses = require('./Courses/courses');
const announcements = require('./announcements/announcements');


app.use('/', welcome);
app.use('/api/login',login);
app.use('/api/teacher',Teacher);
app.use('/api/student',Student);
app.use('/api/announcements', announcements)
app.use('/api/courses', Courses); 




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));

