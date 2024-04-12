import { Router } from "express";
import { sendMail } from "../controller/mailControler.js";

const router=Router()

router.route("/sendMail").get(sendMail)

export default router