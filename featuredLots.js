// Featured Lots - JavaScript

document.addEventListener('DOMContentLoaded', function () {
    initializeFeaturedLots();
});

function initializeFeaturedLots() {
    const featuredLots = [
        {
            id: 101,
            title: 'HYUNDAI/HB20 1.0M 1.0M 12/13',
            currentBid: 16500,
            image: './img/carro-lotes-em-destaque-1.jpg',
            endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            bids: 12,
            category: 'Carros'
        },
        {
            id: 102,
            title: 'FORD/KA SE 1.0 HA 14/15',
            currentBid: 13900,
            image: './img/carro-lotes-em-destaque-2.jpg',
            endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            bids: 7,
            category: 'Carros'
        },
        {
            id: 103,
            title: 'GM/CELTA 4P LIFE 08/09',
            currentBid:  8230,
            image: './img/carro-lotes-em-destaque-3.jpg',
            endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            bids: 5,
            category: 'Carros'
        },
        {
            id: 104,
            title: 'Maserati GranTurismo Sport 2019',
            currentBid: 280000,
            image: './img/carro-lotes-em-destaque-4.jpg',
            endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            bids: 18,
            category: 'Carros'
        },
        {
            id: 105,
            title: 'GM/VECTRA CHALLENGE 02/02',
            currentBid: 9100,
            image: './img/carro-lotes-em-destaque-5.jpg',
            endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            bids: 18,
            category: 'Carros'
        }
    ];

    window.featuredLots = featuredLots;

    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) return;

    renderFeaturedLots(featuredLots);
    startFeaturedCountdowns();
}

function renderFeaturedLots(lots) {
    const featuredGrid = document.getElementById('featuredGrid');

    featuredGrid.innerHTML = lots.map(lot => `
        <div class="product-card card-hover" data-featured-id="${lot.id}">
            <div class="product-image-container">
                <img src="${lot.image}" alt="${lot.title}" class="product-image">
                <div class="product-badge">${lot.category}</div>
                <div class="product-views">
                    <i data-lucide="eye"></i>
                    <span>${lot.bids}</span>
                </div>
            </div>
            <div class="product-content">
                <h3 class="product-title">${lot.title}</h3>
                <div class="product-price-section">
                    <div class="price-label">Lance Atual</div>
                    <div class="price-value" data-price="${lot.currentBid}">
                        ${formatPrice(lot.currentBid)}
                    </div>
                </div>
                <div class="product-timer-section">
                    <div class="timer-label">Tempo Restante</div>
                    <div class="countdown-timer" data-end-time="${lot.endTime.getTime()}"></div>
                </div>
                <button class="btn btn-gold btn-full bid-featured-button" data-featured-id="${lot.id}">
                    <i data-lucide="gavel"></i>
                    Dar Lance
                </button>
            </div>
        </div>
    `).join('');

    lucide.createIcons();

    document.querySelectorAll('.bid-featured-button').forEach(button => {
        button.addEventListener('click', function () {
            const lotId = parseInt(this.getAttribute('data-featured-id'));
            const lot = window.featuredLots.find(l => l.id === lotId);
            if (lot) {
                openBidModal(lot);
            }
        });
    });
}

function startFeaturedCountdowns() {
    const countdownElements = document.querySelectorAll('#featuredGrid .countdown-timer');
    countdownElements.forEach(element => {
        const endTime = parseInt(element.getAttribute('data-end-time'));
        updateCountdown(element, endTime);
        setInterval(() => updateCountdown(element, endTime), 1000);
    });
}
