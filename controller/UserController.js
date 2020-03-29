const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const Item = require("../models").Item;
const config = require("config");
const statusRes = require("../commonresponse/response");
function getAll(req, res) {
  User.findAll({ include: [Item] }).then(data => {
    res.json(data);
  });
}

function findById(req, res) {
  User.findById(req.user.id)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
}

function findOneByid(req, res) {
  User.findById(req.params.id)
    .then(data => {
      res.json(data);
    })
    .catch(e => {
      res.json(e);
    });
}

//RegisterUser
function registerUser(req, res) {
  try {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) return res.status(400).json({ msg: "user already exist" });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) return res.json(statusRes.success(400, "somethin error"));
          req.body.password = hash;
          User.create(req.body)
            .then(data => {
              res.json(data);
            })
            .catch(err => {
              return err;
            });
        });
      });
    });
  } catch (e) {
    res.json(e);
  }
}

function loginUser(req, res) {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) return res.status(400).json({ msg: "email did not exist" });

    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "password wrong" });

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: '200m' },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              email: user.email
            }
          });
        }
      );
    });
  });
}

module.exports = { getAll, registerUser, loginUser, findOneByid, findById };
