# 🛍️ E-Commerce Frontend

This is the frontend of a full-stack e-commerce platform built with **React**, **Redux Toolkit**, and **Tailwind CSS**. It supports both **user** and **admin** interfaces. Admins can add/update products, while users can browse, add to cart, and purchase.

## 🔥 Features

### 👤 User

- Product listing
- Product detail page
- Add to cart
- Responsive UI
- Dynamic routing with React Router

### 🛠️ Admin

- Admin login (optional role-based UI)
- Add new products
- Upload product images to **Cloudinary** via **Multer**
- View/manage product inventory

## 🧩 Tech Stack

- **Frontend**: React, Redux Toolkit, Tailwind CSS
- **State Management**: Redux Toolkit + RTK Query
- **Routing**: React Router
- **Image Upload**: Multer (backend) + Cloudinary (cloud storage)
- **Icons**: Lucide React / React Icons

## 🖼 Image Handling

- Admin uploads product images via form
- Images are uploaded to **Cloudinary**
- Frontend fetches and displays image URLs from backend

## 🔗 Live Demo

[Live Site]([https://your-frontend.vercel.app](https://market-bazaar-frontend.vercel.app/))

## ▶️ Local Development

```bash
cd frontend
npm install
npm run dev

