# 🛒 Cartly – Smart Shopping Assistant (Android & iOS*)

**Cartly** is an AI-powered mobile application that helps users manage smart product lists, predict prices using **GRMini AI**, and calculate total shopping costs instantly.

Designed with a **modern UI**, Cartly makes shopping and budgeting easier, faster, and smarter.

---

## 🌟 Key Highlights

- 🤖 AI-powered price prediction  
- 🧾 Smart shopping list management  
- 💰 Real-time total cost calculation  
- 📱 Smooth & responsive UI  
- ⚛️ Built with React Native & Expo  

---

## ✨ Features

- 🧾 **Smart Product List**  
  Add, edit, and delete products easily.

- 🤖 **AI Price Prediction (GRMini)**  
  Get intelligent price estimates using AI.

- 💰 **Auto Cost Calculation**  
  Total amount updates instantly.

- 🎨 **Modern UI/UX**  
  Built using **NativeWind (Tailwind for RN)**.

---

## 📲 Download App (Android)

### ✅ Latest Stable APK

🔗 **Download Cartly APK (v1.0 – 130 MB)**  
👉 https://drive.google.com/file/d/1Zga5VAtbT6xNcvFs4__F74oke69BCteR/view

> ⚠️ Enable **Install from Unknown Sources** before installing.

---

## 🍎 iOS Support – Important Note

Cartly **runs successfully on iOS**, but currently faces a **UI limitation**:

- The app uses **`ToastAndroid`**, which is **Android-only**
- Toast messages **do not render on iOS**
- This causes **missing feedback messages**, not app crashes

🛠️ **Planned Fix**  
Replace `ToastAndroid` with a **cross-platform toast library** (e.g., `react-native-toast-message`).

---

## 🖼️ Screenshots

| Android Home | Add Product | Total Cost | iOS Running (Toast Issue) |
|-------------|------------|------------|----------------------------|
| ![Home](https://github.com/user-attachments/assets/fd8fbe9f-8c7b-4116-9738-afe82daa9ba1) | ![Add](https://github.com/user-attachments/assets/4d33c499-f54f-4fef-9c30-860343acb939) | ![Total](https://github.com/user-attachments/assets/32a73734-23a5-4696-872d-818614af86b4) | ![iOS](https://github.com/user-attachments/assets/37b54e27-d601-4428-be74-2ba5295bb0e0) |

---

## 📂 Project Structure

```

Cartly/
├── cartly-app/      # Frontend (React Native + Expo + NativeWind)
└── cartly-server/   # Backend (Node.js + Express + MongoDB)

````

---

## 🧠 Tech Stack

### 📱 Frontend – `cartly-app`

- ⚛️ React Native  
- 🚀 Expo  
- 🎨 NativeWind (Tailwind CSS)

### 🌐 Backend – `cartly-server`

- 🟩 Node.js  
- 🧩 Express.js  
- 🍃 MongoDB  
- 🤖 Gemini AI  

---

## ⚙️ Installation & Setup

### 🔹 Frontend Setup

```bash
git clone https://github.com/PavishK/Cartly.git
cd cartly-app
npm install
````

Create `.env` file:

```env
EXPO_PUBLIC_SERVER_URL="YOUR_BACKEND_URL"
```

Run app:

```bash
npx expo start
```

---

### 🔹 Backend Setup

```bash
cd cartly-server
npm install
```

Create `.env` file:

```env
MONGODB_URI="YOUR_MONGODB_URI"
PORT=8080
AUTH_SECRET="YOUR_AUTH_SECRET"
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

Start server:

```bash
npm start
```

---

## 🚀 How to Use

1. Open **Cartly** on your device
2. Add products to your shopping list
3. Predict prices using **GRMini AI**
4. View the **total estimated cost**
5. Modify your list anytime

---

## 📱 Platform Support

| Platform   | Status                 |
| ---------- | ---------------------- |
| 🤖 Android | ✅ Fully Supported      |
| 🍎 iOS     | ⚠️ UI Toast Limitation |

---

## 🔐 Security Note

All API keys, database URIs, and secrets are:

* ❌ **Not committed to the repository**
* 🔒 Stored securely in environment variables

---

## 📜 License

Licensed under **MY License**.

---

## 👨‍💻 Author

**Pavish K**

🌐 Portfolio: [https://pavishk.dev](https://pavishk.dev)

---

⭐ If you like this project, consider giving it a **star**!
