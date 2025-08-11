# 🛍️ E-Commerce Website (MERN Stack)

[![Made with MERN](https://img.shields.io/badge/Made%20with-MERN-green?style=for-the-badge)](https://www.mongodb.com/mern-stack)
[![React](https://img.shields.io/badge/Frontend-React.js-blue?style=for-the-badge&logo=react)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/Styled%20With-TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

An **E-Commerce Website** built using the **MERN stack**  
**(MongoDB 🗄 + Express.js ⚙ + React.js ⚛ + Node.js 🌐)** with a **modern UI** powered by **Tailwind CSS 🎨**.

---

## 📖 Overview

This project showcases **full-stack development skills**, including user authentication, product management, cart features, and order handling with secure backend APIs. It is designed to be **mobile-responsive** and optimized for a smooth **shopping experience**.

---

## 🚀 Features

### 🔑 Role-Based Access Control (RBAC)

| Role  | Use Case | Description |
|-------|----------|-------------|
| **User** | Shop and manage account | Can view all products, search, filter, and view product details. Can create and manage their profile, add products to cart, save items to wishlist, and add their location for delivery. |
| **Admin** | Full product and order management | Can create, read, update, and delete products, manage inventory, and view all orders. Also has access to sales analytics, including monthly product sales, revenue breakdown by region, and top-selling products. Can export all data to Excel for reporting. *(Currently basic data — real-time analytics coming soon!)* |
                                                                                     |

### 🎨 Frontend (React.js + Tailwind CSS)

- 📱 **Responsive UI** for all devices
- 🔍 **Product Search, Filtering, and Sorting**
- 📄 **Detailed Product Pages** with images, price, and description
- 🛒 **Cart Management** – Add, Remove, Update quantity
- 🔐 **User Authentication** – Sign Up / Login / Logout (JWT)
- 💳 **Order Checkout** with payment integration
- 👤 **User Profile** with past order history

### ⚙ Backend (Node.js + Express.js)

- 🌐 **REST API** with JWT authentication
- ✏️ **CRUD** for products, orders, and users
- 🔒 Secure password hashing with **bcrypt**
- 🛡 **Middleware** for authentication & error handling

### 🗄 Database (MongoDB + Mongoose)

- 📦 **Products Collection**: Images, stock, category, and price
- 📜 **Orders Collection**: User info, payment status, shipping details
- 👥 **Users Collection**: Roles (Admin/Customer) and profile

---

## 🛠 Tech Stack

**Frontend:** ⚛ React.js • 🎨 Tailwind CSS • 🌍 Axios • 🛤 React Router DOM  
**Backend:** 🌐 Node.js • ⚙ Express.js • 🔑 JWT • 🔒 Bcrypt.js • 🖼 Multer  
**Database:** 🗄 MongoDB • 📦 Mongoose

---

## 📸 Screenshots

| 🏠 Home Page                  | 📄 Product Page                     | 🛒 Cart Page                  |
| ----------------------------- | ----------------------------------- | ----------------------------- |
| ![Home](screenshots/home.png) | ![Product](screenshots/product.png) | ![Cart](screenshots/cart.png) |

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

git clone https://github.com/ravitharun/ECommerce-web.git

### 2️⃣ Install Backend Dependencies

cd backend
<br>
npm install

### 3️⃣ Install Frontend Dependencies

cd client
<br>
npm install

### 4️⃣ Start the Development Servers

**Backend**
<br>
cd backend
<br>
npx nodemon

**Frontend**
<br>
cd client
<br>
npm run dev

---

## 🔗 API Endpoints

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| GET    | `/api/products`     | Fetch all products  |
| GET    | `/api/products/:id` | Fetch product by ID |
| POST   | `/api/users/login`  | Login user          |
| POST   | `/api/users`        | Register new user   |
| POST   | `/api/orders`       | Create new order    |

---

## 👤 Author

**Ravi Tharun**  
📧 Email: [tharunravi672@gmail.com](mailto:tharunravi672@gmail.com?subject=Hello%20Ravi&body=I%20am%20interested%20in%20your%20project.)  
📍 Location: Bangalore, India  
🔗 [GitHub](https://github.com/ravitharun) • [LinkedIn](https://www.linkedin.com/in/ravitharun07/)

---
