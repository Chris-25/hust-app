import { addMessage, getMessages} from "../controllers/chat.js"
import express from "express";
const router = express.Router();

router.post("/add-msg/", addMessage);
router.post("/get-msg/", getMessages);


export default router;
