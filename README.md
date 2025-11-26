# 🚀 BNCC Feedback System (Full Stack)

A lightweight, full-stack web application designed to collect and manage user feedback efficiently. This project utilizes a **RESTful API** architecture with a **Node.js/Express** backend and a responsive **HTML/CSS/JS** frontend.

## 📖 About The Project

This application serves two main purposes:
1.  **For Users:** A simple interface to submit feedback or reports.
2.  **For Admins:** A dedicated dashboard to view and manage incoming feedback in real-time.

The project demonstrates the connection between a vanilla JavaScript frontend and a Node.js server using asynchronous fetch requests.

## ✨ Features

* **User Submission:** Clean interface for users to send feedback data.
* **Admin Dashboard:** Restricted view to fetch and display all submitted feedback.
* **RESTful API:** Backend built with Express.js handling HTTP requests (GET, POST, etc.).
* **Responsive Design:** Styled with custom CSS for desktop and mobile viewing.
* **Separation of Concerns:** Clear directory structure separating Client-side and Server-side logic.

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, Vanilla JavaScript.
* **Backend:** Node.js, Express.js.
* **Tools:** npm (Node Package Manager).

## 📂 Project Structure

```text
my-project/
│
├── backend/                # Server-side Code
│   ├── node_modules/       # Installed dependencies
│   ├── package.json        # Project configuration & dependencies
│   ├── package-lock.json   # Lock file for dependencies
│   └── server.js           # Main server logic & API Endpoints
│
├── frontend/               # Client-side Code
│   ├── css/
│   │   └── style.css       # Global styling
│   ├── js/
│   │   ├── feedback.js     # Logic for the submission form
│   │   └── admin.js        # Logic for fetching/displaying data
│   ├── index.html          # User Submission Page
│   └── admin.html          # Admin Dashboard Panel
│
└── README.md               # Documentation
```
## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:
* **Git** (to clone the repository)
* **Node.js** (which includes npm) - [Download here](https://nodejs.org/)

### Installation

1.  **Clone the repository**
    Open your terminal and run:
    ```bash
    git clone [https://github.com/your-username/bncc-feedback-system.git](https://github.com/your-username/bncc-feedback-system.git)
    ```

2.  **Navigate to the project directory**
    ```bash
    cd bncc-feedback-system
    ```

### ⚙️ Backend Setup

The backend needs to be running first to handle requests.

1.  **Go to the backend folder**
    ```bash
    cd backend
    ```

2.  **Install dependencies**
    This will install the required packages (like `express`, `cors`, `body-parser`) listed in `package.json`.
    ```bash
    npm install
    ```

3.  **Start the Server**
    ```bash
    node server.js
    ```


