// details.js
import { animateCards } from './animation.js';

/**
 * Opens the Product Details Modal and populates it with data
 * @param {Object} product - The product object
 */
export function openProductDetails(product) {
    // Check if modal container exists, if not, inject it
    let modalContainer = document.getElementById('modal-container');
    if (!modalContainer.innerHTML) {
        // Lazy load the details template
        fetch('components/details.html')
            .then(res => res.text())
            .then(html => {
                modalContainer.innerHTML = html;
                populateModal(product);
                showModal();
            });
    } else {
        populateModal(product);
        showModal();
    }
}

function populateModal(product) {
    document.getElementById('detailsImage').src = product.image;
    document.getElementById('detailsImage').alt = product.title;
    document.getElementById('detailsCategory').textContent = product.category.toUpperCase();
    document.getElementById('detailsTitle').textContent = product.title;
    document.getElementById('detailsPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('detailsDesc').textContent = product.description;
    
    // Generate Stars
    const rating = Math.round(product.rating.rate * 2) / 2;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) starsHTML += `<i class="fas fa-star star-filled"></i>`;
        else if (i === fullStars && hasHalfStar) starsHTML += `<i class="fas fa-star-half-alt star-filled"></i>`;
        else starsHTML += `<i class="far fa-star star-empty"></i>`;
    }
    document.getElementById('detailsRating').innerHTML = starsHTML + `<span class="ms-2 text-muted">(${product.rating.count} reviews)</span>`;
}

function showModal() {
    const modal = new bootstrap.Modal(document.getElementById('productDetailsModal'));
    modal.show();
}