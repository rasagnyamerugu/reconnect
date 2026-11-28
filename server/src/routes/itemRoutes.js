import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";
import {
  createItem, getItems, getMyItems, getItem, getMatches, updateItem, deleteItem,
} from "../controllers/itemController.js";

const router = Router();

router.use(protect);

router.get("/", getItems);
router.get("/mine", getMyItems);
router.post("/", upload.array("images", 3), createItem);
router.get("/:id/matches", getMatches);
router.get("/:id", getItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;