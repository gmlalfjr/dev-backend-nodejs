const Employee = require("../models/EmployeeModel");
const User = require("../models/User");
const statusRes = require("../commonresponse/response");
const upload = require("../multer/storage");
const multer = require("multer");
const JWT = require("jsonwebtoken");

const config = require("config");

exports.getAllEmployee = function(req, res) {
  Employee.find({ userId: req.user.id })
    .then(data => {
      res.json(statusRes.success("Success Get Data User", data));
    })
    .catch(err => {
      res.json(err);
    });
};

exports.addEmployee2 = function(req, res) {
  const { fullName, gender, address, idCard, dateOfBirth, image } = req.body;
  if (
    fullName == "" ||
    gender == "" ||
    address == "" ||
    idCard == "" ||
    dateOfBirth == ""
  ) {
    return res.json(statusRes.error(null, "Cant be Null"));
  }

  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.json(err);
    } else if (err) {
      // An unknown error occurred when uploading.
      res.json(err);
    }
    const data = new Employee({
      fullName: req.body.fullName,
      gender: req.body.gender,
      address: req.body.address,
      idCard: req.body.idCard,
      dateOfBirth: req.body.dateOfBirth,
      userId: req.user.id
    });

    // Everything went fine.
    data
      .save()
      // .then(data => {
      //   res.json(data);
      // })
      .then(data => res.json(statusRes.success("Success Add Emplotyee", data)))
      .catch(err => {
        res.json(err);
      });
  });
};

exports.addEmployee = function(req, res) {
  const {
    firstName,
    lastName,
    status,
    gender,
    address,
    idCard,
    dateOfBirth,
    image
  } = req.body;
  if (
    firstName == "" ||
    lastName == "" ||
    status == "" ||
    gender == "" ||
    address == "" ||
    idCard == "" ||
    dateOfBirth == ""
  ) {
    return res.json(statusRes.error(null, "Cant be Null"));
  }

  const data = new Employee({
    fullName: req.body.fullName,
    gender: req.body.gender,
    address: req.body.address,
    idCard: req.body.idCard,
    dateOfBirth: req.body.dateOfBirth,
    userId: req.user.id
    //image: req.file.filename
  });

  // Everything went fine.
  data
    .save()
    .then(data => res.json(statusRes.success("Success Add Emplotyee", data)))
    .catch(err => {
      res.json(err);
    });
};

exports.findOneEmployee = function(req, res) {
  Employee.findById(req.params.id)
    .then(employee => {
      if (req.user.id == employee.userId) {
        res.json(employee);
      } else {
        res.json(statusRes(403, "noAuth"));
      }
    })
    .catch(e => {
      res.json(e);
    });
};

exports.findOneEdit = function(req, res) {
  Employee.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(data => {
      if (req.user.id == data.userId) {
        Employee.findById(req.params.id)
          .then(employee => {
            if (req.user.id == employee.userId) {
              res.json(employee);
            } else {
              res.json(statusRes.error(403, "noAuth"));
            }
          })
          .catch(e => {
            res.json(e);
          });
      } else {
        res.json(statusRes.error(403, "noAuth"));
        res.save;
      }
    })
    .catch(err => {
      res.json(err);
    });
};

exports.findEdit = function(req, res) {
  Employee.findById({ _id: req.params.id }).then(employee => {
    if (req.user.id == employee.userId) {
      Employee.updateOne({ _id: req.params.id })
        .then(res => {
          res.json("success");
        })
        .catch(err => {
          res.json(err);
        });
    } else {
      res.json(statusRes.error(403, "noAuth"));
    }
  });
};

exports.findDelete = function(req, res) {
  Employee.findById({ _id: req.params.id }).then(employee => {
    if (req.user.id == employee.userId) {
      Employee.remove({ _id: req.params.id })
        .then(res => {
          res.json("success");
        })
        .catch(err => {
          res.json(err);
        });
    } else {
      res.json(statusRes.error(403, "noAuth"));
    }
  });
};
