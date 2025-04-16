# Task-Backends
# Task Manager Application

This is a full-stack Task Manager application with a **React.js** frontend and **Node.js/Express.js** backend. The application allows users to manage tasks, authenticate, and interact with a MongoDB database.

## Project Structure
Task-Manager │ ├── backend │ ├── /controllers │ ├── /models │ ├── /routes │ ├── /middleware │ ├── /config │ ├── server.js │ └── .env │ └── frontend ├── /src │ ├── /components │ ├── /pages │ ├── /assets │ └── App.js ├── /public ├── package.json └── tailwind.config.js

bash
Copy
Edit

## Backend Setup Instructions

### Prerequisites:
- Node.js (v14.x or higher)
- MongoDB (local or cloud instance)
- npm (Node package manager)

### Steps to Run:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/karansakure123/Task-Manager.git
   cd Task-Manager/backend


API Endpoints:
POST /api/login: Login user

POST /api/register: Register user

GET /api/tasks: Get list of tasks

POST /api/tasks: Create a new task

PUT /api/tasks/:id: Update task by ID

DELETE /api/tasks/:id: Delete task by ID

Backend Folder Structure:
/models: Mongoose models (e.g., User, Task).

/routes: API routes.

/controllers: Logic for handling routes.

/middleware: Middleware (e.g., authentication).

/config: Database and other configuration settings.





Frontend Setup Instructions
Prerequisites:
Node.js (v14.x or higher)

npm (Node package manager)

Tailwind CSS

Steps to Run:
Clone the Repository:

bash
Copy
Edit
git clone https://github.com/karansakure123/Task-Manager.git
cd Task-Manager/frontend
Install Dependencies:

Run the following command to install frontend dependencies:

bash
Copy
Edit
npm install
Start the Frontend Application:

Run the following command to start the frontend application:

bash
Copy
Edit
npm start
The frontend will be running on http://localhost:3000.

Frontend Folder Structure:
/src: Contains all the React source code.

/components: Reusable components like Navbar, TaskList, etc.

/pages: React pages like Dashboard, Login, etc.

/assets: Images and icons.

/public: Static files like index.html and favicon.ico.
