// filter.js
let selectedCategory = 'all';

/**
 * Initializes the category filter
 * @param {HTMLSelectElement} selectElement - The dropdown element
 * @param {Function} callback - Function to call when filter updates
 */
export function initFilter(selectElement, callback) {
    selectElement.addEventListener('change', (e) => {
        selectedCategory = e.target.value;
        callback(selectedCategory);
    });
}

/**
 * Filters products by category
 * @param {Array} products - Array of product objects
 * @returns {Array} Filtered array
 */
export function filterProductsByCategory(products) {
    if (selectedCategory === 'all') return products;
    
    // Map dropdown values to API category values
    const categoryMap = {
        'electronics': 'electronics',
        'jewelery': 'jewelery',
        "men's clothing": "men's clothing",
        "women's clothing": "women's clothing"
    };
    
    const apiCategory = categoryMap[selectedCategory];
    return products.filter(product => product.category === apiCategory);
}

/**
 * Gets the current selected category
 * @returns {string}
 */
export function getSelectedCategory() {
    return selectedCategory;
}