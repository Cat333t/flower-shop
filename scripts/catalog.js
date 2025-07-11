async function run() {
    const response = await fetch('../catalog.json');
    const AllProducts = await response.json();

    function updateCards() {
        const allCards = document.querySelectorAll(".card");
        const search_input = document.querySelector(".search");
        const query = search_input.value.toLowerCase().trim();
        const minRange = document.getElementById("min-range");
        const maxRange = document.getElementById("max-range");
        const min = parseInt(minRange.value);
        const max = parseInt(maxRange.value);
        allCards.forEach(card => {
            const price = parseInt(card.querySelector(".card-price").textContent.replace(" грн", ""));
            const cardTitle = card.querySelector(".card-title").textContent.toLowerCase();
            if (price >= min && price <= max && cardTitle.includes(query)) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });

    }
    
    const cardsContainer = document.querySelector('.cards-container');

    AllProducts.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="../images/catalog/${product.img}" loading="lazy" class="card-img" alt="Error loading image">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-price">${product.price} грн</p>
                <p class="card-text">${product.description}</p>
            </div>
        `;
        card.addEventListener('click', () => {
            window.location.href = `./product.html#${AllProducts.indexOf(product)}`;
        });
        
        if (AllProducts.indexOf(product) % 2) { //если чотное
            card.style.animationDelay = `0.2s`;
        } else {
            card.style.animationDelay = `0s`;
        }
        cardsContainer.appendChild(card);
    });

    const search_input = document.querySelector(".search");

    search_input.addEventListener("input", () => {
        updateCards()
    })

    // ищем самую маленькую цену
    const allCards = document.querySelectorAll(".card");
    let minPrice = Infinity;
    allCards.forEach(card => {
        const price = parseInt(card.querySelector(".card-price").textContent.replace(" грн", ""));
        if (price < minPrice) {
            minPrice = price;
        }
    });

    // ищем самую большую цену
    let maxPrice = 0;
    allCards.forEach(card => {
        const price = parseInt(card.querySelector(".card-price").textContent.replace(" грн", ""));
        if (price > maxPrice) {
            maxPrice = price;
        }
    });

    const minRange = document.getElementById("min-range");
    const maxRange = document.getElementById("max-range");
    const minValDisplay = document.getElementById("min-val");
    const maxValDisplay = document.getElementById("max-val");
    const fill = document.getElementById("slider-fill");

    minRange.max = maxPrice;
    minRange.min = minPrice;
    maxRange.max = maxPrice;
    maxRange.min = minPrice;

    minRange.value = minPrice;
    maxRange.value = maxPrice;

    minValDisplay.textContent = minRange.value;
    maxValDisplay.textContent = maxRange.value;

    function updateSlider() {
        let min = parseInt(minRange.value);
        let max = parseInt(maxRange.value);

        if (min > max - 10) {
            min = max - 10;
            minRange.value = min;
        }

        if (max < min + 10) {
            max = min + 10;
            maxRange.value = max;
        }

        if (min < minPrice) {
            min = minPrice;
            minRange.value = min;
        }

        minValDisplay.textContent = min;
        maxValDisplay.textContent = max;

            // Обновление заливки между ползунками
        const percent1 = ((min - minPrice) / (maxPrice - minPrice)) * 100;
        const percent2 = ((max - minPrice) / (maxPrice - minPrice)) * 100;

        fill.style.left = percent1 + "%";
        fill.style.width = (percent2 - percent1) + "%";

        updateCards();
    }

    minRange.addEventListener("input", updateSlider);
    maxRange.addEventListener("input", updateSlider);

    updateSlider(); // начальное обновление

    window.scrollTo(0, 0);

    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Если нужно, чтобы анимация срабатывала только один раз:
            observer.unobserve(entry.target);
            }
        });
        }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        observer.observe(card);
    });



    const btnFilter = document.querySelector('.btn-filter');
    const filters = document.querySelector('.filters');
    btnFilter.addEventListener('click', () => {
        filters.classList.toggle('show');
    });

    const closeFilter = document.querySelector('.close-btn');
    closeFilter.addEventListener('click', () => {
        filters.classList.remove('show');
    });
}

run();