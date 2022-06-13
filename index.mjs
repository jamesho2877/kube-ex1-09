import express from "express";
import Database from "./src/database.mjs";
// import session from "express-session";
// const { randomUUID } = await import("node:crypto");

const { PORT = 3500 } = process.env;

const app = express();
const router = express.Router();
const database = new Database();

// app.use(
//   session({
//     genid: () => randomUUID(),
//     secret : 'mySecretPassPhrase',
//     resave: false,
//     saveUninitialized: true,
//     cookie : {
//       maxAge : 1000 * 60 * 60 * 24 * 1,
//     },
//   })
// );

// router.use(async (req, res, next) => {
//   const curViews = await database.readPingPongContent();
//   const newViews = curViews +1;

//   const newViewsFromDB = await database.writePingPongContent(newViews);
//   req.session.views = newViewsFromDB;

//   next();
// });


router.get("/", async (req, res) => {
  res.send("Hi");
});

router.get("/pingpong", async (req, res) => {
  const curViews = await database.readPingPongContent();
  const newViews = curViews +1;

  const newViewsFromDB = await database.writePingPongContent(newViews);
  
  res.send(`pong: ${newViewsFromDB}`);
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});