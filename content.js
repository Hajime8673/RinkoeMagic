// Function to add the custom Save button next to each Bookmark button
function addCustomButtons() {
    // Select all buttons with aria-label="Bookmark"
    const bookmarkButtons = document.querySelectorAll('button[data-testid="bookmark"], button[data-testid="removeBookmark"]');
    console.log(`Found ${bookmarkButtons.length} Bookmark buttons.`);

    if (!bookmarkButtons.length) {
        console.log("No Bookmark buttons found.");
        return;
    }

    // Loop through each Bookmark button and append the custom button
    bookmarkButtons.forEach((bookmarkButton, index) => {

        // Traverse two levels up to find the parent div
        const outerDiv = bookmarkButton.closest('div').parentNode;

        // Ensure the button isn't already added to avoid duplication
        if (outerDiv.querySelector('.custom-save-button')) {
            return; // Skip if button already added
        }

        // Find the parent element that contains the tweet information
        const tweetElement = bookmarkButton.closest('article'); // Adjust the selector as needed
        if (!tweetElement) {
            console.log("No tweet element found.");
            return;
        }

        // Extract the tweet URL (you may need to adjust this selector)
        const tweetLink = tweetElement.querySelector('a[href*="/status/"]');
        const tweetIdMatch = tweetLink ? tweetLink.href.match(/\/status\/(\d+)/) : null;
        const tweetId = tweetIdMatch ? tweetIdMatch[1] : null;

        if (!tweetId) {
            console.log("Tweet ID not found.");
            return;
        }

        // Construct the tweet URL
        const tweetUrl = tweetLink.href;

        console.log(`Tweet URL: ${tweetUrl.split("/photo/")[0]}`);

        // Create the custom Save button
        const customButton = document.createElement('div');
        customButton.classList.add('custom-save-button');
        customButton.style.marginLeft = '10px';
        if (bookmarkButton.ariaLabel && bookmarkButton.ariaLabel.includes(".")) {
            customButton.style.marginTop = '10px';
        }
        customButton.innerHTML = `
            <button style="background-color: #1d9bf0; border: none; color: white; padding: 5px 10px; border-radius: 5px;" class="css-175oi2r r-18u37iz r-1h0z5md r-1wron08">
                + Save
            </button>
        `;

        // Insert the custom button next to the outer div containing the Bookmark button
        outerDiv.appendChild(customButton);

        // Add event listener to the custom button
        customButton.addEventListener('click', () => {
            chrome.runtime.sendMessage({ url: tweetUrl.split("/photo/")[0] });
        });
    });
}

// MutationObserver callback to detect changes in the DOM
const observer = new MutationObserver(() => {
    addCustomButtons();
});

// Observe the entire body for changes (useful for dynamic content loading)
observer.observe(document.body, {
    childList: true,
    subtree: true, // Monitor changes to child elements, not just direct children
});

// Check for the buttons initially after a slight delay
setTimeout(() => {
    addCustomButtons();
}, 1000); // Delays to allow Twitter to load initial content
