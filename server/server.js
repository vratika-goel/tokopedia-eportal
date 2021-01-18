import express from "express";
import fs from "fs";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from 'react-router-dom';

import App from "../src/components/app/App";

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/*", (req, res, next) => {
  const context = {};
  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Some Error Happened");
    }
    console.log("Data", data);
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${app}</div>`
      )
    );
  });
});

app.use(express.static(path.resolve(__dirname, "../build")));

app.use(express.static('./build'));

app.listen(PORT, () => {
  console.log("App launched on:", PORT);
});
