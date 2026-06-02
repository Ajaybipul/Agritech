const Admin = require('../db/Admin/AdminSchema');

exports.adminLogin = (req, resp) => {
  const { email, password } = req.body;
  Admin.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          return resp.json({ Status: "Success", user: { id: user.id, name: user.name, email: user.email } });
        } else {
          resp.json("incorrect password");
        }
      } else {
        resp.json("no user");
      }
    });
};

exports.adminSignup = (req, resp) => {
  const { name, email, password } = req.body;
  Admin.findOne({ email: email })
    .then(use => {
      if (use) {
        resp.json("Already have an account");
      } else {
        Admin.create({ email: email, name: name, password: password })
          .then(result => resp.json("Account Created"))
          .catch(err => resp.json(err));
      }
    }).catch(err => resp.json("failed"));
};