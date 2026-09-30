/* ================= WEBSITE LOADER ================= */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hide");

    }, 1800);

});
/* ================= CART ================= */

let cart = [];

function addToCart(name, price) {

    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    openCart();

}


/* ================= UPDATE CART ================= */

function updateCart() {

    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    let totalQuantity = 0;
    let totalPrice = 0;

    cart.forEach(item => {

        totalQuantity += item.quantity;

        totalPrice += item.price * item.quantity;

    });


    cartCount.textContent = totalQuantity;

    cartTotal.textContent =
        "₹" + totalPrice.toLocaleString("en-IN");


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h3>Your cart is empty</h3>

                <p>
                    Add fresh seafood to your cart.
                </p>

            </div>

        `;

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach((item, index) => {

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <div class="cart-item-info">

                <strong>
                    ${item.name}
                </strong>

                <span>
                    ₹${item.price} / KG
                </span>

            </div>


            <div class="cart-item-controls">

                <button onclick="changeQuantity(${index}, -1)">
                    −
                </button>

                <strong>
                    ${item.quantity}
                </strong>

                <button onclick="changeQuantity(${index}, 1)">
                    +
                </button>

            </div>

        `;

        cartItems.appendChild(div);

    });

}


/* ================= QUANTITY ================= */

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    updateCart();

}


/* ================= OPEN CART ================= */

function openCart() {

    document
        .getElementById("cartSidebar")
        .classList.add("show");

    document
        .getElementById("cartOverlay")
        .classList.add("show");

}


/* ================= CLOSE CART ================= */

function closeCart() {

    document
        .getElementById("cartSidebar")
        .classList.remove("show");

    document
        .getElementById("cartOverlay")
        .classList.remove("show");

}


/* ================= WHATSAPP ORDER ================= */

function orderWhatsApp() {

    if (cart.length === 0) {

        alert("Please add products to your cart first.");

        return;

    }


    let message =
        "🐟 *MANI FISH SHOP ORDER*%0A%0A";


    let total = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        message +=
            "• " +
            item.name +
            " × " +
            item.quantity +
            " KG - ₹" +
            itemTotal +
            "%0A";

    });


    message +=
        "%0A💰 *Total: ₹" +
        total +
        "*";


    message +=
        "%0A%0A📍 Nallur, Cuddalore";


    const phone =
        "917010205030";


    const url =
        `https://wa.me/${phone}?text=${message}`;


    window.open(url, "_blank");

}


/* ================= FILTER ================= */

function filterProducts(category, button) {

    const products =
        document.querySelectorAll(".product-card");

    const filters =
        document.querySelectorAll(".filter");


    filters.forEach(filter => {

        filter.classList.remove("active");

    });


    button.classList.add("active");


    products.forEach(product => {

        const productCategory =
            product.dataset.category;


        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


/* ================= MOBILE MENU ================= */

function toggleMenu() {

    document
        .getElementById("mobileMenu")
        .classList.toggle("show");

}


function closeMenu() {

    document
        .getElementById("mobileMenu")
        .classList.remove("show");

}


/* ================= LANGUAGE ================= */

let tamilMode = false;


function toggleLanguage() {

    tamilMode = !tamilMode;

    const languageText =
        document.getElementById("languageText");


    if (tamilMode) {

        languageText.textContent = "English";

        alert(
            "Tamil version will be added in the next update."
        );

    } else {

        languageText.textContent = "தமிழ்";

    }

}


/* ================= SCROLL HEADER ================= */

window.addEventListener("scroll", () => {

    const header =
        document.querySelector(".header");

    if (window.scrollY > 30) {

        header.style.boxShadow =
            "0 8px 30px rgba(0,30,40,.08)";

    } else {

        header.style.boxShadow = "none";

    }

});


/* ================= INITIALIZE ================= */

updateCart();