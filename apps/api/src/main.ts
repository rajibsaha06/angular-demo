/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as fs from 'fs';
import * as cors from 'cors';

const app = express();

let directoryPath = null;
const storagePath = path.join(__dirname, 'assets/storage/');
const directories = [{ project: 'angular-demo', path: 'assets/angular-demo' }];

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'x-requested-with, Content-Type, origin, authorization, accept, client-security-token,ctoken,userid'
  );
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
exposeApis(directories);
app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

function exposeApis(folders) {
  folders.forEach((directory) => {
    readFolder(directory);
  });
}

function readFolder(directory) {
  directoryPath = path.join(__dirname, directory.path);
  const apiPath = directory.path.substr(6) + '/';
  fs.readdir(directoryPath, (err, files) => {
    if (files) {
      files.forEach((file) => {
        if (file.endsWith('.json')) {
          const apiUrl = apiPath + file;
          const jsonPath = path.join(__dirname, directory.path, file);
          app.post(apiUrl, (req, res) => {
            fs.readFile(jsonPath, 'utf8', (postErr, data) => {
              if (postErr) {
                throw postErr;
              }
              res.send(JSON.parse(data));
            });
          });
          app.get(apiUrl, (req, res) => {
            fs.readFile(jsonPath, 'utf8', (getErr, data) => {
              if (getErr) {
                throw getErr;
              }
              res.send(JSON.parse(data));
            });
          });
        } else {
          readFolder({
            project: directory.project,
            path: directory.path + '/' + file,
          });
        }
      });
    }
  });
}
