# Sneakers_Shop_V2 Server

### You have to start mangodb on your computer. 

### For macOS :  
Dependencies needed : Brew 
```sh
brew tap mongodb/brew
```
```sh
brew install mongodb-community
```
```sh
brew services start mongodb-community
```

Then you have to start a MangoDB project named 
```txt
sneakers_shop_v2
```
## For Datagrip Users continue with this

New Project (Choose a name) -> + -> Data Source -> MangoDB

<img width="1264" alt="Capture d’écran 2023-12-29 à 16 12 16" src="https://github.com/SamyOffer/Sneakers_ShopV2/assets/94078861/35a8365e-212c-464d-8914-fbf42972108a">

## For Non Datagrip Users 

Good Luck :)

---

Okay now we have to say to MangoDB that we would like to use this database that we just created for our applications. 

Run this command to see all the mangodb databases that exist 

**If you are on Datagrip run this command on the terminal of Datagrip**

To See all the Databases 

```sh
show dbs
```
It will looks like this 

<img width="552" alt="Capture d’écran 2023-12-29 à 16 21 36" src="https://github.com/SamyOffer/Sneakers_ShopV2/assets/94078861/c7f58d9b-5852-49e6-b001-8057a285afd9">

Then we have to specify the database that we would like to use 

```sh
use mangoDB_sneakers_shop_V2 // mangoDB_sneakers_shop_V2 for me  
```

Perfect Now we are going to connect the server to this database with **Mangoose**

First go to directory server with the following commands :
```sh
cd server
```
Install the node dependencies :
```sh
npm i
```

In server.js we have these lines : 
```js
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());


mongoose
.connect('mongodb://localhost:27017/mangoDB_sneakers_shop_V2')
.then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => { console.log('Example app listening on port', PORT) });  
})
.catch(err => console.log(err)); 
```

This line is the most important , this is where we make the connection with the database. 

```js
.connect('mongodb://localhost:27017/mangoDB_sneakers_shop_V2')
```` 

In our server we make the link from the client to the database(Mangodb). 

Mangodb is listening on port 27017 with a specifc name of database that i explained before. 

We have the server that is connected to it, but on the other hand the server is accessible from the port 8080. We specified this here : 

```js
...
const PORT = process.env.PORT || 8080;
....
app.listen(PORT, () => { console.log('Example app listening on port', PORT) });  
....
```

Let's understand thoses lines : 
- First one *"const PORT = process.env.PORT || 8080;"* is used to say *"Hello use the port 8080 if it's available , if not use another one"*
- The second line is listening on {PORT} to make it accessible for *fetch* for any clients


## Ok perfect, our server is setup, we can start it with the following line and then start the client.

Start the server : 
```sh
npm start
```
