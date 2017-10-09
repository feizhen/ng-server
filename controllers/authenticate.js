const express = require('express');
const router = express.Router();
const authService = require('../services/authenticate');
const _ = require('lodash');

// routes
// /api/auth/login
router.post('/login', authenticate);

module.exports = router;

// middleware
function authenticate (req, res) {
  const username = req && req.body.username;
  const password = req && req.body.password;
  authService.authenticate({
    username: username,
    password: password
  })
    .then(userInfo => {
      if (_.isObject(userInfo)) {
        res.send(userInfo);
      } else if (_.isString(userInfo)){
        if (userInfo === '用户名不存在') {
          res.sendStatus(404).send(userInfo);
        } else if (userInfo === '密码错误') {
          res.sendStatus(401).send(userInfo);
        } else {
          res.sendStatus(400);
        }
      }
    })
    .catch(errMsg => {
      res.send(errMsg);
    });
}
