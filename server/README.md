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
(If you are on Datagrip creact a new project like this)


Then 


Perfect Now we are going to connect the server to this database

Then go to directory Server with the following commands :
```sh
cd server
```
Install the node dependencies :
```sh
npm i
```
Start the server : 
```sh
npm start
```

### Perfect your server is listening on port 8080 and you Mangodb Database is listening on port 27017.

### Now you can start your client application. 