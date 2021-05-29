
const express = require('express');

const app = express();
const nodemailer = require("nodemailer");


const PORT = process.env.PORT || 5000;

app.use(express.static('public'))
app.use(express.json())


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/', (req, res) => {
    console.log(req.body);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "contacts.chamundagrups@gmail.com",
            pass: "***********"
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: 'hellotusharr2318@gmail.com',
        subject: `message from ${req.body.name}`,
        text: `Message recieved from ${req.body.email}: and message is about: ${req.body.message}`
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('send');
            res.send('success');
        }
    })


});

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
})