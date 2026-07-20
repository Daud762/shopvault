// main.js
import { fetchProducts } from './api.js';
import { initSearch, filterProductsBySearch, clearSearch } from './search.js';
import { initFilter, filterProductsByCategory } from './filter.js';
import { initAnimations, animateCards, animateProductCount } from './animation.js';
import { openProductDetails } from './details.js';

let allProducts = [];

const app = document.getElementById('app');

async function loadComponent(path) {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load ${path}`);
    return await response.text();
}

function renderSkeletons() {
    const container = document.getElementById('productsGrid');
    container.innerHTML = '';
    for (let i = 0; i < 8; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton-card';
        skeleton.innerHTML = `
            <div class="skeleton-image"><div class="shimmer"></div></div>
            <div class="skeleton-text short"></div>
            <div class="skeleton-text long"></div>
            <div class="skeleton-text short" style="width: 40%;"></div>
        `;
        container.appendChild(skeleton);
    }
}

function renderError() {
    document.getElementById('productsGrid').innerHTML = `
        <div class="error-container">
            <div class="error-icon"><i class="fas fa-exclamation-triangle"></i></div>
            <h3 class="error-title">Oops! Something went wrong.</h3>
            <p class="error-desc">We couldn't fetch the products. Please try again.</p>
            <button class="btn-retry" onclick="window.location.reload()">
                <i class="fas fa-sync-alt me-2"></i>Retry
            </button>
        </div>
    `;
}

function renderNoResults() {
    document.getElementById('productsGrid').innerHTML = `
        <div class="no-results-container">
            <div class="no-results-icon"><i class="fas fa-search-minus"></i></div>
            <h4 class="no-results-title">No products found</h4>
            <p class="no-results-desc">Try adjusting your search or filter criteria.</p>
            <button class="btn-clear-search" id="clearSearchBtn">
                <i class="fas fa-times me-2"></i>Clear Search
            </button>
        </div>
    `;
    document.getElementById('clearSearchBtn').addEventListener('click', () => {
        clearSearch(document.getElementById('searchInput'));
        applyFilters();
    });
}

function renderProducts(products) {
    const container = document.getElementById('productsGrid');
    container.innerHTML = '';
    
    if (products.length === 0) {
        renderNoResults();
        return;
    }
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const rating = Math.round(product.rating.rate * 2) / 2;
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let starsHTML = '';
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) starsHTML += `<i class="fas fa-star star-filled"></i>`;
            else if (i === fullStars && hasHalfStar) starsHTML += `<i class="fas fa-star-half-alt star-filled"></i>`;
            else starsHTML += `<i class="far fa-star star-empty"></i>`;
        }
        
        card.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
            </div>
            <div class="product-body">
                <div class="product-category">${product.category}</div>
                <h4 class="product-title">${product.title}</h4>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-rating">
                    ${starsHTML}
                    <span class="rating-text">(${product.rating.count})</span>
                </div>
                <button class="btn-details view-details-btn" data-id="${product.id}">
                    <i class="fas fa-eye me-2"></i>View Details
                </button>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    // Hook up Details Buttons
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            const product = allProducts.find(p => p.id === id);
            if (product) openProductDetails(product);
        });
    });
    
    animateCards(container);
}

function applyFilters() {
    let results = [...allProducts];
    results = filterProductsBySearch(results);
    results = filterProductsByCategory(results);
    renderProducts(results);
    
    const countEl = document.getElementById('productCount');
    if (countEl) countEl.textContent = results.length;
}

async function initApp() {
    try {
        const [navbarHTML, heroHTML, searchHTML, productsHTML, footerHTML] = await Promise.all([
            loadComponent('components/navbar.html'),
            loadComponent('components/hero.html'),
            loadComponent('components/search.html'),
            loadComponent('components/products.html'),
            loadComponent('components/footer.html')
        ]);
        
        app.innerHTML = `${navbarHTML}${heroHTML}${searchHTML}${productsHTML}${footerHTML}`;
        initAnimations();
        renderSkeletons();
        
        allProducts = await fetchProducts();
        applyFilters();
        
        initSearch(document.getElementById('searchInput'), applyFilters);
        initFilter(document.getElementById('categoryFilter'), applyFilters);
        
        const countEl = document.getElementById('productCount');
        if (countEl) animateProductCount(countEl, allProducts.length);
        
    } catch (error) {
        renderError();
    }
}

document.addEventListener('DOMContentLoaded', initApp);