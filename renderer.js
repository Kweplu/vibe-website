// Initialize Lucide icons
lucide.createIcons();

const products = [
    { id: 1,  name: "Luxury Dress Watch", category: "accessories", price: 450.00, image: "product-4.png" },
    { id: 2,  name: "Classic Fedora",  category: "hats",  price: 85.00,  image: "product-1.png" },
    { id: 3,  name: "Urban Denim",     category: "jeans", price: 120.00, image: "product-3.png" },
    { id: 4,  name: "Designer Wallet",  category: "accessories", price: 135.00, image: "product-6.png" },
    { id: 5,  name: "Leather Duffel",    category: "bags",  price: 210.00, image: "product-2.png" },
    { id: 6,  name: "Chelsea Boots",   category: "shoes",  price: 150.00, image: "product-5.png" },
    { id: 7,  name: "Authentic Blue Jeans", category: "jeans", price: 90.00, image: "product-7.png" },
    { id: 8,  name: "Premium Black Tee",    category: "apparel", price: 45.00, image: "product-8.png" },
    { id: 9,  name: "White Sneakers",       category: "shoes", price: 110.00, image: "product-9.png" },
    { id: 10, name: "Leather Work Boots",   category: "shoes", price: 195.00, image: "product-10.png" },
    { id: 11, name: "Pro Baseball Cap",     category: "hats", price: 35.00, image: "product-11.png" },
    { id: 12, name: "Essential White Tee",  category: "apparel", price: 40.00, image: "product-12.png" }
];

let favorites = JSON.parse(localStorage.getItem('vibe-favorites')) || [];

const productGrid = document.getElementById('product-grid');
const favoritesCount = document.getElementById('favorites-count');
const favoritesList = document.getElementById('favorites-list');
const favoritesPanel = document.getElementById('favorites-panel');
const panelOverlay = document.getElementById('panel-overlay');

// Cart State
let cart = JSON.parse(localStorage.getItem('vibe-cart')) || [];
const cartPanel = document.getElementById('cart-panel');
const cartList = document.getElementById('cart-list');
const cartCountEl = document.getElementById('cart-count');
const cartFooter = document.getElementById('cart-footer');
const cartTotalEl = document.getElementById('cart-total-price');


// Render products
function renderProducts(filter = 'all') {
    productGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
    
    filteredProducts.forEach(product => {
        const isFav = favorites.includes(product.id);
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${product.image}" alt="${product.name}" class="card-img" onerror="this.onerror=null; this.src='https://via.placeholder.com/400x500/2a2a30/ffffff?text=${encodeURIComponent(product.name)}'">
                <button class="fav-icon-btn" data-id="${product.id}" title="Toggle Favorite">
                    <i data-lucide="heart" fill="${isFav ? '#ff2a5f' : 'none'}" color="${isFav ? '#ff2a5f' : 'white'}"></i>
                </button>
            </div>
            <div class="card-info">
                <div class="card-category">${product.category}</div>
                <h3 class="card-title">${product.name}</h3>
                <p style="font-size:0.8rem;color:rgba(255,255,255,0.45);margin-bottom:0.5rem;">${product.desc || ''}</p>
                <div class="card-price-row">
                    <div class="card-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" data-id="${product.id}" title="Add to Market">
                        <i data-lucide="shopping-bag"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Only the image area opens the modal
        const imgWrapper = card.querySelector('.card-img-wrapper');
        imgWrapper.style.cursor = 'zoom-in';
        imgWrapper.addEventListener('click', (e) => {
            e.stopPropagation();
            openProductModal(product);
        });

        productGrid.appendChild(card);
    });

    // Re-initialize icons for new elements
    lucide.createIcons();
    
    // Attach event listeners to favorite buttons
    document.querySelectorAll('.fav-icon-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(parseInt(btn.getAttribute('data-id')));
        });
    });

    // Attach event listeners to Add to Market buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(parseInt(btn.getAttribute('data-id')));
        });
    });

    // Initialize scrolling animations for newly rendered elements
    if (typeof initScrollAnimations === 'function') {
        initScrollAnimations();
    }
}

// Global modal elements
const productModal = document.getElementById('product-modal');
const modalImg = document.getElementById('modal-img');
const closeModalBtn = document.getElementById('close-modal');

// Open Modal function
function openProductModal(product) {
    console.log("Opening modal for:", product.name);
    modalImg.src = product.image;
    modalImg.alt = product.name; // Fixing the alt text dynamically
    
    productModal.classList.add('active');
    console.log("Modal classes:", productModal.className);
}

// Close Modal logic
function closeProductModal() {
    productModal.classList.remove('active');
}

closeModalBtn.addEventListener('click', closeProductModal);

// Close modal when clicking outside content (on the dark background)
productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
        closeProductModal();
    }
});

// Toggle favorite
function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem('vibe-favorites', JSON.stringify(favorites));

    // Update the button's visual state in-place (no full re-render needed)
    const isNowFav = favorites.includes(id);
    document.querySelectorAll(`.fav-icon-btn[data-id="${id}"]`).forEach(btn => {
        const icon = btn.querySelector('svg') || btn.querySelector('i');
        if (icon) {
            icon.setAttribute('fill', isNowFav ? '#ff2a5f' : 'none');
            icon.setAttribute('color', isNowFav ? '#ff2a5f' : 'white');
            icon.setAttribute('stroke', isNowFav ? '#ff2a5f' : 'white');
        }
    });

    updateFavoritesUI();
}

// Update favorites UI
function updateFavoritesUI() {
    favoritesCount.textContent = favorites.length;
    
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<div class="empty-state">No favorites yet.</div>';
        return;
    }
    
    favoritesList.innerHTML = '';
    favorites.forEach(id => {
        const product = products.find(p => p.id === id);
        if(!product) return;
        
        const item = document.createElement('div');
        item.className = 'fav-item';
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="fav-item-img" onerror="this.onerror=null; this.src='https://via.placeholder.com/60x75/2a2a30/ffffff?text=Img'">
            <div class="fav-item-info">
                <div class="fav-item-title">${product.name}</div>
                <div class="fav-item-price">$${product.price.toFixed(2)}</div>
            </div>
            <button class="remove-fav-btn" data-id="${product.id}">
                <i data-lucide="trash-2"></i>
            </button>
        `;
        favoritesList.appendChild(item);
    });
    
    lucide.createIcons();
    
    document.querySelectorAll('.remove-fav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            toggleFavorite(parseInt(btn.getAttribute('data-id')));
        });
    });
}

// Filtering
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderProducts(e.target.getAttribute('data-filter'));
    });
});

// Panel toggle
document.getElementById('favorites-toggle').addEventListener('click', () => {
    favoritesPanel.classList.add('open');
    panelOverlay.classList.add('active');
});

document.getElementById('close-favorites').addEventListener('click', () => {
    favoritesPanel.classList.remove('open');
    panelOverlay.classList.remove('active');
});

// Cart panel toggle
document.getElementById('cart-toggle').addEventListener('click', () => {
    cartPanel.classList.add('open');
    panelOverlay.classList.add('active');
});

document.getElementById('close-cart').addEventListener('click', () => {
    cartPanel.classList.remove('open');
    panelOverlay.classList.remove('active');
});

panelOverlay.addEventListener('click', () => {
    favoritesPanel.classList.remove('open');
    cartPanel.classList.remove('open');
    panelOverlay.classList.remove('active');
});

// Add to Cart logic
function addToCart(id) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id, qty: 1 });
    }
    localStorage.setItem('vibe-cart', JSON.stringify(cart));
    updateCartUI();

    // Open the cart panel briefly to show feedback
    cartPanel.classList.add('open');
    panelOverlay.classList.add('active');
}

function updateCartUI() {
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountEl.textContent = total;

    if (cart.length === 0) {
        cartList.innerHTML = '<div class="empty-state">Your market is empty.</div>';
        cartFooter.style.display = 'none';
        return;
    }

    cartFooter.style.display = 'block';
    cartList.innerHTML = '';

    let grandTotal = 0;
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;
        grandTotal += product.price * item.qty;

        const el = document.createElement('div');
        el.className = 'fav-item';
        el.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="fav-item-img" onerror="this.onerror=null; this.src='https://via.placeholder.com/60x75/2a2a30/ffffff?text=Img'">
            <div class="fav-item-info">
                <div class="fav-item-title">${product.name}</div>
                <div class="cart-qty-row">
                    <button class="qty-btn" data-id="${product.id}" data-action="dec">−</button>
                    <span class="qty-label">${item.qty}</span>
                    <button class="qty-btn" data-id="${product.id}" data-action="inc">+</button>
                </div>
                <div class="fav-item-price">$${(product.price * item.qty).toFixed(2)}</div>
            </div>
            <button class="remove-fav-btn remove-cart-item" data-id="${product.id}">
                <i data-lucide="trash-2"></i>
            </button>
        `;
        cartList.appendChild(el);
    });

    cartTotalEl.textContent = '$' + grandTotal.toFixed(2);
    lucide.createIcons();

    document.querySelectorAll('.remove-cart-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            cart = cart.filter(i => i.id !== id);
            localStorage.setItem('vibe-cart', JSON.stringify(cart));
            updateCartUI();
        });
    });

    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            const action = btn.getAttribute('data-action');
            const item = cart.find(i => i.id === id);
            if (!item) return;
            if (action === 'inc') {
                item.qty++;
            } else {
                item.qty--;
                if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
            }
            localStorage.setItem('vibe-cart', JSON.stringify(cart));
            updateCartUI();
        });
    });
}

// Initial render
renderProducts();
updateFavoritesUI();
updateCartUI(); // sync cart count from localStorage on page load

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

let scrollTriggers = [];

function initScrollAnimations() {
    // Kill existing triggers to prevent duplicates on re-render
    scrollTriggers.forEach(t => t.kill());
    scrollTriggers = [];

    // Animate the products section container itself
    const productsSection = document.querySelector('.products-section');
    if (productsSection) {
        const trigger = ScrollTrigger.create({
            trigger: productsSection,
            start: "top 80%",
            animation: gsap.from(productsSection, {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            }),
            toggleActions: "play none none none" // Only play once when scrolling down
        });
        scrollTriggers.push(trigger);
    }

    // Animate the title words one by one
    const titleWords = gsap.utils.toArray('.featured-title .word');
    if (titleWords.length > 0) {
        const trigger = ScrollTrigger.create({
            trigger: productsSection,
            start: "top 70%",
            animation: gsap.from(titleWords, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.3, // Word by word stagger
                ease: "back.out(1.7)"
            }),
            toggleActions: "play none none reverse"
        });
        scrollTriggers.push(trigger);
    }

    // Animate product cards staggering in exactly 0.5s apart as requested
    const productCards = gsap.utils.toArray('.product-card');
    if (productCards.length > 0) {
        const trigger = ScrollTrigger.create({
            trigger: '.product-grid',
            start: "top 80%", 
            animation: gsap.from(productCards, {
                y: 80,
                opacity: 0,
                duration: 0.8,
                stagger: 0.5, // The requested 0.5s stagger between cards
                ease: "power2.out"
            }),
            toggleActions: "play none none reverse"
        });
        scrollTriggers.push(trigger);
    }

    // Animate contact cards and map
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        const trigger = ScrollTrigger.create({
            trigger: contactSection,
            start: "top 80%",
            animation: gsap.from(".contact-card, .map-container", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.3,
                ease: "power3.out"
            }),
            toggleActions: "play none none reverse"
        });
        scrollTriggers.push(trigger);
    }
}
