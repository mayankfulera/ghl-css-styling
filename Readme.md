# 📌 Dashboard Styling - Token-Based CSS Loader

This project allows users to securely load CSS styles dynamically based on **token key authentication**.  
Each token is linked to a **company name** and a **CSS file** stored in the `styles/` folder.  

<br/>

# Documentation

## **🚀 Mapper file - `key-to-stylefile-map.json`**
The `key-to-stylefile-map.json` file stores the mapping between:
- A **unique key** (used for authentication)
- A **company name** (for reference)
- The **CSS filename** (to load the corresponding styling)

### **🔹 Example JSON Structure (`key-to-stylefile-map.json`)**
```json
{
  "data": {
    "9f8a4b3e2d1c5f6a7e8b9c0d4e3f1a2b": {
      "company": "ABC Test",
      "filename": "style1"
    },
    "abcd1234efgh5678ijkl9101mnopqrstu": {
      "company": "XYZ Corp",
      "filename": "style2"
    }
  }
}
```
<br/>


## 🛠️ How to Add a New Token

1. **Open the `key-to-stylefile-map.json` file** in any text editor.
2. **Add a new entry** under `"data"`, using a **random token key** as the key.
3. **Specify the company name** and the **CSS filename** (without the `.css` extension).
4. **Save the file and commit the changes.**

### ✅ Example: Adding a New Token
Adding a new company `"Tech Innovators"` with `style3.css`:

```json
{
  "data": {
    "9876543210abcdef1234567890abcdef": {
      "company": "Tech Innovators",
      "filename": "style3"
    }
  }
}
```

<br/>

## 📤 Uploading a CSS File

1. **Create a CSS file** (e.g., `style3.css`).
2. **Save it inside the `styles/` folder**.
3. **Ensure the filename matches the one specified in `key-to-stylefile-map.json`**.
4. **Save the file and commit the changes.**

<br/>

## 🌍 How to Load the CSS in HTML

Users can include the **JavaScript-based dynamic CSS loader** by adding:

1. Directly through Javascript script tag:
```html
<head>
<script src="https://your-server.com/load-css.js?token=9f8a4b3e2d1c5f6a7e8b9c0d4e3f1a2b"></script>
</head>
```

2. Indirectly through Javascript logic
```js
const script = document.createElement("script");
script.src = "https://ghl-css-styling.onrender.com/load-css.js?token=token123";
document.head.appendChild(script);
```

