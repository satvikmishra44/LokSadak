# 🚀 LokSadak:- Because You Pay Taxes For It - Backend

This is the **backend** of the **LokSadak**. It is built using **Node.js, Express.js, and MongoDB**, providing a robust API for handling user authentication, road project data, complaint management, and admin functionalities.

---

## 📌 Features

* 🔐 **Authentication & Authorization** (JWT-based for citizens, officers, and admins)
* 🏗 **Road Project Management** (MLA/MP/Contractor/Company details)
* 📝 **Complaint System** (citizens can file, track, and update complaints)
* 📊 **Admin Dashboard Support** (manage all complaints and users)
* ☁️ **Cloudinary Integration** (for uploading files/images)
* 🔄 **RESTful APIs** (structured and scalable)

---

## 🛠 Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB + Mongoose
* **Authentication:** JWT & bcrypt
* **File Uploads:** Multer + Cloudinary
* **Environment Management:** dotenv

---

## 📦 Dependencies

```json
{
  "bcrypt": "^6.0.0",
  "cloudinary": "^2.7.0",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "dotenv": "^17.2.1",
  "express": "^5.1.0",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.17.0",
  "multer": "^2.0.2",
  "nodemon": "^3.1.10",
  "streamifier": "^0.1.1"
}
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/gov-transparency-backend.git
cd gov-transparency-backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### 4️⃣ Run the server

```bash
npm run dev
```

Server will run on **[http://localhost:5000](http://localhost:5000)** 🚀

---

## 📡 API Endpoints

### 🔑 Auth Routes

* `POST /api/auth/register` → Register a new user
* `POST /api/auth/login` → Login user

### 🏗 Road Project Routes

* `POST /api/projects` → Add new road project
* `GET /api/projects/:id` → Get project details

### 📝 Complaint Routes

* `POST /api/complaints` → File a new complaint
* `GET /api/complaints/:id` → Get complaint details
* `PUT /api/complaints/:id` → Update complaint status/remarks

### 👨‍💼 Admin Routes

* `GET /api/admin/complaints` → Get all complaints
* `PUT /api/admin/complaints/:id` → Update complaint by admin

---

## 🏗 Project Structure

```
backend/
│── models/        # Mongoose models (User, Complaint, Project)
│── routes/        # Express routes
│── controllers/   # Logic for handling requests
│── middleware/    # Auth & error handling
│── utils/         # Utility functions (Cloudinary, etc.)
│── server.js      # Main entry point
│── .env           # Environment variables
│── package.json   # Dependencies
```

---

## 🚀 Deployment

You can deploy the backend on:

* **Render**
* **Railway**
* **Heroku**
* **Vercel (serverless)**

Make sure to set environment variables in the hosting platform.

---

## 🏆 Contribution

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📜 License

This project is licensed under the **MIT License**.

---

🔥 Backend ready for powering the **LokSadak:- The Perfect Accountability App**!
