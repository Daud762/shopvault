// search.js
let searchQuery = '';

/**
 * Initializes the search functionality
 * @param {HTMLInputElement} inputElement - The search input field
 * @param {Function} callback - Function to call when search updates
 */
export function initSearch(inputElement, callback) {
    inputElement.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        callback(searchQuery);
    });
}

/**
 * Filters an array of products based on the search query
 * @param {Array} products - Array of product objects
 * @returns {Array} Filtered array
 */
export function filterProductsBySearch(products) {
    if (!searchQuery) return products;
    
    return products.filter(product => 
        product.title.toLowerCase().includes(searchQuery)
    );
}

/**
 * Gets the current search query
 * @returns {string}
 */
export function getSearchQuery() {
    return searchQuery;
}

/**
 * Clears the search input
 * @param {HTMLInputElement} inputElement
 */
export function clearSearch(inputElement) {
    searchQuery = '';
    inputElement.value = '';
}