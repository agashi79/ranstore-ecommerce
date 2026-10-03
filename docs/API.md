# Ranstore API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication Routes

### Login
```
POST /auth/login
Body: { email, password }
```

### Register
```
POST /auth/register
Body: { email, password, name, phone, address }
```

## Product Routes

### Get All Products
```
GET /products
Query: ?categoryId=xxx&search=xxx
```

### Get Single Product
```
GET /products/:id
```

### Create Product (Admin)
```
POST /products
Body: { categoryId, name, description, price, stock }
```

### Update Product (Admin)
```
PUT /products/:id
Body: { name, description, price, stock, ... }
```

### Delete Product (Admin)
```
DELETE /products/:id
```

## Category Routes

### Get All Categories
```
GET /categories
```

### Create Category (Admin)
```
POST /categories
Body: { name, description, icon }
```

## Cart Routes

### Get Cart
```
GET /cart/:userId
```

### Add to Cart
```
POST /cart/:userId/add
Body: { productId, quantity, price, productName, productImage }
```

### Update Cart Item
```
PUT /cart/:userId/update/:productId
Body: { quantity }
```

### Remove from Cart
```
DELETE /cart/:userId/remove/:productId
```

## Order Routes

### Create Order
```
POST /orders
Body: { userId, items, total, shippingAddress, phoneNumber }
```

### Get User Orders
```
GET /orders/user/:userId
```

### Get All Orders (Admin)
```
GET /orders
```

### Update Order Status (Admin)
```
PUT /orders/:orderId/status
Body: { status }
```

## Admin Routes

### Dashboard
```
GET /admin/dashboard
```

### Get Banner
```
GET /admin/banner
```

### Update Banner (Admin)
```
PUT /admin/banner/:bannerId
Body: { title, subtitle, image, cta, ctaLink }
```

---

**Admin Credentials:**
- Email: `admin@ranstore.test`
- Password: `admin123`

**Contact:**
- WhatsApp: `081519992955`
