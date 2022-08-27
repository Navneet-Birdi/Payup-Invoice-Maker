// IMPORT SERVER PACKAGES
const path = require("path");
const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
const User = require("./models/user");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});

// DEFINE PORT
const app = express();
const PORT = process.env.PORT || 3001;

// CREATE SESION TO USE
const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// USE SESSION
app.use(session(sess));

// HANDLE MVC
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

// START SERVER
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening at http://localhost:${PORT} 🚀`)
  );
});
