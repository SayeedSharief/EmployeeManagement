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

const Employee = require('./Employee')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/employee', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('WE are connected')
});

// var emp = new Employee({
//     id: 1,
//     name: 'uzair',
//     // dob: { type: Date, default: Date.now },
//     salary: 50000,
//     skills: ['angular', 'node']
//     // img: { data: Buffer, contentType: String }
// })

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
    console.log('Received post =', req.body)
    var emp = new Employee(req.body)
    emp.save(function (err, emp) {
        if (err) return console.error(err);
        // fluffy.speak();
        console.log('Successfully Inserted Employee')
    });
    res.json({'res':'Success'})
})

app.listen(3000, () => {
    console.log("Express listening on port 3000")
})



// mongoose.connect('mongodb://localhost:27017/employee', {useNewUrlParser: true});

// mongoose.connection.on('open', function () {
//     console.log('Mongoose Connected')

//     app.get('/', (req, res) => {
//         // res.json({'res': 'success'})

//         Employee.find({ },  function (err, employee) {
//             if (err) return handleError(err);
//             // Prints "Space Ghost is a talk show host".
//             console.log(employee);
//             res.json(employee)
//           });

//         // Employee.findOne({})
//         // .then( data => {
//         //     console.log('data =', data)
//         //     res.json(data)
//         // })
//         // .catch( err => {
//         //     res.json(err)
//         // })
//     })
// });

// mongoose.connection.on('open', function () {
//   console.error('mongo is open');

// //   A.remove(function (err) {
// //     if (err) throw err;

//     // store an img in binary in mongo
//     var a = new A;
//     a.img.data = fs.readFileSync(imgPath);
//     a.img.contentType = 'image/png';
//     a.save(function (err, a) {
//       if (err) throw err;

//       console.error('saved img to mongo');

//       // start a demo server
//       var server = express();
//       server.get('/', function (req, res, next) {
//         A.findById(a, function (err, doc) {
//           if (err) return next(err);
//           res.contentType(doc.img.contentType);
//           res.send(doc.img.data);
//         });
//       });

//       server.on('close', function () {
//         console.error('dropping db');
//         mongoose.connection.db.dropDatabase(function () {
//           console.error('closing db connection');
//           mongoose.connection.close();
//         });
//       });

//       server.listen(3000, function (err) {
//         // var address = server.address();
//         console.error('server listening on 3000');
//         console.error('press CTRL+C to exit');
//       });

//       process.on('SIGINT', function () {
//         server.close();
//       });
//     });
// //   });

// });



// // app.use(function (req, res, next) {
// //     res.header("Access-Control-Allow-Origin", "*");
// //     res.header('Access-Control-Allow-Methods', 'POST');
// //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// //     next();
// //   });

// var collection;

// var findDocuments = async function(db, callback){
//     collection = db.collection('sample');

//     collection.find().toArray(function(err, docs){
//         console.log(docs)
//         callback;
//     })

//     // collection.insert({
//     //     "id": await collection.find().count()+1,
//     //     "name":"Ammaar"
//     // }, function(err, res){
//     //     collection.find().toArray(function(err, docs){
//     //         console.log(docs)
//     //         callback;
//     //     })
//     // })    
// }

// app.get('/', (req, res) => {
//     // res.status(200).send('Home Page')
//     collection.find().toArray((err, docs) => {
//         res.json(docs)
//     })
// })

// app.get('/employees', (req, res) => {
//     console.log('Get All employees')
// })

// MongoClient.connect('mongodb://localhost:27017/employee', function (err, client) {
//   if (err) throw err

//   console.log('Connected successfully to MongoDB')

//   var db = client.db('employee')

//   findDocuments(db, function(){
//       db.close()
//   })
// //   collection.find().toArray(function (err, result) {
// //     if (err) throw err

// //     console.log(result)
// //   })
// })

// app.listen(port, ()=>{
//     console.log(`Node server listening on ${port}`);
// })