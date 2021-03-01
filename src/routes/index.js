
const express = require('express')
const route = express.Router()


route.get('/', ( _, response ) => {
  response.render('index.html')
})


module.exports = route
