#!/bin/bash

rm -f express.log react.log

npm install

npm install --prefix ./client/
 
npm run dev >> express.log & 
npm start --prefix ./client/ >> react.log