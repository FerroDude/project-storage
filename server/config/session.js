const connectMongo = require('connect-mongo');

module.exports = {
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : false,
    secure: process.env.NODE_ENV === 'production'
  },
  store: connectMongo.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 60 * 60
  })
};
