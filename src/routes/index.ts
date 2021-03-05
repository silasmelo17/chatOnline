
import * as express from 'express';

const route = express.Router()


route.get('/', (req, res) => {
  return res.render('index.html')
})


export default route
