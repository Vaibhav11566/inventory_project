# 🚀 REST API — Auth, Products & Orders

A REST API for managing users, products, and orders with JWT authentication.

---

## 🛠️ Tech Stack

- Node.js + Express.js
- PostgreSQL
- JWT Authentication

---

## ⚙️ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file in root
```env
PORT=5001
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
```

### 4. Run the server
```bash
npm run dev
```

---

## ❗ `npm run dev` Kaam Nahi Kar Raha? — Fix Karo

### Step 1 — `package.json` check karo
```bash
cat package.json
```
Ye hona chahiye:
```json
"scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js"
}
```

### Step 2 — nodemon install nahi hai?
```bash
npm install -D nodemon
npm run dev
```

### Step 3 — node_modules missing?
```bash
rm -rf node_modules
npm install
npm run dev
```

### Step 4 — Port already in use?
```bash
lsof -i :5001
kill -9 <PID>
npm run dev
```

### Step 5 — .env file missing?
Make sure `.env` file root mein hai aur sahi values hain.

---

## 📡 API Reference

**Base URL:** `http://localhost:5001`

> 🔒 Auth Required routes mein header bhejo:
> `Authorization: Bearer <token>`

---

## 🔐 Auth

### Register
**POST** `/auth/register`

Request:
```json
{
  "email": "test@test.com",
  "password": "123456"
}
```
Response:
```json
{
  "success": true,
  "message": "User registered",
  "data": {
    "id": "e81bd66e-ef33-4dd4-8380-8cb3f92c41df",
    "email": "test@test.com",
    "created_at": "2026-03-13T11:08:18.316Z"
  }
}
```

---

### Login
**POST** `/auth/login`

Request:
```json
{
  "email": "test@test.com",
  "password": "123456"
}
```
Response:
```json
{
  "success": true,
  "message": "Login success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 📦 Products

| Method | Endpoint | Auth | Description |
|--------|----------------|------|----------------------|
| POST | `/products` | 🔒 | Create product |
| GET | `/products` | ❌ | Get all products |
| GET | `/products/:id` | ❌ | Get product by ID |
| PUT | `/products/:id` | 🔒 | Update product |
| DELETE | `/products/:id` | 🔒 | Delete product |

---

### Create Product
**POST** `/products` — 🔒 Auth Required

Request:
```json
{
  "name": "Phone",
  "sku": "P100",
  "price": 1000,
  "stock_quantity": 10
}
```
Response:
```json
{
  "success": true,
  "message": "Product created",
  "data": {
    "id": "037126fc-d87c-4397-a4d8-171a55ece8f7",
    "name": "Phone",
    "sku": "P100",
    "price": "1000",
    "stock_quantity": 10,
    "created_at": "2026-03-13T11:10:26.901Z"
  }
}
```

---

### Get All Products
**GET** `/products`

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "037126fc-d87c-4397-a4d8-171a55ece8f7",
      "name": "Phone",
      "sku": "P100",
      "price": "1000",
      "stock_quantity": 10,
      "created_at": "2026-03-13T11:10:26.901Z"
    }
  ]
}
```

---

### Get Product by ID
**GET** `/products/:id`

Response:
```json
{
  "success": true,
  "data": {
    "id": "037126fc-d87c-4397-a4d8-171a55ece8f7",
    "name": "Phone",
    "sku": "P100",
    "price": "1000",
    "stock_quantity": 8,
    "created_at": "2026-03-13T11:10:26.901Z"
  }
}
```

---

### Update Product
**PUT** `/products/:id` — 🔒 Auth Required

Request:
```json
{
  "name": "Phone X",
  "price": 2000,
  "stock_quantity": 20
}
```
Response:
```json
{
  "success": true,
  "message": "Product updated",
  "data": {
    "id": "037126fc-d87c-4397-a4d8-171a55ece8f7",
    "name": "Phone X",
    "sku": "P100",
    "price": "2000",
    "stock_quantity": 20,
    "created_at": "2026-03-13T11:10:26.901Z"
  }
}
```

---

### Delete Product
**DELETE** `/products/:id` — 🔒 Auth Required

Response:
```json
{
  "success": true,
  "message": "Product deleted"
}
```

---

## 🧾 Orders

| Method | Endpoint | Auth | Description |
|--------|-----------------|------|------------------|
| POST | `/orders` | 🔒 | Create order |
| GET | `/orders` | ❌ | Get all orders |
| GET | `/orders/:id` | ❌ | Get order by ID |

---

### Create Order
**POST** `/orders` — 🔒 Auth Required

Request:
```json
{
  "items": [
    {
      "product_id": "037126fc-d87c-4397-a4d8-171a55ece8f7",
      "quantity": 2
    }
  ]
}
```
Response:
```json
{
  "success": true,
  "message": "Order created",
  "data": {
    "id": "51e44e7c-5a3c-4a74-b969-b1988a3a600a",
    "total_amount": "2000",
    "created_at": "2026-03-13T11:15:14.535Z"
  }
}
```

---

### Get All Orders
**GET** `/orders`

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "51e44e7c-5a3c-4a74-b969-b1988a3a600a",
      "total_amount": "2000",
      "created_at": "2026-03-13T11:15:14.535Z"
    }
  ]
}
```

---

### Get Order by ID
**GET** `/orders/:id`

Response:
```json
{
  "success": true,
  "data": {
    "order": {
      "id": "51e44e7c-5a3c-4a74-b969-b1988a3a600a",
      "total_amount": "2000",
      "created_at": "2026-03-13T11:15:14.535Z"
    },
    "items": [
      {
        "id": "3bc01c38-2260-444b-a517-6420480f2984",
        "order_id": "51e44e7c-5a3c-4a74-b969-b1988a3a600a",
        "product_id": "037126fc-d87c-4397-a4d8-171a55ece8f7",
        "quantity": 2,
        "price": "1000"
      }
    ]
  }
}
```

---

## 📁 Folder Structure
```
project/
├── index.js
├── package.json
├── .env
├── routes/
│   ├── auth.js
│   ├── products.js
│   └── orders.js
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   └── orderController.js
└── middleware/
    └── authMiddleware.js
```
