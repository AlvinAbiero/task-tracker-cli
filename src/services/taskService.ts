import { Task, TaskStatus } from "../models/task";
import { readTasks, writeTasks, getNextId } from "../utils/fileUtils";

export class TaskService {
  // Add  a new task
  static addTask(description: string): {
    success: boolean;
    id?: number;
    message?: string;
  } {
    try {
      const tasks = readTasks();
      const newId = getNextId(tasks);

      const newTask: Task = {
        id: newId,
        description,
        status: TaskStatus.TODO,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      tasks.push(newTask);
      const success = writeTasks(tasks);

      if (success) {
        return { success: true, id: newId };
      } else {
        return { success: false, message: "Failed to write task to file" };
      }
    } catch (error) {
      return { success: false, message: `Error adding task: ${error}` };
    }
  }

  // Update a task
  static updateTask(
    id: number,
    description: string
  ): { success: boolean; message?: string } {
    try {
      const tasks = readTasks();
      const taskIndex = tasks.findIndex((task) => task.id === id);

      if (taskIndex === -1) {
        return { success: false, message: `Task with ID ${id} not found` };
      }

      tasks[taskIndex] = {
        ...tasks[taskIndex],
        description,
        updatedAt: new Date().toISOString(),
      };

      const success = writeTasks(tasks);

      if (success) {
        return { success: true };
      } else {
        return { success: false, message: "Failed to write task to file" };
      }
    } catch (error) {
      return { success: false, message: `Error updating task: ${error}` };
    }
  }

  // Delete a task
  static deleteTask(id: number): { success: boolean; message?: string } {
    try {
      const tasks = readTasks();
      const initialLength = tasks.length;

      const filteredTasks = tasks.filter((task) => task.id !== id);

      if (filteredTasks.length === initialLength) {
        return { success: false, message: `Task with ID ${id} not found` };
      }

      const success = writeTasks(filteredTasks);

      if (success) {
        return { success: true };
      } else {
        return { success: false, message: "Failed to write task to file" };
      }
    } catch (error) {
      return { success: false, message: `Error deleting task: ${error}` };
    }
  }

  // Mark task status
  static updateTaskStatus(
    id: number,
    status: TaskStatus
  ): { success: boolean; message?: string } {
    try {
      const tasks = readTasks();
      const taskIndex = tasks.findIndex((task) => task.id === id);

      if (taskIndex === -1) {
        return { success: false, message: `Task with ID ${id} not found` };
      }

      tasks[taskIndex] = {
        ...tasks[taskIndex],
        status,
        updatedAt: new Date().toISOString(),
      };

      const success = writeTasks(tasks);

      if (success) {
        return { success: true };
      } else {
        return { success: false, message: "Failed to write task to file" };
      }
    } catch (error) {
      return {
        success: false,
        message: `Error updating task status: ${error}`,
      };
    }
  }

  // List all tasks
  static listTasks(status?: TaskStatus): Task[] {
    try {
      const tasks = readTasks();

      if (status) {
        return tasks.filter((task) => task.status === status);
      }

      return tasks;
    } catch (error) {
      console.error(`Error listing tasks: ${error}`);
      return [];
    }
  }
}
