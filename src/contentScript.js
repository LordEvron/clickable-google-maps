/**
 * This script enhances webpages with embedded map elements.
 * When users click on these maps, they are redirected to Google Maps with a search query derived
 * from the current page's URL ("q" query parameter). It dynamically identifies relevant map
 * elements using specified CSS selectors and ensures a smooth redirection experience.
 */


    // CSS selectors for identifying map elements.
const mapSelectors = [
        "#lu_map", // Original static map container
        "#dimg_1", // Original static map image
        ".BOZmjd.t7AnBb.Q6cQSe", // The main container for the interactive map
    ];

/**
 * Extracts the value of a specific query parameter from a URL.
 * @param {string} url - The URL to parse.
 * @param {string} paramName - The name of the query parameter.
 * @returns {string|null} The value of the query parameter, or null if not found.
 */
const getQueryParamValue = (url, paramName) => {
    const queryParams = new URL(url).searchParams;
    return queryParams.get(paramName);
};

/**
 * Generates a Google Maps search link for a given query.
 * @param {string} query - The search query.
 * @returns {string} A fully encoded Google Maps search URL.
 */
const generateGoogleMapsLink = (query) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

/**
 * --- EVENT LISTENER FOR PAGE LOAD ---
 * This code executes when the entire page has finished loading.
 */
window.addEventListener("load", () => {

    try {
        // Extract the "q" query parameter from the current page's URL.
        const currentUrl = window.location.href;
        const searchTerm = getQueryParamValue(currentUrl, "q");

        if (!searchTerm) {
            console.warn("No search term ('q' parameter) found in the URL.");
            return; // No query to process, exit early.
        }

        const googleMapsLink = generateGoogleMapsLink(searchTerm);

        /**
         * Redirects to Google Maps when a map element is clicked.
         * @param {Event} event - The click event.
         */
        const redirectToMaps = (event) => {
            event.preventDefault();
            window.open(googleMapsLink, "_blank");
        };


        /**
         * Attaches click listeners to all elements matching the map selectors.
         * This function is called initially and can be called again if the map elements are reloaded.
         */
        const attachMapListeners = () => {
            const mapElements = document.querySelectorAll(mapSelectors.join(", "));
            // console.log("Found map elements:", mapElements);  // DEBUG
            mapElements.forEach((mapElement) => {
                // Avoid attaching multiple listeners to the same element
                mapElement.removeEventListener("click", redirectToMaps);
                mapElement.addEventListener("click", redirectToMaps);
                // we can set cursor to indicate it's clickable
                mapElement.style.cursor = "pointer";
                // console.log("Attached listener to:", mapElement); // DEBUG
            });
        };

        // Initial attachment of listeners
        attachMapListeners();

        // Mutation Observer to detect changes in the DOM, specifically for map elements.
        const observer = new MutationObserver((mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList' || mutation.type === 'subtree') {
                    // Re-attach listeners if new map elements are added or existing ones are modified
                    attachMapListeners();
                }
            }
        });

        // Observe the body for changes, including added/removed nodes and subtree changes.
        observer.observe(document.body, {childList: true, subtree: true});

    } catch (error) {
        console.error(
            "An error occurred while setting up map redirection:",
            error.message,
            error
        );
    }
});
