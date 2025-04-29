# 🏆 KitStore - Football Kits Online Shop

**KitStore** is a fictional e-commerce application for browsing and purchasing football kits. Built as a learning project, it showcases a full-stack implementation with authentication, cart functionality, payment processing, and admin capabilities.  

<img width="713" alt="Image" src="https://github.com/user-attachments/assets/44500e7b-f925-465a-9c7d-b18c51c41536" />  

![image](https://github.com/user-attachments/assets/b9162414-66dc-4901-9e70-0b517a017195)

---

## 🚀 Features

- 🔐 User Authentication (Register, Login, Logout)
- 🛒 Shopping Cart with Stripe Payment Integration
- 📦 View Past Orders
- 🔍 Search, Filter, and Paginate Kits
- 🧑‍💼 Admin Panel for managing Kits and Clubs (CRUD)
- 🧑‍💼 User Panel for updating Profile Picture, Username and Password  
- ☁️ Image Upload (via Cloudinary)
- ✨ Clean and responsive UI built with Material UI & CSS
- ✨ Dark/Light Theme  

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
```
 #### Screenshots  

 Catalog Page Without Filters:  
![image](https://github.com/user-attachments/assets/9f20e6a9-cb30-4e4e-afa1-310459ebc501)

Catalog Page Without Filters 2nd Page:  
![image](https://github.com/user-attachments/assets/5ffc65fc-a5b9-489d-bc8e-b586149c34f7)

Catalog Page Only Macedonian's Club Kits:  
![image](https://github.com/user-attachments/assets/a79b1d71-ca2b-443b-b216-23e3ef9fdf24)

Kit Details Page:  
![image](https://github.com/user-attachments/assets/c7563033-048c-4a87-9bfc-2f08296d9b6c)

Cart Page:  
![image](https://github.com/user-attachments/assets/a090e16d-bda4-4286-95a6-6fda22e89238)

Cart Page Checkout 1st Step Put Address:  
![image](https://github.com/user-attachments/assets/69f26e05-e998-4cc5-aead-ba2d5840c87d)

Cart Page Checkout 2nd Step Put Credit Card:  
![image](https://github.com/user-attachments/assets/5263d9b8-bb85-456a-84eb-d52dc2fe046e)

Cart Page Checkout 3nd Step View and Pay:  
![image](https://github.com/user-attachments/assets/b8ee1f4c-d6d1-46bc-b99b-59b1655d42a4)

Checkout Success Thank For Your Order:  
![image](https://github.com/user-attachments/assets/41347cd9-8282-4d40-a98c-c805310ce77c)  

Orders Page:  
![image](https://github.com/user-attachments/assets/47520f0c-6237-4be2-a943-73efc50acc5e)

Order Details Page:  
![image](https://github.com/user-attachments/assets/4ca1db66-4bfb-4db0-a315-c8353d47ff34)  

User's Profile Page:  
![image](https://github.com/user-attachments/assets/dbdb37bc-a0ba-41de-9635-2dadcfbb83bc)  

About Us Page:  
![image](https://github.com/user-attachments/assets/a492b04f-eb98-418f-95f9-1dc68f18e608)  

Catalog Page Search Functionality:  
![image](https://github.com/user-attachments/assets/d6531b38-477e-495d-a61d-82353293ca29)  

User's Dashboard(Menu):  
![image](https://github.com/user-attachments/assets/c6b7a7d5-78eb-409e-aa7a-b908957c55af)

Admin Dashboard(Menu):  
![image](https://github.com/user-attachments/assets/7b2bcf8b-596a-448c-9213-4d9faab6a544)

Admin Clubs Page:  
![image](https://github.com/user-attachments/assets/54e3ff89-fa0b-4c7c-9f96-083f4527fd36)  

Admin Kits Page 1st Page:  
![Image](https://github.com/user-attachments/assets/b748ad13-b0d8-4d59-86c4-a06be324bf45)  

Admin Kits Page 2nd Page:  
![Image](https://github.com/user-attachments/assets/dafb14ea-f393-4f58-bb9f-82c9f4a03547)  

Create Kit Form:  
![image](https://github.com/user-attachments/assets/c2add14f-b08e-4694-84b1-53bda9b0fc7e)

Create Club Form:  
![image](https://github.com/user-attachments/assets/f805e02b-ed20-4ab4-8dc4-016988e1e1e8)

Login Page:  
![image](https://github.com/user-attachments/assets/79bc5314-1eba-4f61-87ef-2bfbcb859835)  

Register Page:  
![image](https://github.com/user-attachments/assets/dc566107-7a19-465e-888f-b87038d93d39)

Validation For Login:   
![image](https://github.com/user-attachments/assets/fd000e52-b8f8-4778-a867-cc3fec4ebf63)

Validation For Register:  
![image](https://github.com/user-attachments/assets/072d09e5-4869-4d00-909b-c6b3a8326e39)

Light Theme:  
![image](https://github.com/user-attachments/assets/558bd554-f2ee-455a-8955-520f161ee349)






