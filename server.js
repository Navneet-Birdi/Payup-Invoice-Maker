const path = require("path");
const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
const  User  = require('./models/user')
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

 const sess = {
  secret: "Super secret secret",
   cookie: {},
  resave: false,
   saveUninitialized: true,
  store: new SequelizeStore({
     db: sequelize,
   }),
 };

 app.use(session(sess));

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// LOAD INDEX.HTML ON LANDING PAGE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/index.html"));
});

// LOAD SIGNUP.HTML
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/signup.html"));
});

// LOGIN TO VIEW INVOICE FORM
app.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        name: req.body.user,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    // SET SESSION VARIABLE LOGGEDIN TO TRUE 
    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
    // LOAD INVOICE FORM
    app.get("/invoice", (req, res) => {
      res.sendFile(path.join(__dirname, "public/html/invoice.html"));
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening at http://localhost:${PORT} 🚀`)
  );
});
