# Hardware Store Management System

Student Name: K.M.G.H Dilshan
University Index Number: FC221016

A full-stack e-commerce application for managing a hardware store, featuring a modern React frontend and a robust Spring Boot backend.

## CRUD Operations

The system provides full CRUD (Create, Read, Update, Delete) functionality for product management via the **Admin Dashboard**:

-   **Create**: Add new products to the inventory with details like name, price, category, stock, and an image upload.
-   **Read**: 
    -   **Admin**: View a complete table of products with stock statuses.
    -   **User**: Browse products in a high-quality gallery with filtering and search capabilities.
-   **Update**: Edit existing product information (prices, stock, descriptions) directly from the admin table.
-   **Delete**: Remove products from the catalog with a confirmation prompt.

## Prerequisites

Before running the project, ensure you have the following installed:
-   **Java 17** or higher
-   **Node.js** (v18+) and **npm**
-   **MySQL Server** (v8.0+)
-   **Maven** (optional, uses the included wrapper)

## Setup & Running Instructions

### 1. Database Setup
1.  Open your MySQL terminal or GUI (like Workbench).
2.  Create the database:
    ```sql
    CREATE DATABASE hardware_store_db;
    ```

### 2. Backend Configuration
1.  Navigate to `backend/src/main/resources/application.properties`.
2.  Update your MySQL credentials:
    ```properties
    spring.datasource.username=root
    spring.datasource.password=your_password
    ```

### 3. Running the Backend
1.  Open a terminal in the `/backend` directory.
2.  **On Windows**:
    ```powershell
    .\mvnw.cmd spring-boot:run
    ```
3.  **On macOS/Linux**:
    ```bash
    ./mvnw spring-boot:run
    ```
4.  The backend starts on `http://localhost:8080`.

### 4. Running the Frontend
1.  Open a new terminal in the `/frontend` directory.
2.  **Install dependencies**: `npm install`
3.  **Start development server**: `npm run dev`
4.  Access the UI at `http://localhost:5173`.

## Authentication
-   **Admin**: `admin` / `admin123`
-   **User**: Register a new account or use an existing one to test shopping features.
