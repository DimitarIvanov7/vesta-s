// const axios = require('axios');

require('dotenv').config()
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const mongoose = require('mongoose');
const ApartmentMod = require('./models/appartments-mod.js');
const UserMod = require('./models/users-mod.js');
const path = require('path/posix');
const { render } = require('ejs');
const Apartment = ApartmentMod.Apartment
// const dbURI = ApartmentMod.dbURI
const User = UserMod.User
const bcrypt = require('bcryptjs');
const alertMsg = require('alert');
const jwt = require('jsonwebtoken');

const favicon = require('serve-favicon');
const pathico = require('path');

const sendMail = require('./mail');

const app = express();
const port = process.env.PORT || 5000

app.use(express.json());

//favicon
app.use(favicon(pathico.join(__dirname, 'public', 'favicon.ico')));



// connect to mongodb and // listen for req
mongoose.connect(process.env.MONGODB_URI,  {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=> app.listen(port))
    .catch((err)=> console.log(err))

// register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));


//set Storage Engine
const storage = multer.diskStorage({
    destination: './public/images',
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

//inut upload 
const upload = multer({
    storage: storage
})  //.single('Images');

let multipleUpload = upload.fields([{name:'Images'}])

// get the aparment data from MongoDB - move that to  another file?

Apartment.find()
    .then((result)=>{
        let data = JSON.stringify(result);
        fs.writeFileSync('./public/apparts.json', data);
    })
    .catch((err)=>{
        console.log(err)
    })


// post apartment
app.post('/logged-user', (req, res)=>{
    multipleUpload(req,res,(err) =>{
        if(err){
            console.log(err)
        }
        else {

            let imageList = [];
            for(let i = 0; i<Object.values(req.files)[0].length; i++){
                imageList.push("/images/"+Object.values(req.files)[0][i].filename)
            }
            const apartment = new Apartment({
                Title: req.body.Titles,
                Prices: "€" + String(req.body.Prices).slice(0, -3) +"," + String(req.body.Prices).slice(-3),
                Size: req.body.Size + " м²",
                Description: req.body.Description,
                Locations: req.body.Locations,
                Neighborhoods: req.body.Neighborhoods,
                Types: req.body.Types,
                BuildingTypes: req.body.BuildingTypes,
                YearsBuild: req.body.YearsBuild,
                Floors: req.body.Floors,
                BrokerContacts: req.body.BrokerContacts,
                PhoneContacts: req.body.PhoneContacts,
                Rooms: req.body.Rooms,
                Heatings: req.body.Heatings,
                Images: imageList,
            }
            );

            apartment.save()
                .then((result)=>{
                    // res.redirect('/logged-user')
                }) 
        }
    })
})

//send emails
app.post('/email', (req, res)=>{
    console.log(req.body);

    //send email
    const {email, name, tel, type, message, subject} = req.body;
    sendMail(email,  name,  tel, type,  message, subject);
    res.redirect("/")
})

//login page
app.get('/login', (req, res) => {
    res.render('login');
});

//login try
app.post('/login', async (req, res)=>{

    const user = await User.findOne({
        'name':req.body.name,
    })

    console.log(user);
    if(user == null){
        console.log("wrong-user");
        alertMsg("Грешно име");
        res.redirect('/login');
    }
    else {
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(validPass){
            
            authorization()
        }
        else{
            console.log("wrong password");
            alertMsg("Грешнa парола");
            res.redirect('/login');
        }
    }

    function authorization(){
        const username = user.name;
        const authozirateUser = {name: username};
        const accessToken =  jwt.sign(authozirateUser, process.env.ACCESS_TOKEN_SECRET);

        console.log(accessToken);

        auth = 'Bearer ' + accessToken;


        res.header('Authorization', auth);

        Apartment.find()
                .then((result)=>{
                    res.render('logged-user', {aparts: result});
                })
                .catch((err)=>{
                    console.log(err);
                })  
    }
    
})

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    
    if(token==null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, authozirateUser) => {
        if(err) return res.sendStatus(403)
        req.authozirateUser = authozirateUser
        next()
    })
}

app.get('/logged-user', authenticateToken, (req, res) => {
    Apartment.find()
        .then((result)=>{
            res.render('logged-user', {aparts: result});
        })
        .catch((err)=>{
            console.log(err);
        })   
});

app.get('/new-user', (req, res) => {
    User.find()
        .then((result)=>{
            res.render('new-user', {users: result});
        })
        .catch((err)=>{
            console.log(err);
        })      
});

app.get('/apartment/:title', (req, res) => {
    const title = req.params.title;
    Apartment.findOne({'Title':title})
        .then(result => {
            res.render('details', {apartment: result, title: 'Apartment Details'})
        })
        .catch(err => {
            console.log(err);
        })
})

app.delete('/apartment/:id', (req, res) => {
    const id = req.params.id;
    Apartment.findByIdAndDelete(id)
        .then((result)=>{
            // res.json({redirect: '/logged-user'});
            res.redirect(req.originalUrl)
        })
})

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/buy-home', (req, res) => {
    res.render('buy-home');
});

app.get('/sell-property', (req, res) => {
    res.render('sell-property');
});

app.get('/about-us', (req, res) => {
    res.render('about-us');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

//post new user
app.post('/new-user', async (req, res)=>{
    console.log("req.body");

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        password: hashedPass,
    })
    
    user.save()
        .then((result)=>{
            // res.redirect('/logged-user')
            res.redirect(req.originalUrl)
        }) 
})


app.use((req, res) => {
    res.status(404).render('404');
})
