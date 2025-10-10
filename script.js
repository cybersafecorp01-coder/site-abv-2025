// Premium Auction Static Site - JavaScript
// All functionality from React components converted to vanilla JS

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function () {
    lucide.createIcons();

    // Initialize all components
    initializeHeader();
    initializeCarousel();
    initializeAuctionProducts();
    initializeBidModal();
    initializeToast();
    initializeAnimations();
});

// Header functionality
function initializeHeader() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Close mobile menu if open
            if (mobileMenu.style.display === 'block') {
                mobileMenu.style.display = 'none';
            }
        });
    });

    // Header background on scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.style.background = 'linear-gradient(135deg, hsl(207, 63%, 16%, 0.95), hsl(207, 40%, 25%, 0.95))';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, hsl(207, 63%, 16%), hsl(207, 40%, 25%))';
            header.style.backdropFilter = 'none';
        }
    });
}

// Carousel functionality
function initializeCarousel() {
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');

    if (!carousel || !prevBtn || !nextBtn) return;

    let scrollAmount = 0;
    const scrollStep = 320; // Item width + gap

    prevBtn.addEventListener('click', function () {
        scrollAmount = Math.max(0, scrollAmount - scrollStep);
        carousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', function () {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        scrollAmount = Math.min(maxScroll, scrollAmount + scrollStep);
        carousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    carousel.addEventListener('scroll', function () {
        scrollAmount = carousel.scrollLeft;
    });
}

// Auction Products functionality
function initializeAuctionProducts() {
    const products = [
        {
            id: 1,
            title: 'PORSCHE CAYENNE V6 3.6 V6 2012/2013',
            currentBid: 80400,
            image: './img/carro-1.jpg',
            endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            bids: 23,
            category: 'Carros'
        },
        {
            id: 2,
            title: 'RENAULT MASTER FURGAO 11M3 - L2H2 2.5 16V DCI 2012/2013',
            currentBid: 48100,
            image: './img/carro-2.jpg',
            endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
            bids: 8,
            category: 'Carros'
        },
        {
            id: 3,
            title: 'MERCEES BENZ CLASSE GLB 200 1.3 16V TURBO 2021/2021',
            currentBid: 110700,
            image: './img/carro-3.jpg',
            endTime: new Date(Date.now() + 12 * 60 * 60 * 1000),
            bids: 15,
            category: 'Carros'
        },
        {
            id: 4,
            title: 'KIA SOUL EX 1.6 16V 2011/2012',
            currentBid: 17600,
            image: './img/carro-4.jpg',
            endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            bids: 5,
            category: 'Carros'
        },
        {
            id: 5,
            title: 'VOLKSWAGEN AMAROK TRENDLINE 4MOTION 2.0 TDI BITURBO 2013/2014',
            currentBid: 39700,
            image: './img/carro-5.jpg',
            endTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
            bids: 32,
            category: 'Tecnologia'
        },
        {
            id: 6,
            title: 'VOLKSWAGEN AMAROK HIGHLINE 4MOTION 2.0 TDI BITURBO 2013/2013',
            currentBid: 37200,
            image: './img/carro-6.jpg',
            endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            bids: 12,
            category: 'Antiguidades'
        }
        
    ];

    window.auctionProducts = products;

    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    renderProducts(products);
    startCountdownTimers();
}

function renderProducts(products) {
    const productsGrid = document.getElementById('productsGrid');

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card card-hover" data-product-id="${product.id}">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-badge">${product.category}</div>
                <div class="product-views">
                    <i data-lucide="eye"></i>
                    <span>${product.bids}</span>
                </div>
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price-section">
                    <div class="price-label">Lance Inicial</div>
                    <div class="price-value" data-price="${product.currentBid}">
                        ${formatPrice(product.currentBid)}
                    </div>
                </div>
                <div class="product-timer-section">
                    <div class="timer-label">Tempo Restante</div>
                    <div class="countdown-timer" data-end-time="${product.endTime.getTime()}"></div>
                </div>
                <button class="btn btn-gold btn-full bid-button" data-product-id="${product.id}">
                    <i data-lucide="gavel"></i>
                    Dar Lance
                </button>
            </div>
        </div>
    `).join('');

    lucide.createIcons();

    document.querySelectorAll('.bid-button').forEach(button => {
        button.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-product-id'));
            const product = window.auctionProducts.find(p => p.id === productId);
            if (product) {
                openBidModal(product);
            }
        });
    });
}

function startCountdownTimers() {
    const countdownElements = document.querySelectorAll('.countdown-timer');
    countdownElements.forEach(element => {
        const endTime = parseInt(element.getAttribute('data-end-time'));
        updateCountdown(element, endTime);
        setInterval(() => updateCountdown(element, endTime), 1000);
    });
}

function updateCountdown(element, endTime) {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        let html = '';
        if (days > 0) html += `<div class="countdown-item">${days}d</div>`;
        html += `<div class="countdown-item">${String(hours).padStart(2, '0')}h</div>`;
        html += `<div class="countdown-item">${String(minutes).padStart(2, '0')}m</div>`;
        html += `<div class="countdown-item seconds">${String(seconds).padStart(2, '0')}s</div>`;

        element.innerHTML = html;
    } else {
        element.innerHTML = '<div class="countdown-item">Finalizado</div>';
    }
}

function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

// -------- BID MODAL --------
function initializeBidModal() {
    const modal = document.getElementById('bidModal');
    const closeBtn = document.getElementById('closeBidModal');
    const bidForm = document.getElementById('bidForm');

    if (!modal || !closeBtn || !bidForm) return;

    closeBtn.addEventListener('click', closeBidModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeBidModal(); });

    bidForm.addEventListener('submit', e => {
        e.preventDefault();
        handleBidSubmit();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeBidModal();
    });
}

function openBidModal(product) {
    const modal = document.getElementById('bidModal');

    document.getElementById('bidProductImage').src = product.image;
    document.getElementById('bidProductTitle').textContent = product.title;
    document.getElementById('bidCurrentPrice').textContent = formatPrice(product.currentBid);
    document.getElementById('bidCount').textContent = product.bids;

    const minimumBid = Math.max(product.currentBid + 2000, 2000);
    document.getElementById('minimumBidText').textContent = `Lance mínimo: ${formatPrice(minimumBid)}`;

    const suggestedBids = [
        product.currentBid + 2000,
        product.currentBid + 5000,
        product.currentBid + 10000,
        product.currentBid + 20000
    ];
    

    const suggestedBidsContainer = document.getElementById('suggestedBids');
    suggestedBidsContainer.innerHTML = suggestedBids.map(amount => `
        <button type="button" class="suggested-bid-btn" data-amount="${amount}">
            ${formatPrice(amount)}
        </button>
    `).join('');

    suggestedBidsContainer.querySelectorAll('.suggested-bid-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.getElementById('bidAmount').value = formatPrice(parseInt(this.dataset.amount)).replace('R$', '').trim();
        });
    });

    window.currentBidProduct = product;
    modal.classList.add('active');
    lucide.createIcons();
}

function closeBidModal() {
    const modal = document.getElementById('bidModal');
    modal.classList.remove('active');
    document.getElementById('bidForm').reset();
    window.currentBidProduct = null;
}

function handleBidSubmit() {
    const bidAmountInput = document.getElementById('bidAmount');
    const bidAmountStr = bidAmountInput.value.replace(/[^\d,]/g, '').replace(',', '.');
    const bidAmount = parseFloat(bidAmountStr);
    const product = window.currentBidProduct;

    if (!product) return;

    if (!bidAmount || bidAmount <= product.currentBid) {
        showToast('Lance inválido', `Seu lance deve ser maior que ${formatPrice(product.currentBid)}`, 'error');
        return;
    }

    showLoading();

    setTimeout(() => {
        hideLoading();

        const productIndex = window.auctionProducts.findIndex(p => p.id === product.id);
        if (productIndex !== -1) {
            window.auctionProducts[productIndex].currentBid = bidAmount;
            window.auctionProducts[productIndex].bids += 1;

            const productCard = document.querySelector(`[data-product-id="${product.id}"]`);
            if (productCard) {
                const priceElement = productCard.querySelector('.price-value');
                if (priceElement) {
                    priceElement.textContent = formatPrice(bidAmount);
                    priceElement.setAttribute('data-price', bidAmount);
                }
            }
        }

        closeBidModal();

        const message = `Olá, acabei de dar um lance de ${formatPrice(bidAmount)} no item "${product.title}" (ID: ${product.id}), pode confirmar?`;
        const whatsappUrl = `https://wa.me/5511961559177?text=${encodeURIComponent(message)}`;
        window.location.href = whatsappUrl;
    }, 1200);
}

// Loading overlay
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.classList.add('active');
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.classList.remove('active');
}

// Toast
function initializeToast() { }
function showToast(title, description, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<div class="toast-title">${title}</div><div class="toast-description">${description}</div>`;
    container.appendChild(toast);

    setTimeout(() => toast.remove(), 5000);
    toast.addEventListener('click', () => toast.remove());
}

// Animations
function initializeAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.card-hover, .step-card, .feature-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Newsletter
document.addEventListener('DOMContentLoaded', function () {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        const input = newsletterForm.querySelector('.newsletter-input');
        const button = newsletterForm.querySelector('.newsletter-btn');

        button.addEventListener('click', function (e) {
            e.preventDefault();
            const email = input.value.trim();

            if (!email) {
                showToast('Campo obrigatório', 'Por favor, insira seu email.', 'error');
                return;
            }
            if (!isValidEmail(email)) {
                showToast('Email inválido', 'Por favor, insira um email válido.', 'error');
                return;
            }

            showToast('Inscrição realizada!', 'Você receberá nossas ofertas exclusivas em breve.', 'success');
            input.value = '';
        });
    }
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Lazy Loading
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    }
}

document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Resize handler
window.addEventListener('resize', function () {
    const carousel = document.getElementById('carousel');
    if (carousel && window.innerWidth < 768) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
    }
});

document.querySelectorAll('.category-card').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetUrl = this.getAttribute('href');
        window.location.href = `carregando.html?redirect=${encodeURIComponent(targetUrl)}`;
    });
});
