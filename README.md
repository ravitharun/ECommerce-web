# 🛍️ E-Commerce Website (MERN Stack)

[![Made with MERN](https://img.shields.io/badge/Made%20with-MERN-green?style=for-the-badge)](https://www.mongodb.com/mern-stack)
[![React](https://img.shields.io/badge/Frontend-React.js-blue?style=for-the-badge&logo=react)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/Styled%20With-TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

An **E-Commerce Website** built using the **MERN stack**  
**(MongoDB 🗄 + Express.js ⚙ + React.js ⚛ + Node.js 🌐)** with a **modern UI** powered by **Tailwind CSS 🎨**.

---

## 📖 Overview of the project 

<p>
  This project showcases <b>MERN development skills</b>, including <b>user authentication</b>, <b>product management</b>, <b>cart functionality</b>, and <b>order handling</b> with secure backend APIs. It is fully <b>mobile-responsive</b> and optimized to deliver a smooth <b>shopping experience</b>.
</p>

<p>
  In addition, the project implements an <span style="color:red; font-weight:bold;">Auto Fetch Location</span> feature that automatically detects the user’s current location. Users can save up to <b>two locations</b> in the database (shown on the website) and can <b>edit</b> or <b>delete</b> those locations, enabling full <b>CRUD operations</b>.
</p>

<p>
  The application also integrates an <span style="color:red; font-weight:bold;">Email Notification System</span> that sends automated emails to users during important actions such as <b>account creation</b> and <b>password updates</b>, improving communication and enhancing the overall user experience.
</p>



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
-📍 **User Location** – Users can add and manage their location for accurate delivery information.
- 👤 **User Profile** with past order history

### ⚙ Backend (Node.js + Express.js)

- 🌐 **REST API** with JWT authentication and PaymentIntegration
- ✏️ **CRUD** for products, orders,UserLocation and users 
- 🔒 Secure password hashing with **bcrypt**
- 🛡 **Middleware** for authentication & error handling
- ✉  **Email Integration** for sending automated notifications during account creation and password changes.

### 🗄 Database (MongoDB + Mongoose)

- 📦 **Products Collection**: Images, stock, category, and price
- 📜 **Orders Collection**: User info, payment status, shipping details
- 👥 **Users Collection**: Roles (Admin/Customer) and profile

---
## ⏳ Upcoming Features

- 📊 **Real-Time Sales Analytics (Admin Only)** – Live dashboard showing sales per product, per region, and revenue growth.
- 💳 **Multiple Payment Gateways** – More payment options for global users *(Razorpay currently in test mode)*.
- 🔔 **Push Notifications** – Instant alerts and email updates for orders, special offers, and important account activity.
- 🎟 **Coupons & Discount Codes** – Create and apply promo codes at checkout.
- 📄 **Invoice Generation (PDF)** – Downloadable receipts for every order.
- 📦 **Inventory Management (Admin Only)** – Real-time stock updates and low-stock alerts.
- 🛡 **Two-Factor Authentication (2FA)** – Secure login with an OTP sent to email or phone for extra protection.

## 🛠 Tech Stack
**Frontend:** ⚛ React.js • 🎨 Tailwind CSS • 🌍 Axios • 🛤 React Router DOM  
**Backend:** 🌐 Node.js • ⚙ Express.js • 🔑 JWT • 🔒 Bcrypt.js 
**Database:** 🗄 MongoDB • 📦 Mongoose

---

## 📸 Screenshots

| 🏠 Home Page                                                                                                                            | 📄 Product Page                                                                                                                            | 🛒 Cart Page                                                                                                                            | 🔍 Product Search Dropdown                                                                                                                            | ❌ Signup Error Image                                                                                     | ✅ Success New Account Image                                                                                      | 👤 User Profile Image                                                                                      | 🔑 Password Update Image                                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| <img width="1354" height="698" alt="Home Page" src="https://github.com/user-attachments/assets/af5ff835-bf5f-461d-b3f8-a477773bbc2f" /> | <img width="1366" height="645" alt="Product Page" src="https://github.com/user-attachments/assets/c6fcfc68-7ed4-44a6-8e53-4390b81a1ab6" /> | <img width="1348" height="642" alt="Cart Page" src="https://github.com/user-attachments/assets/c8072e31-c134-477e-aa06-c168fb938ddc" /> | <img width="1366" height="768" alt="Product Search Dropdown" src="https://github.com/user-attachments/assets/3af43d09-11ab-4619-92cd-dc1dcf4fcde2" /> | <img width="1366" height="715" alt="Signup Error Image" src="https://github.com/user-attachments/assets/078e618d-3e9c-49de-b750-17a4dbdba18d" /> | <img width="1362" height="683" alt="image" src="https://github.com/user-attachments/assets/150f3109-46a5-4a04-a4ab-a536265a8ef8" />| <img width="1366" height="647" alt="User Profile Image" src="https://github.com/user-attachments/assets/6ae19187-0a08-4f52-9e29-9a81e033e3a9" /> | <img width="1366" height="681" alt="image" src="https://github.com/user-attachments/assets/5c860523-660e-4cb3-b558-6632192e2d23" />|







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
