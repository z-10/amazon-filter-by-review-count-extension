const MIN_REVIEWS_DEFAULT = 100;

// --- HARD GUARD: Immediately refresh page if invalid context, no spam ---
function isExtensionContextValid() {
    return (typeof chrome !== 'undefined' &&
        chrome.storage &&
        chrome.runtime &&
        chrome.runtime.id);
}

if (!isExtensionContextValid()) {
    window.location.reload();
}

// --- NORMAL SCRIPT STARTS HERE ---

function parseReviewsText(rawText) {
    rawText = rawText.replace(/[()]/g, '').trim().toUpperCase();
    let multiplier = 1;
    if (rawText.endsWith('K')) {
        multiplier = 1000;
        rawText = rawText.replace('K', '');
    } else if (rawText.endsWith('M')) {
        multiplier = 1000000;
        rawText = rawText.replace('M', '');
    }
    const number = parseFloat(rawText.replace(/,/g, ''));
    if (isNaN(number)) return null;
    return Math.round(number * multiplier);
}

function extractReviews(product) {
    const starsElement = product.querySelector('.a-icon-alt');
    if (!starsElement) return null;

    const reviewsElement = product.querySelector('span.s-underline-text');
    if (!reviewsElement) return 0;

    const reviewsText = reviewsElement.textContent.trim();
    const reviews = parseReviewsText(reviewsText);

    if (reviews === null) return null;
    return reviews;
}

function hideLowReviewProducts(minReviews) {
    const products = document.querySelectorAll('[data-component-type="s-search-result"]');
    products.forEach(product => {
        if (product.dataset.processed === "true") return;

        const reviews = extractReviews(product);
        if (reviews !== null && reviews < minReviews) {
            product.style.display = 'none';
        }

        product.dataset.processed = "true";
    });
}

async function getSettingsSafe() {
    return new Promise((resolve) => {
        try {
            chrome.storage.sync.get({ minReviews: MIN_REVIEWS_DEFAULT }, (result) => {
                if (chrome.runtime.lastError) {
                    resolve({ minReviews: MIN_REVIEWS_DEFAULT });
                } else {
                    resolve(result);
                }
            });
        } catch (e) {
            resolve({ minReviews: MIN_REVIEWS_DEFAULT });
        }
    });
}

async function runFilterWithSettings() {
    if (!isExtensionContextValid()) {
        window.location.reload();
        return;
    }

    try {
        const result = await getSettingsSafe();
        hideLowReviewProducts(result.minReviews);
    } catch (e) {
        // Only log unexpected internal errors
        console.error("Unexpected error during runFilterWithSettings:", e);
        hideLowReviewProducts(MIN_REVIEWS_DEFAULT);
    }
}

function setupObserver() {
    try {
        const observer = new MutationObserver(() => {
            if (!isExtensionContextValid()) {
                window.location.reload();
                return;
            }
            runFilterWithSettings();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    } catch (e) {
        console.error("Observer setup failed unexpectedly:", e);
    }
}

function init() {
    if (!isExtensionContextValid()) {
        window.location.reload();
        return;
    }

    try {
        runFilterWithSettings();
        setupObserver();
    } catch (e) {
        console.error("Initialization failed unexpectedly:", e);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}