#!/bin/sh

cp config.example config.js

sed -i "s~'API_PATH'~'$API_PATH'~g" config.js

yarn start -p 8080