import path from "path";
import express from "express";
import session from "express-session";
const { randomUUID } = await import("node:crypto");
import { readFile, writeFile } from "node:fs";

const {
  PORT = 3500,
  PRODUCTION = "true",
} = process.env;

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

  const filePath = PRODUCTION === "false" ? path.join(process.cwd(),"../kube-ex1-01/log.txt") : "/usr/src/app/files/log.txt";
  writeDataToFile(filePath, newViews, "view");

  next();
});

router.get("/", (req, res) => {
  res.send(`pong: ${req.session.views}`);
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});

function writeDataToFile(filePath, data, type) {
  try {
    let newContentArr = [];
    readFile(filePath, "utf8", (err, fileContent) => {
      if (err) throw err;
      
      const fileContentArr = fileContent.split("\n");

      if (fileContentArr.length === 1) {
        newContentArr = type === "view"
          ? fileContentArr[0].length > 50 ? fileContentArr.concat(data) : [data]
          : fileContentArr[0].length > 50 ? [data] : [data, fileContentArr[0]];
      } else {
        newContentArr = fileContentArr.slice(0, 2);
        newContentArr[type === "view" ? 1 : 0] = data;
      }

      const newContent = new Uint8Array(Buffer.from(newContentArr.join("\n")));
      writeFile(filePath, newContent, (err) => {
        if (err) throw err;
        console.log("Data was written to file!");
      });
    });
  } catch(err) {
    console.error("Could not write to file", err);
  }
}