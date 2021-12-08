const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const userControllers = require("../controllers/userControllers");

router.get("/", userControllers.getUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email")
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  userControllers.signUp
);

router.post("/login", userControllers.login);

module.exports = router;
