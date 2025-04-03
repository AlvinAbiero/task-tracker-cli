#!/usr/bin/env node

import { TaskService } from "./services/taskService";
import { TaskStatus } from "./models/task";

// Get command line arguments
const args = process.argv.slice(2);
const command = args[0];

// Helper function to display tasks
function displayTasks(tasks: any[]) {
  if (tasks.length === 0) {
    console.log("No tasks found");
    return;
  }

  console.log("\nID | Description | Status | Created At | Updated At");
  console.log("-".repeat(80));

  tasks.forEach((task) => {
    const createdDate = new Date(task.createdAt).toLocaleString();
    const updatedDate = new Date(task.updatedAt).toLocaleString();
    console.log(
      `${task.id} | ${task.description} | ${task.status} | ${createdDate} | ${updatedDate}`
    );
  });
}

// Process commands
async function processCommand() {
  try {
    switch (command) {
      case "add":
        if (!args[1]) {
          console.error("Error: Task description is required");
          process.exit(1);
        }

        const addResult = TaskService.addTask(args[1]);

        if (addResult.success) {
          console.log(`Task added successfully (ID: ${addResult.id})`);
        } else {
          console.error(`Failed to add task: ${addResult.message}`);
        }
        break;

      case "update":
        if (!args[1] || !args[2]) {
          console.error("Error: Task ID and description are required");
          process.exit(1);
        }

        const taskId = parseInt(args[1], 10);

        if (isNaN(taskId)) {
          console.error("Error: Task ID must be a number");
          process.exit(1);
        }

        const updateResult = TaskService.updateTask(taskId, args[2]);

        if (updateResult.success) {
          console.log(`Task ${taskId} updated successfully`);
        } else {
          console.error(`Failed to update task: ${updateResult.message}`);
        }
        break;

      case "delete":
        if (!args[1]) {
          console.error("Error: Task ID is required");
          process.exit(1);
        }

        const deleteId = parseInt(args[1], 10);

        if (isNaN(deleteId)) {
          console.error("Error: Task ID must be a number");
          process.exit(1);
        }

        const deleteResult = TaskService.deleteTask(deleteId);

        if (deleteResult.success) {
          console.log(`Task ${deleteId} deleted successfully`);
        } else {
          console.error(`Failed to delete task: ${deleteResult.message}`);
        }
        break;
    }
  } catch (error) {}
}
