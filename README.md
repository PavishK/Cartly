# Cartly

Cartly is a mobile application that lets users manage a to-do list of products, predict their prices, and calculate the total cost using AI-powered predictions (GRMini). It simplifies shopping and budgeting with a smart, interactive experience.

---

## Features

- **Create and manage product lists:** Add, edit, and remove products from your list.  
- **Price prediction:** Predict product prices using GRMini AI model.  
- **Total cost calculation:** Automatically calculate the total cost of your product list.  
- **Intuitive UI:** Smooth and responsive design with React Native and NativeWind.

---

## Folder Structure

- `cartly-app` – Frontend (React Native + Expo + NativeWind)  
- `cartly-server` – Backend (Node.js + Express + MongoDB)  

---

## Tech Stack

### Frontend (`cartly-app`)
- **React Native** – Cross-platform mobile development  
- **Expo** – Simplified workflow for React Native apps  
- **NativeWind** – Tailwind CSS for styling React Native components  

### Backend (`cartly-server`)
- **Node.js** – Server-side runtime  
- **Express.js** – Backend framework for APIs  
- **MongoDB** – NoSQL database for storing product lists and user data  

---

## Installation

### Frontend (`cartly-app`)

1. Clone the repository:  
   ```bash
   git clone https://github.com/PavishK/Cartly.git
````

2. Navigate to the frontend folder:

   ```bash
   cd cartly-app
   ```
3. Install dependencies:

   ```bash
   npm install
   ```
4. Create a `.env` file with the server URL:

   ```env
   EXPO_PUBLIC_SERVER_URL="http://localhost:8080"
   ```
5. Start the app:

   ```bash
   npx expo start
   ```

### Backend (`cartly-server`)

1. Navigate to the backend folder:

   ```bash
   cd cartly-server
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file with your credentials:

   ```env
   MONGODB_URI="your-mongodb-uri"
   PORT=8080
   AUTH_SECRET="your-auth-secret"
   GEMINI_API_KEY="your-gemini-api-key"
   ```
4. Start the server:

   ```bash
   npm start
   ```

---

## Usage

1. Open the Cartly app on your device/emulator.
2. Add products to your to-do list.
3. Predict prices using GRMini AI feature.
4. View the total cost of your products list.
5. Edit or remove products as needed.

---

## Screenshots
## Screenshots

![Home Screen](https://github.com/user-attachments/assets/fd8fbe9f-8c7b-4116-9738-afe82daa9ba1)

![Add Product Screen](https://github.com/user-attachments/assets/4d33c499-f54f-4fef-9c30-860343acb939)

![Total Cost Screen](https://github.com/user-attachments/assets/32a73734-23a5-4696-872d-818614af86b4)

---

## License

This project is licensed under the **MY License**.

---

## Contact

**Portfolio:** [pavishk.dev](https://pavishk.dev)

```
