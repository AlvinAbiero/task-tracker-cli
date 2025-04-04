"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const task_1 = require("../models/task");
const fileUtils_1 = require("../utils/fileUtils");
class TaskService {
    // Add  a new task
    static addTask(description) {
        try {
            const tasks = (0, fileUtils_1.readTasks)();
            const newId = (0, fileUtils_1.getNextId)(tasks);
            const newTask = {
                id: newId,
                description,
                status: task_1.TaskStatus.TODO,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            tasks.push(newTask);
            const success = (0, fileUtils_1.writeTasks)(tasks);
            if (success) {
                return { success: true, id: newId };
            }
            else {
                return { success: false, message: "Failed to write task to file" };
            }
        }
        catch (error) {
            return { success: false, message: `Error adding task: ${error}` };
        }
    }
    // Update a task
    static updateTask(id, description) {
        try {
            const tasks = (0, fileUtils_1.readTasks)();
            const taskIndex = tasks.findIndex((task) => task.id === id);
            if (taskIndex === -1) {
                return { success: false, message: `Task with ID ${id} not found` };
            }
            tasks[taskIndex] = {
                ...tasks[taskIndex],
                description,
                updatedAt: new Date().toISOString(),
            };
            const success = (0, fileUtils_1.writeTasks)(tasks);
            if (success) {
                return { success: true };
            }
            else {
                return { success: false, message: "Failed to write task to file" };
            }
        }
        catch (error) {
            return { success: false, message: `Error updating task: ${error}` };
        }
    }
    // Delete a task
    static deleteTask(id) {
        try {
            const tasks = (0, fileUtils_1.readTasks)();
            const initialLength = tasks.length;
            const filteredTasks = tasks.filter((task) => task.id !== id);
            if (filteredTasks.length === initialLength) {
                return { success: false, message: `Task with ID ${id} not found` };
            }
            const success = (0, fileUtils_1.writeTasks)(filteredTasks);
            if (success) {
                return { success: true };
            }
            else {
                return { success: false, message: "Failed to write task to file" };
            }
        }
        catch (error) {
            return { success: false, message: `Error deleting task: ${error}` };
        }
    }
    // Mark task status
    static updateTaskStatus(id, status) {
        try {
            const tasks = (0, fileUtils_1.readTasks)();
            const taskIndex = tasks.findIndex((task) => task.id === id);
            if (taskIndex === -1) {
                return { success: false, message: `Task with ID ${id} not found` };
            }
            tasks[taskIndex] = {
                ...tasks[taskIndex],
                status,
                updatedAt: new Date().toISOString(),
            };
            const success = (0, fileUtils_1.writeTasks)(tasks);
            if (success) {
                return { success: true };
            }
            else {
                return { success: false, message: "Failed to write task to file" };
            }
        }
        catch (error) {
            return {
                success: false,
                message: `Error updating task status: ${error}`,
            };
        }
    }
    // List all tasks
    static listTasks(status) {
        try {
            const tasks = (0, fileUtils_1.readTasks)();
            if (status) {
                return tasks.filter((task) => task.status === status);
            }
            return tasks;
        }
        catch (error) {
            console.error(`Error listing tasks: ${error}`);
            return [];
        }
    }
}
exports.TaskService = TaskService;
