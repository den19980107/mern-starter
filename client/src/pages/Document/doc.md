# MERN starter

## Requirement

* node.js
* mongodb
* react

## Introduction

this is the mern stack (Mongodb,express.js,React.js,Node.js) starter, feauter below

* `google`,`facebook`,`local` strategy login
* front end using [ant design](https://ant.design/index-cn) and [react-bootstrap](https://react-bootstrap.github.io/)
* server using node.js and express.js
* databases using mongodb

## Before Start

make sure you fill up the
* src/config/default.ts `declar the server url and client url`
* src/config/keys.ts `mongodb url , third party login key`
* client/src/config/default.js `declar the server url`

## Quick Start

### Dev Mode
if you want to run at development mode, clone the repositorie and run

```
npm install
npm run dev
```

it will start the server and client concurrently

### Production Mode
if you want to run at production mode, clone the repositorie and run 

```
npm install
npm run production
```
it will build the client react app into /client/build and build the server use `tsc` and run at **production mode**

## What it look like?

* Login Page

![](https://i.imgur.com/qJvyApa.png)

* Register Page

![](https://i.imgur.com/CljB8ei.png)

* Home Page

![](https://i.imgur.com/UfzCpa0.png)

* Document Page

![](https://i.imgur.com/vUkmFen.png)

## notice
the diffrent between development mode and production mode is useing the process.env.NODE_ENV, in this project ,see the package.json (in project folder) you will see below

``` json
"scripts": {
    "start": "NODE_ENV=production node dist/index.js",
    "server": "node dist/index.js",
    "client": "npm start --prefix client",
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "tsc",
    "production": "npm run build --prefix client && npm run build && NODE_ENV=production node dist/index.js",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },
```

see the production session,you will see by using the **NODE_ENV=produciotn** cang change the mode of procees.env.NODE_ENV

and in src/config/default.ts and client/src/config/default.js you will see below

**src/config/default.ts :**
```javascript
const mode = process.env.NODE_ENV || 'development'
let serverUrl, clientUrl
if (mode == 'development') {
   serverUrl = "http://localhost:5000"
   clientUrl = "http://localhost:3000"
} else if (mode == "production") {
   serverUrl = "http://localhost:5000"
   clientUrl = "http://localhost:5000"
}

type config = {
   mode: string,
   serverUrl: string,
   clientUrl: string
}

const config: config = {
   mode: mode,
   serverUrl: serverUrl,
   clientUrl: clientUrl
}


export default config

```

**client/src/config/default.js :**
```javascript
const mode = process.env.NODE_ENV
let serverUrl
if (mode == 'development') {
   serverUrl = "http://localhost:5000"
} else if (mode == "production") {
   serverUrl = window.location.origin
}
const config = {
   mode: mode,
   serverUrl: serverUrl,
}


export default config
```

i use this to config script to check the program is run on which mode,so if you want to know which node in **server**,check out the **src/config/default.ts**, if you want to check mode in client , check **client/src/config/default.js**.

### example:
in ./index.ts,I import the config form server config

```javascript
import config from './config/default';
```

and use this config to check is mode in production or not,
and decide is need to send the client build index.html to client.


``` javascript
if (config.mode == 'production') {
  app.use(express.static('client/build'))
  app.get('/*', function (req, res) {
    if (isMongodbConnected) {
      res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    } else {
      res.send("資料庫連線錯誤")
    }
  })
}
```


## Deployment
if you want to deploy to the cloud , here i give a solution:

* first install **[gcloud](https://cloud.google.com/sdk/?hl=zh-tw&utm_source=google&utm_medium=cpc&utm_campaign=japac-TW-all-en-dr-skws-all-all-trial-e-dr-1008074&utm_content=text-ad-none-none-DEV_c-CRE_195738242820-ADGP_Hybrid+%7C+AW+SEM+%7C+SKWS+~+T1+%7C+EXA+%7C+General+%7C+M:1+%7C+TW+%7C+en+%7C+Cloud+SDK-KWID_43700024743266674-kwd-353705488996&userloc_9040321&utm_term=KW_gcloud%20sdk&gclid=Cj0KCQiApt_xBRDxARIsAAMUMu-Z9tyrhaFjHUvuJVicJtPJ1U2LWbWy345FFRWoH1ejbh_kZK0rJdAaAgVUEALw_wcB)**
* in the project folder run`gcloud init` and choose your googlde cloud app engin
* and run gcloud deploy

### for more deployment detail see this [document]('https://hackmd.io/vIgqUIBAQA-MeDwsy1eEDw')