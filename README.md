# Task Tracker CLI

A simple command line interface (CLI) application to track and manage your tasks. This project is built with TypeScript and Node.js.

This project is based on the [Task Tracker project challenge](https://roadmap.sh/projects/task-tracker) from roadmap.sh.

## Features

- Add, update, and delete tasks
- Mark tasks as in progress or done
- List all tasks
- List tasks by status (todo, in-progress, done)
- Persistent storage using a local JSON file

## Installation

### Local Development

1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   ```
3. Build the project
   ```bash
   npm run build
   ```
4. Link the CLI for local use
   ```bash
   npm link
   ```

## Usage

After installation, you can use the Task Tracker CLI with the following commands:

### Adding a new task

```bash
task-cli add "Buy groceries"
# Output: Task added successfully (ID: 1)
```

### Updating a task

```bash
task-cli update 1 "Buy groceries and cook dinner"
# Output: Task 1 updated successfully
```

### Deleting a task

```bash
task-cli delete 1
# Output: Task 1 deleted successfully
```

### Marking a task as in progress or done

```bash
task-cli mark-in-progress 1
# Output: Task 1 marked as in-progress

task-cli mark-done 1
# Output: Task 1 marked as done
```

### Listing all tasks

```bash
task-cli list
# Output: All Tasks:
# ID | Description | Status | Created At | Updated At
# ---------------------------------------------------------
# 1 | Buy groceries | todo | 4/3/2025, 12:30:45 PM | 4/3/2025, 12:30:45 PM
```

### Listing tasks by status

```bash
task-cli list todo
# Output: Tasks To Do:
# [list of todo tasks]

task-cli list in-progress
# Output: Tasks In Progress:
# [list of in-progress tasks]

task-cli list done
# Output: Tasks Done:
# [list of done tasks]
```

## Data Storage

Tasks are stored in a `tasks.json` file in the current directory. The file is created automatically if it doesn't exist.

Each task has the following properties:
- `id`: A unique identifier for the task
- `description`: A short description of the task
- `status`: The status of the task (`todo`, `in-progress`, `done`)
- `createdAt`: The date and time when the task was created
- `updatedAt`: The date and time when the task was last updated