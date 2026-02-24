
A web application designed to document travel experiences with a focus on visual storytelling and data persistence.

## 🎨 Design Philosophy


* **Typography:** Inter (for high legibility).
* **Palette:** Earthy greens (`#4A5D4E`) and organic tones to reflect sustainability.
* **UI/UX:** Responsive card-based layout with full-bleed imagery and vertical image stacking.

## 🚀 Technical Features

* **Smart Concatenation:** An "Append-only" edit feature that allows adding new memories to existing posts without overwriting historical data.
* **Data Persistence:** Uses a JSON-based flat-file database system to store post metadata and image paths.
* **Image Processing:** Integrated with **Multer** for multi-part form data and automated file naming using Unix timestamps.
* **RESTful CRUD:** Full Create, Read, Update, and Delete functionality built with Express.js.

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Frontend:** EJS (Embedded JavaScript Templates), CSS3 (Flexbox/Grid)
* **Middleware:** Multer (File Upload Management)
* **Data Storage:** JSON (Local Persistence)

## 📦 Installation & Setup

To run this project locally:

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

```


2. **Install dependencies:**
```bash
npm install

```


3. **Start the server:**
```bash
node index.js

```


4. **Access in browser:**
`http://localhost:3000`

