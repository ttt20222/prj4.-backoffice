import express from "express";
import { SERVER_PORT } from "./constants/env.constant.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(SERVER_PORT, () => {
    console.log(SERVER_PORT, '포트로 서버가 열렸어요!');
  });