const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact')
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());  //Middleware
app.use(express.static('assets'));

// // Middleware 1 example
// app.use(function(req, res, next) {
//     console.log("Middleware 1 called");
//     next();
// });

// // Middleware 2 example
// app.use(function(req, res, next) {
//     console.log("Middleware 2 called");
//     next();
// });

var contactList = [
    {
        name: "Shubham",
        phone: "8585915249"
    },
    {
        name: "Sniper",
        phone: "1234567890"
    },
    {
        name: "Husker",
        phone: "1212121212"
    }
]

app.get('/', function(req, res) {

    Contact.find({}, function(err, contacts){
        if(err) {
            console.log('error in fetching contacts from db');
            return;
        }
        return res.render('home', {
            title: "My Contacts List",
            contact_list: contacts
        });
    });
});

app.get('/practice', function(req, res) {
    return res.render('practice', {
        title: "Let us play"
    });
});

app.post('/create-contact', function(req, res) {
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact) {
        if(err) {console.log('Error in creating contact'); return;}

        console.log('**********', newContact);
        return res.redirect('back');
    });
});

// For deleting the contact from list
app.get('/delete-contact', function(req, res) {
    // get the ID form query in url
    let id = req.query.id;

    // find the contact in the data base using id and delete it
    Contact.findByIdAndDelete(id, function(err) {
        if(err) {
            console.log('Error in deleting the object from database');
            return;
        }
        return res.redirect('back');
    });
});

app.listen(port, function(err) {
    if(err) {
        console.log('Error in running the server', err);
    }
    console.log('Express Server is running on port: ', port);
});