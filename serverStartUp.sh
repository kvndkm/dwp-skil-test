#!/bin/bash
npm install
mocha ./src/test/*-test.js
echo "Input the server port"
read PORT
PORT=`echo $PORT`
export PORT 
echo "Server PORT; $PORT"
PROXYPORT=$PORT
export PROXYPORT
node ./src/main/app.js



