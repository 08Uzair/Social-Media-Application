# 📱 Social Media Application
---

 Authentication Page
 * SIGN IN
> ![image](https://github.com/user-attachments/assets/ddd9d62e-ae9b-45cb-934a-2b0193a964e4)

 * SIGN UP / REGISTER
> ![image](https://github.com/user-attachments/assets/99be1970-e183-4b08-a47b-5bd0138875a6)

 * Home Page
> ![image](https://github.com/user-attachments/assets/79b8aeda-d4b2-4166-a3a1-27182be0347d)

 * Profile Page
> ![image](https://github.com/user-attachments/assets/be66a018-a810-4f33-81c0-208a176f878b)

 * Friends Page
> ![image](https://github.com/user-attachments/assets/f019ca56-8a9a-4e9f-a417-8d90b5c97e60)

 * Bookmark Page 
> ![image](https://github.com/user-attachments/assets/493f018f-78e4-4d42-a558-7bb28c240070)

>
---
A Featured Full-Stack **Social Media Web App** where users can sign up, create posts & stories, follow others, like, share, bookmark content, and more — built with **Next.js**, **Node.js**, **Express**, **MongoDB**, and **Tailwind CSS**.

🔗 **Client Hosted on Versel**: [social-media-application-umber.vercel.app](https://social-media-application-umber.vercel.app)  
🔗 **Server Hosted on Render**: [https://social-media-application-3alv.onrender.com](https://social-media-application-3alv.onrender.com)

---

## ✨ Features

- 👤 User **Sign In / Register** (with JWT Authentication)
- ✏️ **Profile Update**
- 📸 **Post** & **Story Uploads** (images stored on **Cloudinary**)
- ❤️ **Like**, 🔗 **Share**, 🔖 **Bookmark** any post
- 👁️ **View all posts and stories**
- ⏱️ **Stories auto-delete** after 24 hours
- ➕ **Follow / Unfollow** users
- 📊 View **Followers / Following** count
- 🧠 Fully responsive, clean UI with Tailwind CSS

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **Media Storage**: Cloudinary

---

## 🚀 Getting Started

### 📁 Folder Structure

- `/client` – Frontend (Next.js)
- `/server` – Backend (Express.js)

---

## 📦 Client Setup (Next.js)


Navigate to client folder

```cd client```

Install dependencies

```npm install```

Run the dev client

```npm run dev```

## 🔌 Server Setup (Express.js)

Navigate to server folder

```cd server```

Install dependencies

```npm install```

Run the server

```npm start```

## 🔐 API Routes

> All routes are prefixed with `/api/v1`

### 📌 Post Routes

| Method | Endpoint        | Description        |
|--------|------------------|--------------------|
| GET    | `/post`          | Fetch all posts    |
| GET    | `/post/:id`      | Get a post by ID   |
| POST   | `/post`          | Create a new post  |


### 🔖 Bookmark Routes

| Method | Endpoint           | Description            |
|--------|--------------------|------------------------|
| GET    | `/bookmark`        | Fetch all bookmarks    |
| POST   | `/bookmark`        | Create a new bookmark  |
| DELETE | `/bookmark/:id`    | Remove a bookmark      |

### 📸 Story Routes

| Method | Endpoint        | Description         |
|--------|------------------|---------------------|
| GET    | `/story`         | Fetch all stories   |
| GET    | `/story/:id`     | Get a story by ID   |
| POST   | `/story`         | Create a new story  |
| DELETE | `/story/:id`     | Delete a story      |

### 👤 User Routes

| Method | Endpoint          | Description         |
|--------|-------------------|---------------------|
| POST   | `/user/signIn`    | Sign in user        |
| POST   | `/user/signUp`    | Register user       |
| GET    | `/user`           | Get all users       |
| GET    | `/user/:id`       | Get a user by ID    |
| PUT    | `/user/:id`       | Update user profile |


## 🧪 Test Credentials (Optional)

You can add test login details here if you want users to try the app without registering.

## 🧑‍💻 Developer

Made with ❤️ by Uzair Nizamuddin Qureshi

## 📜 License

This project is licensed under the MIT License.
