"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readTasks = readTasks;
exports.writeTasks = writeTasks;
exports.getNextId = getNextId;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// File path for tasks storage
const tasksFilePath = path_1.default.join(process.cwd(), "tasks.json");
// Function to read tasks from file
function readTasks() {
    try {
        // create file if it doesnt exist
        if (!fs_1.default.existsSync(tasksFilePath)) {
            fs_1.default.writeFileSync(tasksFilePath, JSON.stringify([]));
            return [];
        }
        // read tasks from file
        const data = fs_1.default.readFileSync(tasksFilePath, "utf8");
        return JSON.parse(data);
    }
    catch (error) {
        console.error("Error reading tasks:", error);
        return [];
    }
}
// Function to write tasks to file
function writeTasks(tasks) {
    try {
        fs_1.default.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
        return true;
    }
    catch (error) {
        console.error("Error writing tasks:", error);
        return false;
    }
}
// Function to get next task ID
function getNextId(tasks) {
    if (tasks.length === 0) {
        return 1;
    }
    const maxId = Math.max(...tasks.map((task) => task.id));
    return maxId + 1;
}
