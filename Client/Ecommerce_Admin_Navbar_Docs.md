
# 🛒 E-commerce Admin Navbar: Full Documentation & Use Cases

This documentation provides a complete breakdown of the Admin Navbar for an E-commerce website, including route descriptions, use cases, and example code snippets in React + Tailwind CSS.

---

## 🔹 Navbar Items Overview

| Section       | Path                 | Purpose                                 |
|---------------|----------------------|------------------------------------------|
| Dashboard     | `/admin/dashboard`   | Admin overview of sales, orders, users   |
| Products      | `/admin/products`    | Manage product listings                  |
| Orders        | `/admin/orders`      | View and update customer orders          |
| Users         | `/admin/users`       | Manage registered users                  |
| Add Product   | `/admin/add-product` | Upload new products                      |
| Logout        | —                    | Log out the admin                        |

---

## 🧭 AdminNavbar.jsx



## 📦 Use Case Details with Example Components

### 1. Dashboard
**Path:** `/admin/dashboard`

```
<h1 className="text-2xl font-bold">Welcome, Admin</h1>
<p>Today's Orders: 14</p>
<p>Revenue: ₹1,24,500</p>
```

---

### 2. Products
**Path:** `/admin/products`

```
<h2 className="text-xl font-semibold">All Products</h2>
<ProductTable products={productList} />
```

---

### 3. Orders
**Path:** `/admin/orders`

```
<OrderTable orders={orderData} />
```

---

### 4. Users
**Path:** `/admin/users`

```
<UserTable users={allUsers} />
```

---

### 5. Add Product
**Path:** `/admin/add-product`

```
<form className="space-y-4">
  <input type="text" placeholder="Product Name" className="border p-2 w-full" />
  <input type="number" placeholder="Price" className="border p-2 w-full" />
  <textarea placeholder="Description" className="border p-2 w-full"></textarea>
  <input type="file" accept="image/*" />
  <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
</form>
```

---

### 6. Logout
**Logic:**
```
localStorage.removeItem("adminToken");
window.location.href = "/admin/login";
```

---

## 🛡️ Admin Route Protection Example

```
<Route
  path="/admin/dashboard"
  element={user?.role === 'admin' ? <Dashboard /> : <Navigate to="/not-authorized" />}
/>
```

---

## 📌 Notes
- All admin pages should be protected.
- Customize Tailwind colors based on brand.
- Use Toast/Alerts for add/update/delete actions.
