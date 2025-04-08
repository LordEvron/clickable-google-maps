# Clickable Google Maps

## Overview

Thanks to EU regulations, google removed th "View on Google Maps" button. This extension provides a workaround by making the map elements themselves clickable links to Google Maps using the page's search query and making embedded map elements clickable. When a user clicks on a recognized map element, they are redirected to Google Maps with a search query derived from the current page's URL (specifically, the value of the "q" query parameter). This provides a convenient way to quickly view the location or search term associated with an embedded map in Google Maps.

## Installation

### For Personal Use (Developer Mode - Recommended)

1.  Download or create the extension files:
    * `manifest.json` (the extension's blueprint)
    * `content.js` (the JavaScript code to make maps clickable)
2.  Open your browser's extensions management page:
    * **Chrome/Edge:** Go to `chrome://extensions/` or `edge://extensions/`.
    * **Firefox:** Go to `about:debugging#/runtime/this-firefox`.
3.  Enable "Developer mode" (usually a toggle switch).
4.  Click "Load unpacked" (Chrome/Edge) or "Load Temporary Add-on..." (Firefox).
5.  Select the folder containing your extension files.


## How to Use

Once the extension is installed and enabled:

1.  Navigate to any webpage that contains embedded map elements.
2.  Ensure the page's URL has a query parameter named "q" with a relevant search term or address. For example: `https://google.com/search?q=Eiffel+Tower+Paris`.
3.  The extension will automatically identify map elements on the page (based on predefined CSS selectors).
4.  When you click on a recognized map element, a new tab will open in your browser, redirecting you to Google Maps with the value of the "q" parameter as the search query.

## Technical Details

The extension works by:

1.  **Injecting a content script (`content.js`)** into google search page.
2.  **Extracting the value of the "q" query parameter** from the current page's URL.
3.  **Defining CSS selectors** to identify potential map elements on the page (currently targeting `#lu_map`, `#dimg_1`, and `.BOZmjd.t7AnBb.Q6cQSe`).
4.  **Attaching a click event listener** to all matching map elements.
5.  **Using a Mutation Observer** to detect dynamically loaded or updated map elements on the page (especially after actions like searching within the page). When new map elements are detected, the click listeners are re-attached.
6.  When a map element is clicked, the script **prevents the default click behavior** and **opens a new tab** with a Google Maps search URL constructed using the extracted "q" parameter.

## Troubleshooting

* **Extension Not Working:** Ensure the extension is enabled on your browser's extensions management page. Check the Browser Console (usually opened by pressing F12) for any error messages from the extension.
* **Maps Not Clickable:** Verify that the map elements on the page match the CSS selectors defined in the `content.js` file. You can use your browser's Inspector tool to examine the HTML structure.
* **No Redirection:** Ensure the page's URL has a "q" query parameter with a value. The extension relies on this parameter to generate the Google Maps search link.
* **Interference from Ad Blockers:** Some ad blockers might prevent the `window.open()` function from working correctly. Try temporarily disabling your ad blocker to see if it resolves the issue.

## Contributing

If you would like to contribute to this project, feel free to fork the repository and submit a pull request with your enhancements or bug fixes.

## License

MIT License
