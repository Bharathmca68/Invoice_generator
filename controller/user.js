require("dotenv").config();
const UserMD = require("../model/userMD");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signin = (req, res) => {
  const { UserName, Password } = req.body;
  UserMD.find({ UserName })
    .exec()
    .then((data) => {
      if (data.length >= 1) {
        return res.status(409).json({
          message: "Mail Already Exist",
        });
      } else {
        bcrypt.hash(Password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const userObj = new UserMD({
              UserName: UserName,
              Password: hash,
            });
            userObj
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "user created successfully",
                  User: result,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  Error: err,
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        Error: err,
      });
    });
};

exports.login = async (req, res) => {
  const { UserName, Password } = req.body;

  UserMD.find({ UserName })
    .then((data) => {
      if (data.length < 1) {
        return res.status(404).json({
          Message: "Auth failed",
        });
      }
      bcrypt.compare(Password, data[0].Password, (error, response) => {
        if (error) {
          return res.status(404).json({
            message: "Auth Failed",
          });
        }
        if (response) {
          const token = jwt.sign(
            {
              UserName: data[0].UserName,
              UserId: data[0]._id,
            },
            process.env.AccessKey,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth User Logged in Successfull",
            token,
          });
        }
        res.status(401).json({
          message: "Auth Failed",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        Error: err,
      });
    });
};

exports.getUsers = (req, res) => {};
