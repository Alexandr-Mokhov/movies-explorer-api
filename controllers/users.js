const userModel = require('../models/user');
const { OK_STATUS, CREATED_STATUS } = require('../statusCodes');

const getUser = (req, res, next) => {
  const { userId } = req.params;
  userModel.findById(userId)
    .orFail()
    .then((user) => res.status(OK_STATUS).send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { _id } = req.user;
  const { email, name } = req.body;
  userModel.findByIdAndUpdate(_id, { email, name }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(OK_STATUS).send(user))
    .catch(next);
};

module.exports = {
  getUser,
  updateUser,
};
