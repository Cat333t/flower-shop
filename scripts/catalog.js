async function run() {
    const response = await fetch('../catalog.json');
    const AllProducts = await response.json();
    
    const cardsContainer = document.querySelector('.cards-container');

    AllProducts.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="../images/catalog/0.jpg" class="card-img" alt="Error loading image">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.price} грн</p>
                <p class="card-text">${product.description}</p>
            </div>
        `;
        card.addEventListener('click', () => {
            window.location.href = `./product.html#${AllProducts.indexOf(product)}`;
        });
        cardsContainer.appendChild(card);
    });

    const search_input = document.querySelector(".search");

    search_input.addEventListener("input", () => {
        const query = search_input.value.toLowerCase().trim();
        const filteredProducts = AllProducts.filter(product => product.name.toLowerCase().includes(query));
        cardsContainer.innerHTML = "";
        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="../images/catalog/0.jpg" class="card-img" alt="Error loading image">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.price} грн</p>
                    <p class="card-text">${product.description}</p>
                </div>
            `;
            card.addEventListener('click', () => {
                window.location.href = `./product.html#${AllProducts.indexOf(product)}`;
            });
            cardsContainer.appendChild(card);
        });
    })
}

run();