async function run() {
    const response = await fetch('../catalog.json');
    const AllProducts = await response.json();

    let cookies = document.cookie.split('; '); // basket=[{"id": "1", "amount": "1"}, {"id": "2", "amount": "2"}]
    let basket = [];
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].split('=');
        if (cookie[0] === 'basket') {
            basket = JSON.parse(cookie[1]);
        }
    }

    const cardsContainer = document.querySelector('.cards-container');
    let total = 0;

    basket.forEach(item => {
        const product = AllProducts[item.id];
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="../images/catalog/${product.img}" alt="${product.name}" class="card-image">
            <div class="card-body">
                <h3 class="card-title">${product.name}</h3>
                <p class="card-text">${product.description}</p>
                <p class="card-price">${product.price} грн</p>
                <p class="card-price">Кількість: ${item.amount}</p>
                <p class="card-price">Сума: ${product.price * item.amount} грн</p></p>
            </div>
        `;
        card.addEventListener('click', () => {
            window.location.href = `./product.html#${AllProducts.indexOf(product)}`;
        });

        total += product.price * item.amount;

        cardsContainer.appendChild(card);
    });

    if(basket.length === 0) {
        let h1 = document.createElement('h1');
        h1.style.textAlign = 'center';
        h1.style.alignSelf = 'center';
        h1.innerHTML = 'Кошик порожній <br> Перейдіть до <a href="./catalog.html">каталогу</a>';
        cardsContainer.appendChild(h1);
    }

    const totalElement = document.getElementById('total');
    totalElement.textContent = total + ' грн';

    const body = document.querySelector('body');
    const card_container = document.querySelector('.cards');
    card_container.addEventListener("scroll", () => {
        const isAtBottom = card_container.scrollTop + card_container.clientHeight >= card_container.scrollHeight - 10;

        if (isAtBottom) {
            body.style.overflowY = 'scroll';
        } else {
            body.style.overflowY = 'hidden';
        }

        if(window.scrollY > 0) {
            window.scrollTo(0, 0);
        }
    });
    const phone = document.getElementById('phone');
    phone.addEventListener('input', () => {
        let number = phone.value.slice(4, phone.value.length);
        number = number.replace(/[^0-9+]/g, '');
        number = number.replace("+", "");
        phone.value = '+380' + number;
    })

    const form = document.querySelector('form');
    const loader = document.querySelector('.loader');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        loader.style.display = 'flex';

        const name = document.getElementById('name');
        const phone = document.getElementById('phone');
        const address = document.getElementById('address');
        const allCards = document.querySelectorAll('.card');
        let flag = false;

        if(name.value === '') {
            name.style.border = '2px solid red';
            flag = true;
        } else {
            name.style.border = '2px solid green';
        }

        if(phone.value === '' || phone.value.length < 13) {
            phone.style.border = '2px solid red';
            flag = true;
        } else {
            phone.style.border = '2px solid green';
        }

        if(address.value === '') {
            address.style.border = '2px solid red';
            flag = true;
        } else {
            address.style.border = '2px solid green';
        }   

        if(allCards.length === 0) {
            alert('Кошик порожній!');
            window.location.href = './catalog.html';
        }

        if(flag) {
            setTimeout(() => {
                loader.style.display = 'none';
                alert('Заповніть всі поля!');
            }, Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000); // 1 - 3
        } else {
            document.cookie = "[]";
          
            setTimeout(() => {
                loader.style.display = 'none';
                window.location.href = './thanks.html';
            }, Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000); // 1 - 3
        }
    })
}

run()