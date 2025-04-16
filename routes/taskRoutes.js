const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadsMiddleware");

 
router.post(
  "/create",
  authMiddleware, 
  upload.single("image"), 
  taskController.createTask 
);

 router.get("/get", taskController.getTasks);

 router.get("/get/:id", taskController.getTaskById);

 router.put("/update/:id",  taskController.updateTask);

 router.delete("/delete/:id", authMiddleware, taskController.deleteTask);

module.exports = router;