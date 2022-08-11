import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import { App } from './app';

const fs = require('fs');
const path = require('path');
const request = require('request');
const penthouse = require('penthouse');

const server = express();

const cssString = fs.readFileSync(path.resolve(__dirname, './compiled-css.css'), 'UTF-8');

const extract =  (url) => {
    return penthouse({
        url,
        cssString,
    })
}

server
  .disable('x-powered-by')
  .use(express.static(__dirname))
  .get('/', (req, res) => {
    const markup = renderToString(<App />);

      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="/compiled-css.css">
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
      );
  }).get('/critical', (req, res) => {
    extract('http://localhost:3000').then(criticalCss => {
      const markup = renderToString(<App />);

      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>${criticalCss}</style>
    </head>
    <body>
        <div id="root">${markup}</div>
        <link rel="stylesheet" href="/compiled-css.css">
    </body>
</html>`
      );
    });
  });

export default server;
