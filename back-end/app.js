// import express module
const express = require("express");
// import body parser module
const bodyParser = require("body-parser");
// create an express application
const app = express();
// import mongoose
const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/sportDB');
// import bcrypt
const bcrypt = require("bcrypt");
// import multer
const multer = require("multer");
// import axios module
const axios = require("axios");
// import path
const path = require("path");
// impoter jsonwebtoken
const jwt=require("jsonwebtoken");
// importer authenticate
const authenticate= require("./middelware/authenticate")
// configure body-parser
// send JSON responses
app.use(bodyParser.json());
// get object from request
app.use(bodyParser.urlencoded({ extended: true }));
// config path
// importer match model
const Match = require("./models/match");
const Player = require("./models/player");
const User = require("./models/user");
const Team = require("./models/team");
// avatars => shortcut
//  backend/images => original path
app.use('/avatars', express.static(path.join('back-end/images')));

const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null
        }
        cb(null, 'back-end/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});
// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});


// simulation BD
let matchTab = [
    { id: 1, scoreOne: 2, scoreTwo: 0, teamOne: 'FBA', teamTwo: 'RMD' }
];
// bussniess logic Add Match
app.post("/matches", (req, res) => {
    console.log("here BL:Add Match");
    // create match var (type Match) => will be save into matches
    let match = new Match({
        scoreOne: req.body.scoreOne,
        scoreTwo: req.body.scoreTwo,
        teamOne: req.body.teamOne,
        teamTwo: req.body.teamTwo,

    });
    console.log("here match", match);
    match.save();
    res.json({ message: "added" });
});

// bussniess logic get all Match
app.get("/matches",authenticate, (req, res) => {
    console.log("here BL:get all Match");
    Match.find().then((data) => {
        res.json({ matches: data, message: "ok" });
    })

});

// bussniess logic edit Match
app.put("/matches", (req, res) => {
    console.log("here BL:edit Match");
    let newMatch = req.body;
    Match.updateOne({ _id: newMatch._id }, newMatch).then((editResponse) => {
        console.log("editResponse", editResponse);
        if (editResponse.nModified == 1) {
            res.json({ message: "match edited with success" });
        }
    }

    )



});
// bussniess logic get Match by id
app.get("/matches/:id", (req, res) => {
    console.log("here BL:get Match by id");
    let id = req.params.id;
    let match = {};
    Match.findOne({ _id: req.params.id }).then((data) => {
        res.json({ findedMatch: data });
    })

});
// bussniess logic delete Match by id
app.delete("/matches/:id", (req, res) => {
    console.log("here BL:delete Match by id");
    let id = req.params.id;
    for (let i = 0; i < matchTab.length; i++) {
        if (matchTab[i].id == id) {
            matchTab.splice(i, 1);
            break;

        }

    }

    res.json({ message: `match N° ${id} is deleted` });

});
// bussniess logic Add playe
app.post("/players", (req, res) => {
    console.log("here BL:Add player");
    let player = new Player({
        age: req.body.age,
        name: req.body.name,
        nbr: req.body.number,
        position: req.body.position

    });
    console.log("here match", player);
    player.save();
    res.json({ message: "added" });


});

// bussniess logic get all player
app.get("/players", (req, res) => {
    console.log("here BL:get all player");
    Player.find().then((data) => {
        res.json({ players: data, message: "ok" });
    })

});

// bussniess logic edit player
app.put("/players", (req, res) => {
    console.log("here BL:edit player");


});
// bussniess logic get player by id
app.get("/players/:id", (req, res) => {
    console.log("here BL:get player by id");

    Player.findOne({ _id: req.params.id }).then((data) => {
        res.json({ player: data });
    })
});
// bussniess logic delete player by id
app.delete("/players/:id", (req, res) => {
    console.log("here BL:delete player by id");

});
// bussniess logic login 
app.post("/users/signin", (req, res) => {
    console.log("here into BL login ", req.body);
    let findedUser
    User.findOne({ email: req.body.email }).then(
        (doc) => {
            findedUser = doc;
            console.log("here search object by email", doc)
            if (!doc) {
                
                res.json({ message: "0" })
            }

            return bcrypt.compare(req.body.password, doc.pwd);
        }).then(
            (pwdResult) => {

                if (!pwdResult) {
                    res.json({ message: "1" });
                } else {
                    const  token = jwt.sign(
                        {
                          email: findedUser.email,
                          userId: findedUser._id,
                          userRole: findedUser.role,
                        },
                         "Testing" ,
                        { expiresIn:  "1min"  }
                      );
                       let userSend = {
                        id: findedUser._id,
                        firstName: findedUser.firstName,
                        lastName: findedUser.lastName,
                        role: findedUser.role,
                        jwt: token,
                        expiresIn:  60,
                      };
               
                    
                    res.json({ message: "2", user: userSend });
                }
            });


});
// bussniess logic signup
app.post("/users/subscription", multer({ storage: storageConfig }).single('img'), (req, res) => {
    console.log("here into signup", req.body);
    bcrypt.hash(req.body.password, 8).then(
        (cryptedPwd) => {

            let user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                pwd: cryptedPwd,
                role: req.body.role,
                avatar: `http://localhost:3000/avatars/${req.file.filename}`

            });
            user.save((error, doc) => {
                console.log("here error", error);
                console.log("here doc", doc);

                if (doc) {
                    res.json({ message: "user added" });
                } else {
                    res.json({ message: "error" });
                }

            });

        }

    )

});
// bussniess logic edit user
app.put("/users", (req, res) => {
    console.log("here BL:edit user");


});
// business logic search match
app.post("/matches/search", (req, res) => {
    console.log("here BL : search match", req.body);
    for (let index = 0; index < matchTab.length; index++) {
        if (matchTab[i].scoreOne == req.body.scoreOne && matchTab[i].scoreTwo == req.body.scoreTwo) {
            findedMatches.puch(matchTab[i]);
        }

    }
    res.json({ matches: findedMatches });

});

// business logic add team
app.post("/teams", (req, res) => {
    console.log("here into business logic add team", req.body);
    let teamObject = new Team({
        name: req.body.name,
        foundation: req.body.foundation,
        stadium: req.body.stadium,
        owner: req.body.owner


    })
    teamObject.save((error, doc) => {
        if (error) {
            res.json({ message: "notok" })
        } else {
            res.json({ message: "ok" })
        }

    });

});
// business logic get all team
app.get("/teams", (req, res) => {

    console.log("here BL:get all team");
    Team.find().then((data) => {
        res.json({ teams: data, message: "ok" });
    })

});

// business logic delete team

app.delete("/teams/:id", (req, res) => {
    console.log("here into delete by id", req.params.id);
    let teamId = req.params.id;

    Team.deleteOne({ _id: teamId }).then(
        (deleteResponse) => {
            console.log("deleteResponse", deleteResponse);
            if (deleteResponse.deletedCount == 1) {
                res.json({ message: "deleted with success" });
            }

        });
});


// business logic get team by id 
app.get("/teams/:id", (req, res) => {
    console.log("here BL:get player by id");

    Team.findOne({ _id: req.params.id }).then((data) => {
        res.json({ team: data });
    })

})


// business logic search weather

app.post("/weather", (req, res) => {
    console.log("here BL:search weather", req.body);
    let city = req.body.city;
    let key = "62ee756a34835483299877a61961cafb";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    axios.get(apiURL).then(
        (apiResponse) => {
            console.log("here apiResponse", apiResponse.data);

            let result = {
                temp: apiResponse.data.main.temp,
                sunrise: apiResponse.data.sys.sunrise,
                sunset: apiResponse.data.sys.sunset,
                humidity: apiResponse.data.main.humidity,
                icon: `http://openweathermap.org/img/w/${apiResponse.data.weather[0].icon}.png`
            };
            res.json({ response: result })  
        })

});

//make app importable from another files 
module.exports = app;