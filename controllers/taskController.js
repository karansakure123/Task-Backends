const Task = require('../model/task');
const authMiddleware = require('../middlewares/authMiddleware');  // If it's a default export
const { default: mongoose } = require('mongoose');
 const fs = require("fs");
 

 exports.createTask = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { title, description, category, deadline, status } = req.body || {};
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Handle image file if uploaded

    if (!title || !description || !category || !deadline || !status) {
      return res.status(400).json({ message: "All fields (title, description, category, deadline, status) are required." });
    }

    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate.getTime())) {
      return res.status(400).json({ message: "Invalid deadline date format." });
    }

    const taskData = {
      title,
      description,
      category,
      deadline: deadlineDate,
      status,
      imageUrl, // Include image URL if uploaded
    };

    const task = new Task(taskData);
    console.log("Task Data before saving:", taskData);
    const savedTask = await task.save();
    console.log("Saved Task ID:", savedTask._id);

    res.status(201).json({
      message: "Task created successfully",
      task: savedTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({
      message: "An error occurred while creating the task.",
      error: error.message,
    });
  }
};


 
exports.getTasks = async (req, res) => {
  try {
    // Fetch all tasks (remove userId filter as no authentication is used)
    const tasks = await Task.find();

    // If no tasks are found
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tasks found.",
      });
    }

    // Return the tasks
    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully.",
      data: tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error); // Log the error
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks.",
    });
  }
};

// Get Task by ID
exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id; // Assuming the ID is passed as a URL parameter

    // Validate the ID
    if (!mongoose.isValidObjectId(taskId)) {
      return res.status(400).json({ message: "Invalid task ID format" });
    }

    // Query the task
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ task });
  } catch (error) {
    console.error("Error fetching task:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid task ID format" });
    }
    res.status(500).json({
      message: "An error occurred while fetching the task",
      error: error.message,
    });
  }
};

 
// Update task by ID
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    console.log('Update request body:', req.body); // Debug: Log incoming data
    if (req.file) {
      updates.imageUrl = `/uploads/${req.file.filename}`; // Add imageUrl if file uploaded
      console.log('File uploaded:', updates.imageUrl); // Debug
    }

    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedTask) {
      console.log('Task not found for ID:', id); // Debug
      return res.status(404).json({ message: 'Task not found' });
    }

    console.log('Updated task:', updatedTask); // Debug
    res.status(200).json({ task: updatedTask }); // Match frontend expected format
  } catch (error) {
    console.error('Error updating task:', error.message); // Debug
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found or unauthorized.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete task.",
    });
  }
};
