
# 📝 Ziptrick Todo Application

A full-stack **Todo Application** built with **React** and **Node.js/Express** as part of the Ziptrick developer assignment. The application features a clean multi-page architecture, full CRUD operations, and a polished, production-grade UI.

---
## 🚀 Project Overview

Ziptrick Todo Application is a full-stack task management system that allows users to create, update, delete, and track tasks efficiently. It follows a clean REST API architecture with a React frontend and Node.js backend, deployed on Vercel and Render for production use.

## ✨ Features

- **Create Todos** — Add new tasks with title, optional description, and priority level (Low / Medium / High)
- **View Todos** — Browse all todos in a clean, organized list
- **Update Todos** — Inline editing on the detail page for any field
- **Delete Todos** — Remove todos with a confirmation dialog
- **Toggle Status** — Quickly switch between Pending and Completed with a checkbox
- **Filter by Status** — View All, Pending, or Completed todos using filter buttons
- **Multi-Page Navigation** — Separate pages for the todo list and individual todo details using React Router
- **Responsive Design** — Works seamlessly across desktop, tablet, and mobile screens
- **Error Handling** — Graceful error states with user-friendly messages
- **Loading States** — Visual feedback during API operations

---

## 🛠 Tech Stack

| Layer        | Technology                        |
| ------------ | --------------------------------- |
| **Frontend** | React 18, React Router v6, Axios  |
| **Backend**  | Node.js, Express.js, UUID         |
| **Storage**  | JSON file-based persistence       |
| **Tooling**  | Create React App, Concurrently    |

---

## 🌐 Live Demo

- 🔗 Frontend (Vercel): https://todo-app-ziptrrip.vercel.app  
- 🔗 Backend (Render): https://todo-app-ziptrrip.onrender.com  
- 🔗 API Endpoint: https://todo-app-ziptrrip.onrender.com/api/todos

## 🖼 Application Screenshots

### 🏠 Home Page (Todo List)
![Todo List](./Screenshots/home.png)

### ➕ Add Todo Feature
![Add Todo](./Screenshots/add.png)

### ✏️ Edit Todo Page
![Edit Todo](./Screenshots/edit.png)

### 📱 Responsive Mobile View
![Mobile View](./Screenshots/mobile.png)

## 📋 Prerequisites

- **Node.js** — version 16 or higher
- **npm** — version 8 or higher (comes with Node.js)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd todo-app
```

### 2. Install Dependencies

Install both server and client dependencies with a single command:

```bash
npm run install:all
```

Or install them individually:

```bash
# Server dependencies
cd server && npm install

# Client dependencies
cd client && npm install
```

### 3. Start the Application

**Run both servers concurrently (recommended):**

```bash
npm run dev
```

**Or start them individually in separate terminals:**

```bash
# Terminal 1 — Backend (http://localhost:5000)
npm run start:server

# Terminal 2 — Frontend (http://localhost:3000)
npm run start:client
```

### 4. Open in Browser

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000/api/todos](http://localhost:5000/api/todos)

---

## 📡 API Endpoints

| Method   | Endpoint          | Description              | Request Body                                         | Response            |
| -------- | ----------------- | ------------------------ | ---------------------------------------------------- | ------------------- |
| `GET`    | `/api/todos`      | List all todos           | —                                                    | `Array<Todo>`       |
| `GET`    | `/api/todos?status=pending` | List filtered todos | —                                                 | `Array<Todo>`       |
| `GET`    | `/api/todos/:id`  | Get a single todo        | —                                                    | `Todo`              |
| `POST`   | `/api/todos`      | Create a new todo        | `{ title, description?, priority? }`                 | `Todo`              |
| `PUT`    | `/api/todos/:id`  | Update a todo            | `{ title?, description?, status?, priority? }`       | `Todo`              |
| `DELETE` | `/api/todos/:id`  | Delete a todo            | —                                                    | `204 No Content`    |

### Todo Object Shape

```json
{
  "id": "uuid-string",
  "title": "string",
  "description": "string",
  "status": "pending | completed",
  "priority": "low | medium | high",
  "createdAt": "ISO 8601 timestamp",
  "updatedAt": "ISO 8601 timestamp"
}
```

---

## 📁 Folder Structure

```
todo-app/
├── package.json                  # Root scripts (install:all, dev)
├── README.md                     # Project documentation
│
├── server/                       # Backend (Node.js + Express)
│   ├── package.json
│   ├── .gitignore
│   ├── data/
│   │   └── todos.json            # JSON file-based storage (seed data)
│   └── src/
│       ├── index.js              # Express server entry point
│       ├── routes/
│       │   └── todos.js          # RESTful route definitions
│       ├── controllers/
│       │   └── todosController.js # Business logic for CRUD ops
│       ├── models/
│       │   └── Todo.js           # File-based persistence layer
│       └── middleware/
│           ├── validate.js       # Request validation (POST/PUT)
│           └── errorHandler.js   # Centralized error handler
│
└── client/                       # Frontend (React)
    ├── package.json
    ├── public/
    │   └── index.html            # HTML entry point
    └── src/
        ├── index.js              # React entry point
        ├── App.js                # Routes & layout
        ├── components/
        │   ├── Navbar.js         # Navigation bar
        │   ├── TodoForm.js       # New todo creation form
        │   └── TodoItem.js       # Todo list item component
        ├── pages/
        │   ├── TodoListPage.js   # Main list page (CRUD + filter)
        │   └── TodoDetailPage.js # Single todo detail page
        ├── services/
        │   └── api.js            # Axios API service layer
        └── styles/
            └── App.css           # Global styles & design tokens
```

---

## 📄 Pages

### Todo List Page (`/`)

The main page of the application. Displays the add-todo form at the top, followed by filter buttons and the complete list of todos. Each todo shows its title, status badge, priority badge, and creation date. Clicking a todo navigates to its detail page.

### Todo Detail Page (`/todo?id=<todoId>`)

Shows the full details of a single todo including title, description, status, priority, and timestamps. Supports inline editing — click "Edit" to modify any field, then "Save" to persist changes. Includes a delete button with confirmation and a back link to return to the list.

---

## 📌 Assumptions

- **File-Based Storage** — Todos are persisted in a JSON file on the server. This is suitable for development and demonstration purposes but would be replaced with a database (e.g., MongoDB, PostgreSQL) in production.
- **No Authentication** — The application does not implement user authentication or authorization. All todos are globally accessible.
- **Single User** — The app is designed for single-user use. Concurrent multi-user access to the JSON file is not handled.
- **Default Priority** — If no priority is specified when creating a todo, it defaults to `medium`.
- **Default Status** — New todos are created with a `pending` status.
- **Client-Side Proxy** — The React development server proxies API requests to the backend at `http://localhost:5000`. In production, a reverse proxy (e.g., Nginx) or environment variable would be used.

---

## 📝 License

This project was created as part of the Ziptrick developer assignment.



