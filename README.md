# Pokemon Diary
Restfulapi server for getting your pokemon's IV and other details including height and weight in JSON (Pokemon Go) with a delightful build-in webUI

## Install
1. `npm install`
1. `npm install -g webpack`
2. `npm run all`

## Usage
* `http://localhost:8887/` to see the UI page
* `curl -H "Content-Type: application/json" -X POST -d '{"username":"xxxxx", "password": "xxxxx"}'  http://localhost:8887/pokemon/list` to call the backend api

## develop UI
`npm run ui-dev`

## build UI
`npm run ui-build`

## Screenshot
![](./screenshot.png)

## Demosite
http://ilcic.synology.me:9696/
