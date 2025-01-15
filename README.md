# **Causes and Contributions API**

This project is a RESTful API for managing social causes and contributions. It allows users to perform CRUD operations on causes and make contributions to specific causes. The project is built with **Node.js**, **Express**, and **MongoDB**, and integrates **Cloudinary** for image uploads.

---

## **Features**

### **Causes Management**
- **Create Cause:** Add a new cause with a title, description, and image.
- **Retrieve Causes:** View all causes or a specific cause by ID.
- **Update Cause:** Modify details of a specific cause, including the image.
- **Delete Cause:** Remove a cause from the database.

### **Contributions**
- **Contribute to a Cause:** Add a contribution to a specific cause by providing a name, email, and donation amount.

---

## **Technology Stack**
- **Backend Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **Cloud Storage:** [Cloudinary](https://cloudinary.com/) for image uploads.
- **File Handling:** [Multer](https://github.com/expressjs/multer) for handling file uploads.

---

## **Getting Started**

### **Prerequisites**
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/)
- Cloudinary account (for image uploads)

### **Setup**
1. **Clone the Repository**
   ```bash
   git clone https://github.com/Ceeylla-Favv/social_cause.git
   cd social_cause
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the project root and add the following:
   ```env
   PORT=2025
   MONGO_URI=your-mongodb-uri
   CLOUD_NAME=your-cloudinary-cloud-name
   CLOUD_API_KEY=your-cloudinary-api-key
   CLOUD_API_SECRET=your-cloudinary-api-secret
   ```

4. **Start the Server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:2025`.

---

## **API Endpoints**

### **Causes**
| Method | Endpoint                | Description               |
|--------|-------------------------|---------------------------|
| POST   | `/api/v1/create-cause`               | Create a new cause        |
| GET    | `/api/v1/all-causes`               | Get all causes            |
| GET    | `/api/v1/get-cause/:id`           | Get a specific cause      |
| PUT    | `/api/v1/update-cause/:id`           | Update a specific cause   |
| DELETE | `/api/v1/delete-cause/:id`           | Delete a specific cause   |

**Request Body for Creating/Updating Causes:**
- `title` (String) - Required
- `description` (String) - Required
- `image` (File) - Optional (multipart/form-data)

---

### **Contributions**
| Method | Endpoint                       | Description                          |
|--------|--------------------------------|--------------------------------------|
| POST   | `/api/v1/contribute/:id`       | Contribute to a specific cause       |

**Request Body for Contributions:**
- `name` (String) - Required
- `email` (String) - Required
- `amount` (Number) - Required (must be greater than 0)

---

## **Example Usage**

### **Create a Cause**
**Endpoint:**
```http
POST /api/v1/create-cause
```

**Request (form-data):**
| Key         | Value                    |
|-------------|--------------------------|
| title       | "Save the Environment"   |
| description | "Help protect forests."  |
| image       | [Upload a file]          |

---

### **Contribute to a Cause**
**Endpoint:**
```http
POST /api/v1/contribute/:id
```

**Request (JSON):**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "amount": 50.5
}
```

---

## **Project Structure**
```
project/
├── controllers/
│   ├── causeController.js
│   └── contributionController.js
|__ db/
|   └── connectDb.js
├── middleware/
│   └── upload.js
├── models/
│   ├── Cause.js
│   └── Contribution.js
├── routes/
│   ├── causeRoutes.js
│   └── contributionRoutes.js
├── config/
│   └── cloudinary.js
├── .env
├── index.js
└── README.md
```

---

## **Contributing**
Contributions are welcome! Feel free to open an issue or submit a pull request for improvements.

---

## **License**
This project is licensed under the MIT License.

---

## **Author**
**Bertley Priscilla Goddivinefavour**  
For inquiries: [bertleypriscy@gmail.com](mailto:bertleypriscy@gmail.com)

