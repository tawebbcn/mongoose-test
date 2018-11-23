'use strict'

const mongoose = require('mongoose');

const User = require('./User');

const users = require('./data')

mongoose.connect('mongodb://localhost/mongoose-test', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

const arrayPromises = [];

users.forEach(user => {
  let newUser;
  if (user.role === 'Artist') {
    const { email, password, role, ...artistInfo } = user;
    newUser = {
      email,
      password,
      role,
      artist: artistInfo
    }
  } else if (user.role === 'Host') {
    const { email, password, role, ...hostInfo } = user;
    newUser = {
      email,
      password,
      role,
      host: hostInfo
    }
  } else if (user.role === 'Attendee') {
    const { email, password, role } = user;
    newUser = {
      email,
      password,
      role
    }
  }
  arrayPromises.push(User.create(newUser))
})

Promise.all(arrayPromises)
  .then(users => console.log(users))
  .catch(err => console.error(err))


