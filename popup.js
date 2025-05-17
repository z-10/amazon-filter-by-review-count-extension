const minReviewsInput = document.getElementById('minReviews');
const saveBtn = document.getElementById('saveBtn');
const status = document.getElementById('status');

async function loadSettings() {
  try {
    const result = await chrome.storage.sync.get({ minReviews: 100 });
    minReviewsInput.value = result.minReviews;
  } catch (e) {
    console.error("Failed to load settings:", e);
  }
}

async function saveSettings() {
  const value = parseInt(minReviewsInput.value, 10) || 0;
  try {
    await chrome.storage.sync.set({ minReviews: value });
    status.style.display = 'block';
  } catch (e) {
    console.error("Failed to save settings:", e);
  }
}

// Init on DOM ready to avoid race conditions
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  saveBtn.addEventListener('click', saveSettings);
});