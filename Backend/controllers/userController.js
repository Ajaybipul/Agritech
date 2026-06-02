const User = require('../db/User/UserSchema');

exports.userLogin = (req, resp) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          return resp.json({ Status: "Success", user: { id: user.id, name: user.name, email: user.email } });
        } else {
          resp.json("login fail");
        }
      } else {
        resp.json("no user");
      }
    });
};

exports.userSignup = (req, resp) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email })
    .then(use => {
      if (use) {
        resp.json("Already have an account");
      } else {
        User.create({ email: email, name: name, password: password })
          .then(result => resp.json("Account Created"))
          .catch(err => resp.json(err));
      }
    }).catch(err => resp.json("failed"));
};

exports.getAllUsers = (req, res) => {
  User.find()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

exports.getUserById = (req, res) => {
  const id = req.params.id;
  User.findById({ _id: id })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  User.findByIdAndUpdate(id, { name, email, password }, { new: true })
    .then(updatedUser => {
      res.json(updatedUser);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
};

exports.deleteUser = (req, res) => {
  let id = req.params.id;
  User.deleteOne({ _id: id })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};