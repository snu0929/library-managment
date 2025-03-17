# 📚 Library Management System

A simple **Library Management System** built using **React.js** and **Node.js** with **JWT-based authentication** and role-based access control (Admin/User).

---

## 🚀 Features
✅ User Authentication (JWT)  
✅ Role-based Access (Admin/User)  
✅ Add/Edit/Delete Books (Admin only)  
✅ Search & Filter Books (by title, author, and genre)  
✅ Clean and Responsive UI  

---

## 🛠️ Tech Stack
**Frontend:**  
- React.js  
- Axios  
- React Router  
- Styled Components  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB  
- JWT  

---

## ⚙️ Installation

1. **Clone the repository**  
```bash
git clone https://github.com/your-username/library-management.git
```
Install dependencies

cd library-management
```
yarn install
```
Set up environment variables
Create a .env file in the root directory:
plaintext
```
MONGO_URI=your-mongo-db-connection-string
JWT_SECRET=your-jwt-secret
PORT=5000
```
Run the backend

```
cd backend
yarn start
```
Run the frontend
```
cd frontend
yarn dev
```
🌟 Usage
Admin: Can add, edit, and delete books.
User: Can search and filter books by title, genre, and author.
Public: Can only view available books.
🚨 API Endpoints
Method	Endpoint	Description	Auth Required
### POST	/api/auth/register	Register new user	
- POST	/api/auth/login	Login user	
- GET	/api/book	Get all books	✅
- POST	/api/book/add	Add new book	✅ (Admin)

frontend deployed link -
🏆 Admin Credentials
Email: admin@example.com
Password: admin123
📸 Screenshots
