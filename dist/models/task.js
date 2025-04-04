"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatus = void 0;
// task status enum
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["TODO"] = "todo";
    TaskStatus["IN_PROGRESS"] = "in-progress";
    TaskStatus["DONE"] = "done";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
