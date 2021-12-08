const { validationResult } = require("express-validator");
const { v4 } = require("uuid");

const HttpError = require("../models/http-error");
const DUMMY_USERS = [
  {
    id: "u1",
    name: "jitendra",
    email: "test@test.com",
    password: "singh",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
};

const signUp = (req, res, next) => {
  console.log("signup userControllers");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 400);
  }
  const { name, email, password } = req.body;
  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("Could not create user, email already exists.", 400);
  }
  const createdUser = {
    id: v4(),
    name, // name: name
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  res.json("Successfully login");
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;
