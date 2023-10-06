const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/WellnessEdu')

// const UserSchema = new mongoose.Schema({
//     name: String,
//     age: Number
// })

require("./userData")
require("./exercise")
const UserModel = mongoose.model("UserDatas")
const ExerciseModel = mongoose.model("Exercise");

// app.get("getUsers",(req,res) =>{
    
// })
app.listen(3001, () => {
    console.log("mongoDB Server Connected ")
})
try{
    UserModel.create({
        username: "abcde",
        password: "123",
    });
}
catch(error){
    console.log("Error: " + error);
}

try{
    ExerciseModel.create({
        type: "Reading",
        description: "reading power of now ",
        duration: 30
    })
    
}
catch(error){
    console.log("Error" + error);
}

UserModel.findByIdAndUpdate({
    username: "SOLAN",

})