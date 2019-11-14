'use strict';

const bcrypt = require('bcrypt');

module.exports.encrypt = (pass) => {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(pass, salt);
  return { hash: hash, salt: salt };
}

module.exports.compare = function compare(userPass, storedPass) {
  let isSuccess = bcrypt.compareSync(userPass, storedPass);
  return isSuccess;
};
