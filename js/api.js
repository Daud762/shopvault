// api.js
const API_URL = 'https://fakestoreapi.com/products';

/**
 * Fetches products from the Fake Store API
 * @returns {Promise<Array>} Array of product objects
 */
export async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('API Error:', error);
        throw error; // Re-throw to be handled by the caller
    }
}