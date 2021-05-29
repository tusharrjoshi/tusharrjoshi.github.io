const express = require('express')
const app = express();
const path = require("path");
const fs= require('fs')

const port = 8000;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded({extended: true})); 

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post("/contact", (req, res)=>{
    name = req.body.name
    dob = req.body.dob
    email = req.body.email
    phone = req.body.phone
    des = req.body.des

    let outputToWrite = `The name of the person is ${name} ;;;;; ${dob} ;;; ${email} ;;; ${phone} ;;; ${des} `
    fs.writeFileSync('output.txt', outputToWrite)
    const param ={'message':'Your form has been submitted successfully', }
    res.status(200).render('contact.pug', param);
})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});