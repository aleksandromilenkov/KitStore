# 🏆 KitStore - Football Kits Online Shop

**KitStore** is a fictional e-commerce application for browsing and purchasing football kits. Built as a learning project, it showcases a full-stack implementation with authentication, cart functionality, payment processing, and admin capabilities.

---

## 🚀 Features

- 🔐 User Authentication (Register, Login, Logout)
- 🛒 Shopping Cart with Stripe Payment Integration
- 📦 View Past Orders
- 🔍 Search, Filter, and Paginate Kits
- 🧑‍💼 Admin Panel for managing Kits and Clubs (CRUD)
- ☁️ Image Upload (via Cloudinary)
- ✨ Clean and responsive UI built with Material UI & CSS

---

## 🛠️ Tech Stack

### Backend
- ASP.NET Core Web API (.NET 8)
- MS SQL Server
- Entity Framework Core
- AutoMapper
- Cloudinary for image uploads
- Stripe for payments
- JWT Authentication & ASP.NET Core Identity

#### Backend Packages
```xml
AutoMapper, CloudinaryDotNet, Microsoft.AspNetCore.Authentication.JwtBearer, 
Microsoft.AspNetCore.Identity.EntityFrameworkCore, Microsoft.EntityFrameworkCore (and tools),
Microsoft.Extensions.Configuration, NewtonsoftJson, Stripe.net
``` 

#### 🖥️ Frontend

- **React.js**
- **Redux Toolkit & RTK Query**
- **React Router**
- **React Hook Form + Zod**
- **Stripe JS + React Stripe**
- **Material UI (MUI)**
- **React Dropzone**
- **React Toastify**
- **Vite + TypeScript**

---

### 📦 Frontend Dependencies

```json
{
  "@emotion/react": "^11.14.0",
  "@emotion/styled": "^11.14.0",
  "@fontsource/roboto": "^5.1.1",
  "@hookform/resolvers": "^4.1.3",
  "@mui/icons-material": "^6.4.5",
  "@mui/lab": "^6.0.0-beta.30",
  "@mui/material": "^6.4.5",
  "@reduxjs/toolkit": "^2.5.1",
  "@stripe/react-stripe-js": "^3.3.0",
  "@stripe/stripe-js": "^5.9.1",
  "date-fns": "^4.1.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^7.5.0",
  "react-dropzone": "^14.3.8",
  "react-hook-form": "^7.54.2",
  "react-redux": "^9.2.0",
  "react-toastify": "^11.0.3",
  "redux-persist": "^6.0.0",
  "zod": "^3.24.2"
}
