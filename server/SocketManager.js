const io = require('./app.js').io;
const {VERIFY_USER, USER_CONNECTED, LOGOUT} = require('../client/src/Events');
const {createUser, createMessage, createChat} = require('../client/src/Factories');
let connectedUsers = {}
// function that is called when there is new socket connection
module.exports = function(socket){
    console.log( "Socket Id" + socket.id);


    // all event listeners

    // Verify Username
    socket.on(VERIFY_USER, (nickname, cb) => {
        if (isUser(connectedUsers, nickname)){
            cb({isUser : true, user : null});
        }
        else{
            cb({isUser : false, user : createUser({name : nickname})});
        }
    })

    // User connects with username
    socket.on(USER_CONNECTED, (user) => {
        connectedUsers = addUser(connectedUsers, user);
        socket.user = user;
        socket.emit(USER_CONNECTED, connectedUsers);
        console.log(connectedUsers);
    })
    // user disconnects

    // user logs out


    // adds user
    function addUser(userList, user){
        let newList = Object.assign({}, userList);
        newList[user.name] = user;
        return newList;
    }

    // remove user
    function removeUser(userList, user){
        let newList = Object.assign({}, userList);
        delete newList[user];
        return newList;
    }

    // checks if user in list is passed in 
    function isUser(userList, username){
        return username in userList;
    }
}