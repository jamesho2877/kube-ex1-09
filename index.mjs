import express from "express";
import session from "express-session";
const { randomUUID } = await import("node:crypto");

const PORT = process.env.PORT || 3500;
const app = express();
const router = express.Router();

app.use(
  session({
    genid: () => randomUUID(),
    secret : 'mySecretPassPhrase',
    resave: false,
    saveUninitialized: true,
    cookie : {
      maxAge : 1000 * 60 * 60 * 24 * 1,
    },
  })
);

router.use(function (req, res, next) {
  const curViews = req.session.views;
  const newViews = curViews > 0 ? curViews+1 : 1;
  req.session.views = newViews;

  next();
});

router.get("/", (req, res) => {
  res.send(`pong: ${req.session.views}`);
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});