import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { genPassword } from "../genPassword.js";
import { clinet } from "../index.js";
import { get_all_userid } from "../helper/get_all_userid.js";

dotenv.config();

var sender = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.mail,
    pass: process.env.pass,
  },
});

const router = express.Router();
router.get("/", async function (request, response) {
  const users = await get_all_userid();
  response.send(users);
});

router.put("/:id", async function (request, response) {
  console.log("helll");
  const user = request.body;
  const a = user.username;
  const b = user.password;
  const hashpassword = await genPassword(b);
  const result = await clinet
    .db("ag")
    .collection("users")
    .updateOne({ username: a }, { $set: { password: hashpassword } });
  response.send(result);
});

router.post("/signup", async function (request, response) {
  const { username, password } = request.body;
  const hashpassword = await genPassword(password);
  const newUser = {
    username: username,
    password: hashpassword,
  };
  const result = await clinet.db("ag").collection("users").insertOne(newUser);
  response.send(result);
});
router.post("/login", async function (request, response) {
  const { username, password } = request.body;
  const userFromDB = await clinet
    .db("ag")
    .collection("users")
    .findOne({ username: username });
  console.log(userFromDB);
  if (!userFromDB) {
    response.status(401).send({ message: "Invalid credentials" });
    return;
  }
  const storePassword = userFromDB.password;
  const isPasswordMatch = await bcrypt.compare(password, storePassword);

  if (isPasswordMatch) {
    const token = jwt.sign({ id: userFromDB._id }, process.env.token_key);
    response.send({ message: "Successfull login", token: token });
  } else {
    response.status(401).send({ message: "Invalid credentials" });
  }
});

router.post("/forget", async (request, response) => {
  const { username } = request.body;
  const code = 7777;
  const user = await clinet
    .db("ag")
    .collection("users")
    .findOne({ username: username });
  if (user) {
    var composemail = {
      from: process.env.mail,
      to: username,
      subject: "Otp from Capstone",
      text: `code : ${code}`,
    };
    sender.sendMail(composemail, function (error, info) {
      if (error) {
        console.log(error);
        response
          .status(401)
          .send({ msg: "server busy please try again later..." });
      } else {
        response.send({ msg: "check your gmail...", code: code });
      }
    });
  } else {
    console.log(username);
    response.status(401).send({ msg: "This gmail does not exist...!" });
  }
});

export const userRouter = router;
