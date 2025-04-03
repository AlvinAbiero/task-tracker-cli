import fs from "fs";
import path from "path";
import { Task } from "../models/task";

// File path for tasks storage
const tasksFilePath = path.join(process.cwd(), "tasks.json");

// Function to read tasks from file
export function readTasks(): Task[] {
  try {
    // create file if it doesnt exist
    if (!fs.existsSync(tasksFilePath)) {
      fs.writeFileSync(tasksFilePath, JSON.stringify([]));
      return [];
    }

    // read tasks from file
    const data = fs.readFileSync(tasksFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading tasks:", error);
    return [];
  }
}

// Function to write tasks to file
export function writeTasks(tasks: Task[]): boolean {
  try {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing tasks:", error);
    return false;
  }
}

// Function to get next task ID
export function getNextId(tasks: Task[]): number {
  if (tasks.length === 0) {
    return 1;
  }
  const maxId = Math.max(...tasks.map((task) => task.id));
  return maxId + 1;
}
