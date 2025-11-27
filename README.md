# 🛒 Cartly

**Cartly** is a mobile application that helps users manage a to-do list of products, predict their prices, and calculate the total cost using **AI-powered predictions (GRMini)**. It simplifies shopping and budgeting with an intelligent, interactive experience.

---

## ✨ Features

* 🧾 **Smart product list:** Add, edit, and remove products easily.
* 🤖 **AI-powered price prediction:** Estimate prices using the **GRMini** model.
* 💰 **Automatic total cost calculation:** Get instant total cost updates.
* 📱 **Beautiful UI:** Built with **React Native** and **NativeWind** for a smooth, responsive experience.

---

## 📦 Download

📲 **[Download Cartly APK (v1.0 – 130 MB)](https://expo.dev/artifacts/eas/3n6zGdQkctxvMPXCc42d6F.apk)**

> Click the link above to install the latest version of the Cartly app on your Android device.

---

## 📂 Folder Structure

```
Cartly/
├── cartly-app/      # Frontend (React Native + Expo + NativeWind)
└── cartly-server/   # Backend (Node.js + Express + MongoDB)
```

---

## 🧠 Tech Stack

### Frontend (`cartly-app`)

* ⚛️ **React Native** – Cross-platform mobile development
* 🚀 **Expo** – Streamlined React Native workflow
* 🎨 **NativeWind** – Tailwind CSS for React Native components

### Backend (`cartly-server`)

* 🟩 **Node.js** – Server-side JavaScript runtime
* 🧩 **Express.js** – API framework for Node.js
* 🍃 **MongoDB** – NoSQL database for products and user data

---

## ⚙️ Installation

### Frontend (`cartly-app`)

```bash
git clone https://github.com/PavishK/Cartly.git
cd cartly-app
npm install
```

Create a `.env` file:

```env
EXPO_PUBLIC_SERVER_URL="http://localhost:8080"
```

Run the app:

```bash
npx expo start
```

---

### Backend (`cartly-server`)

```bash
cd cartly-server
npm install
```

Create a `.env` file:

```env
MONGODB_URI="your-mongodb-uri"
PORT=8080
AUTH_SECRET="your-auth-secret"
GEMINI_API_KEY="your-gemini-api-key"
```

Start the server:

```bash
npm start
```

---

## 🚀 Usage

1. Launch the Cartly app on your Android device.
2. Add products to your shopping list.
3. Use the **GRMini AI** feature to predict prices.
4. Instantly view the **total estimated cost**.
5. Edit or remove products anytime.

---

## 🖼️ Screenshots

| Home Screen                                                                                     | Add Product                                                                                            | Total Cost                                                                                            |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| ![Home Screen](https://github.com/user-attachments/assets/fd8fbe9f-8c7b-4116-9738-afe82daa9ba1) | ![Add Product Screen](https://github.com/user-attachments/assets/4d33c499-f54f-4fef-9c30-860343acb939) | ![Total Cost Screen](https://github.com/user-attachments/assets/32a73734-23a5-4696-872d-818614af86b4) | [ IOS Screen ](https://github.com/user-attachments/assets/2f3f4b4f-8ea3-4385-bbc2-5bb1dd05aba0) |


---

## 📜 License

This project is licensed under the **MY License**.

---

## 💬 Contact

📧 **Portfolio:** [pavishk.dev](https://pavishk.dev)
