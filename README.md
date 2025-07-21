# REAL-TIME-DOC-EDITOR
"COMPANY":CODETECH IT SOLUTION

"NAME":CHESTA

"INTERN ID":CT08DN805

"DOMAIN":FULL STACK DEVELOPMENT

"DURATION":8 WEEK

"MENTOR": NEELA SANTOSH

# INTRODUCTION

A powerful, real-time collaborative document editing application built using **Node.js**, **Express**, **Socket.IO**, and **MongoDB**, with a modern React frontend. This app allows multiple users to edit the same document simultaneously, making it ideal for teams, students, and professionals.

## 🚀 Features

- 🔄 **Real-Time Collaboration**  
  Seamlessly edit documents with others in real time using **Socket.IO**.

- 🧠 **Persistent Storage**  
  All document changes are saved in **MongoDB**, ensuring nothing gets lost.

- 🧑‍🤝‍🧑 **Multiple Users Supported**  
  Invite friends or teammates to collaborate on the same document.

- 📝 **Rich Text Editor**  
  Edit with formatting options like bold, italic, underline, etc.

- 🌙 **Dark Mode Support**  
  Switch between light and dark themes for better comfort.

- 🔐 **Authentication (Optional)**  
  Secure your documents with login/signup using JWT.

- 📁 **Document History (Upcoming)**  
  View and restore older versions of your documents (planned feature).

## 🛠️ Tech Stack

- **Frontend:** React, Quill.js (Rich Text Editor), Axios
- **Backend:** Node.js, Express, Socket.IO
- **Database:** MongoDB with Mongoose
- **Styling:** Tailwind CSS or Bootstrap

## SCREENSHOTS
<img width="1363" height="651" alt="image" src="https://github.com/user-attachments/assets/d11b082c-feef-4d82-bb08-04cf70735b7e" />
<img width="1361" height="650" alt="image" src="https://github.com/user-attachments/assets/b6ede06b-1a95-40c3-a1b0-115734aa2456" />
<img width="1356" height="652" alt="image" src="https://github.com/user-attachments/assets/a1cfbb4f-1135-4577-b22f-4dd5664a615d" />
<img width="1363" height="656" alt="image" src="https://github.com/user-attachments/assets/76b2d645-b273-437e-8b16-486f5148e84f" />
<img width="1356" height="653" alt="image" src="https://github.com/user-attachments/assets/1e58f58c-b5c1-46be-a4a7-c2d199018c27" />
<img width="1360" height="613" alt="image" src="https://github.com/user-attachments/assets/d19c5302-0a33-484b-aa00-c6aed8b424c2" />









## ⚙ Installation & Running Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/realtimecraft.git
   cd realtimecraft

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install

4. **Configure environment variables**

   Create a .env file in the backend folder:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=4000

5. **Build frontend and start backend**
   ```bash
   cd frontend
   npm run build

   cd ../backend
   node server.js

   The frontend will be served from the backend server at http://localhost:4000


