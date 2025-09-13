# 🏕️ CamperShop - Simple MERN E-Commerce App

CamperShop is a simple **full-stack MERN e-commerce application** built with **React + TypeScript** on the frontend and **Node.js + Express + MongoDB (Mongoose ORM)** on the backend.  
It features **Role-Based Dashboards**, **Firebase Authentication**, **Stripe Payment Integration**, **Search & Filter**, **Cart & Order Management**, and **Admin CRUD** capabilities.

<!-- Core MERN Stack -->
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<!-- Frontend / UI -->
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animation-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-RTK-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)

<!-- Backend / Services -->
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20DB-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)

<!-- Dev Tools -->
[![Git](https://img.shields.io/badge/Git-Version%20Control-F05032?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI/CD-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/features/actions)
[![Docker](https://img.shields.io/badge/Docker-Containers-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![ESLint](https://img.shields.io/badge/ESLint-Linting-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-Formatting-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)](https://prettier.io/)

---

[![Campers-Shop](./frontend.png)](https://campers-shop-frontend-phi.vercel.app/)



## 🔗 Links

### **Frontend**
- **GitHub:** [CamperShop Frontend](https://github.com/rahimbd7/Assignment-04-Campers-Shop/tree/main/frontend)  
- **Live Demo:** [Frontend Live Link](https://campers-shop-frontend-phi.vercel.app/)

### **Backend**
- **GitHub:** [CamperShop Backend](https://github.com/rahimbd7/Assignment-04-Campers-Shop/tree/main/backend)  
- **Live API:** [Backend Live Link](https://campers-shop-backend-omega.vercel.app/)

---

## 🚀 Features

### **Frontend (React + TypeScript + Redux Toolkit)**
- 🎨 Fully responsive UI with **React** + **Tailwind CSS** + **Framer Motion**
- 🔐 **Firebase Authentication** with **Google** & **GitHub** login
- 🛒 **Cart & Order Management** with Redux Toolkit + LocalStorage
- 💳 **Stripe Payment** using **Stripe Elements**
- 🔍 **Search & Filter Products** by name, price, and category  

**User Dashboard**:  
- View cart items & order history  
- Update user profile  

**Admin Dashboard**:  
- CRUD on products & categories  
- Manage users & order status  

> **Admin Access:** Login with  
> **Email:** `admin@admin.com`  
> **Password:** `admin123`  

---

### **Backend (Node.js + Express + MongoDB + Mongoose)**
- 🔐 **JWT Authentication** for secure endpoints  
- 📦 Product & Order APIs with **Role-Based Access Control**  
- 🗄️ **Mongoose Models** for structured database schemas  
- 💳 **Stripe Payment API** integration  
- 🧑‍💻 **Custom Register & Login** endpoints  

---

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS, Redux Toolkit, Firebase, Framer Motion  
- **Backend:** Node.js, Express.js, TypeScript, Mongoose (MongoDB ORM)  
- **Database:** MongoDB  
- **Payment Gateway:** Stripe  
- **Authentication:** JWT + Firebase  
- **Dev Tools:** Git, Postman, ESLint, Prettier  

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/campershop.git
cd campershop 
```
### 2️⃣ Install Dependencies
```bash
# Using pnpm (Recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install

```
### 3️⃣ Setup Environment Variables
| Variable Name          | Description            |
|------------------------|-------------------------|
| `VITE_FIREBASE_API_KEY` | Firebase API Key        |
| `STRIPE_SECRET_KEY`     | Stripe Secret Key       |
| `JWT_SECRET`            | JWT Secret for tokens   |
| `MONGO_URI`             | MongoDB connection URI  |

4️⃣ Start Development Servers
```bash
# Frontend (Recommended with pnpm)
cd frontend && pnpm dev
# Or using npm
cd frontend && npm run dev

#Backend (Recommended with pnpm)
cd backend && pnpm dev
# Or
cd backend && npm run dev
```


> **Note:** This project was created using [pnpm](https://pnpm.io/).  
> We recommend using pnpm for faster installs and better disk space usage.  
> However, npm or yarn will also work fine.

<div align="center">
  <strong>All right reserved by @Md Rahim Uddin</strong>  
  <br>
  <a href="#top">Back to top ⬆️</a>
</div>
