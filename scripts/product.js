async function run() {
    const response = await fetch('../catalog.json');
    const AllProducts = await response.json();

    const productId = window.location.hash.slice(1);
    const product = AllProducts[productId];

    if(!product) {
        window.location.href = '../pages/catalog.html';
    }

    const image = document.querySelector('.image');
    image.style.backgroundImage = `url(../images/catalog/${product.img})`;

    const info = document.querySelector('.info');
    info.querySelector('.name').textContent = product.name;
    info.querySelector('.price').textContent = product.price + ' грн';
    info.querySelector('.description').textContent = product.description;

    const button = document.querySelector('.button');

    //если есть в кошику то меняется кнопка
    let cookies = document.cookie.split('; '); // basket=[{"id": "1", "amount": "1"}, {"id": "2", "amount": "2"}]
    let basket = [];

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].split('=');
        if (cookie[0] === 'basket') {
            basket = JSON.parse(cookie[1]);
        }
    }

    basket.forEach(item => {
        if (item.id === productId) {
            button.classList.add('active');
        }
    });

    button.addEventListener('click', (e) => {
        e.preventDefault();

        let cookies = document.cookie.split('; '); // basket=[{"id": "1", "amount": "1"}, {"id": "2", "amount": "2"}]
        let basket = [];

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].split('=');
            if (cookie[0] === 'basket') {
                basket = JSON.parse(cookie[1]);
            }
        }

        basket.push({
            id: productId,
            amount: 1
        });

        document.cookie = 'basket=' + JSON.stringify(basket) + `; max-age=${30 * 24 * 60 * 60};` // 30 days

        console.log(basket)

        // window.location.href = './basket.html';
    });
}

run();