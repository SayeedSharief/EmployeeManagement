const express = require('express')

const app = express()

var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const port = 3000

const path = require("path");
const imgPath = path.resolve(__dirname, "Screenshot.png");
console.log('Image Path', imgPath)

var MongoClient = require('mongodb').MongoClient;

const bodyParser = require('body-parser');
const cors = require('cors')

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

const Employee = require('./schema/Employee')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/employee', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('WE are connected')
});

app.get('/getEmployees', (req, res) => {
    Employee.find(function (err, employees) {
        if (err) return console.error(err);
        console.log('Employee =', employees);
        res.json(employees)
    })
})

app.get('/getEmployee/:name', (req, res) => {
    Employee.find({"name": req.params.name}, function (err, employee) {
        if (err) return console.error(err);
        console.log('Employee =', employee);
        res.json(employee)
    })
})

 app.post('/addEmployee', (req, res) => {
    var emp = new Employee(req.body)
    // emp.id = await Employee.find().count+1;
    console.log('Emp Obj =', emp)
    emp.save(function (err, emp) {
        if (err) return console.error(err);
        // fluffy.speak();
        console.log('Successfully Inserted Employee')
    });
    res.json({'res':'Success'})
})

app.post('/updateEmployee', (req, res) => {
    console.log('Inside update employee, data =', req.body);
    Employee.updateOne({name: req.body.name}, req.body, (err, res) => {
        if(err){
            console.log('Error occured!');
        }
        console.log('Updated Successfully');
    })
})

app.listen(3000, () => {
    console.log("Express listening on port 3000")
})
