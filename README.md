# Amazon Filter by Reviews Count

A lightweight Chrome/Edge extension that hides Amazon products with too few customer reviews.  
Useful when you're sorting by "Average Customer Review" and want to filter out 5-star products with only 1–2 suspicious reviews.

---

## 🧩 Features

- Automatically hides low-review products on Amazon search result pages
- User-configurable minimum review count (set via popup)
- Works on all `amazon.com` pages
- Simple, privacy-friendly: no data collection, no tracking

---

## 📦 Installation (For Developers)

1. Clone or download this repository
2. Open `chrome://extensions` (or `edge://extensions`)
3. Enable **Developer Mode**
4. Click **Load unpacked**
5. Select the folder containing the following files:
   - `manifest.json`
   - `content.js`
   - `popup.html`
   - `popup.js`
   - Icon files

---

## ⚙️ Usage

1. Navigate to an Amazon search result page
2. Click the extension icon in your toolbar
3. Set the minimum number of reviews to keep
4. Products below this number will be hidden automatically

---

## 🛡 Permissions

- `storage`: Used to store your preferred minimum review count locally
- `host_permissions` for `*.amazon.com`: Required to read and modify Amazon search results

---

## 🔒 Privacy

This extension does **not**:
- Collect any personal data
- Track your activity
- Send data to any server

All filtering is done locally in your browser.

---

## 📤 Publish

To package the extension for the Chrome Web Store or Microsoft Edge Add-ons:
- Ensure the `manifest.json` is valid
- Zip the contents of the extension folder (not the folder itself)
- Submit via the appropriate dev dashboard

---

## ☕ Support

If you found this extension useful, consider buying me a coffee:

[https://ko-fi.com/M4M31F5502](https://ko-fi.com/M4M31F5502)

---

## 📄 License

Apache 2.0
