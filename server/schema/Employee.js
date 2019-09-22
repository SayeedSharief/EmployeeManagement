const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    id: Number,
    name: String,
    dob: { type: Date, default: Date.now },
    salary: Number,
    skills: []
    // img: { data: Buffer, contentType: String }
});

module.exports = mongoose.model('Employee', employeeSchema)