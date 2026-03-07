# 🏠 Siddharth's Airbnb Clone

A full-stack peer-to-peer marketplace web application inspired by Airbnb — built with Node.js, Express, MongoDB, and EJS.

🌐 **Live Demo:** [siddharthkumarrai-project.onrender.com/listings](https://siddharthkumarrai-project.onrender.com/listings)

---

## 📸 Overview

This project is a fully functional Airbnb-inspired platform where users can browse, create, edit, and delete property listings. It features user authentication, image uploads, interactive maps, and a clean, responsive UI.

---

## ✨ Features

- 🔐 User Authentication (Sign Up / Login / Logout)
- 🏡 Create, Read, Update & Delete (CRUD) Listings
- 🖼️ Image Uploads via Cloudinary
- 🗺️ Map Integration for listing locations
- ⭐ Reviews & Ratings on listings
- 🛡️ Authorization (only owners can edit/delete their listings)
- 📱 Responsive Design with Bootstrap
- ✅ Server-side Validation with Joi
- 🔔 Flash Messages for user feedback

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Backend    | Node.js, Express.js               |
| Frontend   | EJS (Embedded JavaScript), CSS    |
| Database   | MongoDB, Mongoose                 |
| Auth       | Passport.js (Local Strategy)      |
| Storage    | Cloudinary + Multer               |
| Validation | Joi                               |
| Deployment | Render                            |

---

## 📁 Project Structure

```
siddharth_Airbnb_Clone/
├── controller/       # Route handler logic (MVC Controllers)
├── models/           # Mongoose data models
├── routes/           # Express route definitions
├── views/            # EJS templates
├── public/           # Static assets (CSS, JS, images)
├── utils/            # Helper utilities & error handling
├── init/             # Database seed data
├── app.js            # Main application entry point
├── cloudConfig.js    # Cloudinary configuration
├── middlewares.js    # Custom middleware functions
├── schema.js         # Joi validation schemas
└── package.json      # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Cloudinary](https://cloudinary.com/) account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/siddharthkumarrai/siddharth_Airbnb_Clone.git
   cd siddharth_Airbnb_Clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   ATLASDB_URL=your_mongodb_connection_string
   SECRET=your_session_secret_key
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAP_TOKEN=your_map_api_token
   ```

4. **Seed the database (optional)**
   ```bash
   node init/index.js
   ```

5. **Start the server**
   ```bash
   node app.js
   ```

6. Open your browser and visit `http://localhost:8080/listings`

---

## 🔑 Environment Variables

| Variable         | Description                          |
|-----------------|--------------------------------------|
| `ATLASDB_URL`   | MongoDB connection string             |
| `SECRET`        | Session secret key                    |
| `CLOUD_NAME`    | Cloudinary cloud name                 |
| `CLOUD_API_KEY` | Cloudinary API key                    |
| `CLOUD_API_SECRET` | Cloudinary API secret              |
| `MAP_TOKEN`     | Map API token (Mapbox or similar)     |

---

## 📄 License

This project is built for educational purposes as part of a full-stack web development learning journey.

---

## 👨‍💻 Author

**Siddharth Kumar Rai**
- GitHub: [@siddharthkumarrai](https://github.com/siddharthkumarrai)

---

> ⭐ If you found this project helpful, give it a star on GitHub!