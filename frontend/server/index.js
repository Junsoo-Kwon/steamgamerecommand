var express = require("express"),
  passport = require("passport"),
  util = require("util"),
  session = require("express-session"),
  SteamStrategy = require("passport-steam").Strategy;

var mongoose = require("mongoose");
var bodyParser = require("body-parser");
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new SteamStrategy(
    {
      /* 개발 */
      // returnURL: "http://localhost:5000/auth/steam/return",
      // realm: "http://localhost:5000/",
      /* 배포 */
      returnURL: "http://j3b305.p.ssafy.io:5000/auth/steam/return",
      realm: "http://j3b305.p.ssafy.io:5000/",
      apiKey: "11B61EB5984F1F23A3991FC9C24A0E0A",
    },
    function (identifier, profile, done) {
      process.nextTick(function () {
        profile.identifier = identifier;
        return done(null, profile);
      });
    }
  )
);

var app = express();
app.use(bodyParser.json());
app.use(
  session({
    secret: "your secret",
    name: "name of session id",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + "/../../public"));

app.get("/", function (req, res) {
  res.render("index", { user: req.user });
});

app.get("/auth/account", ensureAuthenticated, function (req, res) {
  res.send({ user: req.user });
});

app.get("/auth/logout", function (req, res) {
  req.logout();
  /* 개발 */
  // res.redirect("http://localhost:3000/");
  /* 배포 */
  res.redirect("http://j3b305.p.ssafy.io:3000/");
});

// GET /auth/steam
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Steam authentication will involve redirecting
//   the user to steamcommunity.com.  After authenticating, Steam will redirect the
//   user back to this application at /auth/steam/return
app.get(
  "/auth/steam",
  passport.authenticate("steam", {
    failureRedirect: "http://j3b305.p.ssafy.io:3000/",
  }),
  function (req, res) {
    /* 개발 */
    // res.redirect("http://localhost:3000/survey");
    /* 배포 */
    res.redirect("http://j3b305.p.ssafy.io:3000/survey");
  }
);

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get(
  "/auth/steam/return",
  passport.authenticate("steam", {
    failureRedirect: "http://j3b305.p.ssafy.io:3000/",
  }),
  function (req, res) {
    const userId = req.user.id;
    User.findOne({ _id: userId }, function (err, user) {
      if (err) return res.status(500).json({ error: err });
      if (!user) {
        // db에 등록된 user가 없다면 생성해서 넣어줄 것
        const newData = {
          _id: userId,
          is_survey: false,
        };
        User.create(newData)
          /* 개발 */
          // .then(res.redirect("http://localhost:3000/survey"))
          /* 배포 */
          .then(res.redirect("http://j3b305.p.ssafy.io:3000/survey"))
          .catch((err) => res.status(500).send(err));
      } else if (user.is_survey === false) {
        /* 개발 */
        // res.redirect("http://localhost:3000/survey");
        /* 배포 */
        res.redirect("http://j3b305.p.ssafy.io:3000/survey");
      } else {
        /* 개발 */
        // res.redirect("http://localhost:3000/usercustom");
        /* 배포 */
        res.redirect("http://j3b305.p.ssafy.io:3000/usercustom");
      }
    });
  }
);

app.listen(5000);

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("http://j3b305.p.ssafy.io:3000");
}

const dotenv = require("dotenv");
dotenv.config();

var databaseUrl =
  "mongodb://SSAFYMONGO:ssafyadmin1234@j3b305.p.ssafy.io:27017/sgr?authSource=admin&authMechanism=SCRAM-SHA-1";

// Node.js의 native Promise 사용
mongoose.Promise = global.Promise;

mongoose.connect(
  databaseUrl,
  { useUnifiedTopology: true, useNewUrlParser: true },
  function (err, db) {
    if (err) throw err;
  }
);
var db = mongoose.connection;
db.on("error", console.error);
db.once("open", function () {
  // CONNECTED TO MONGODB SERVER
  console.log("Connected to mongod server");
});

// DEFINE MODEL
var User = require("./models/user");
