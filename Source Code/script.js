// Show and switch between pages
function showPage(pageName) {
    const pages = document.querySelectorAll('.pages');
    // Loop through all pages and set the active class based on the pageName
    pages.forEach(page => {
        if (page.id === pageName) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });

    // Highlight the active navigation link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active-link');
        } else {
            link.classList.remove('active-link');
        }
    });
}

// Add click event listeners to navigation links
// Switch pages and prevent default link behavior
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageName = link.getAttribute('data-page');
        showPage(pageName);
    });
});

// Set default page to 'homePage' on initial load
document.addEventListener('DOMContentLoaded', () => {
    showPage('homePage');
});

// Slider functionality
preBut = document.getElementById("pre");
nextBut = document.getElementById("next");
var mainContianer = document.querySelectorAll(".slider-items");
var container = document.querySelector(".slider-container");
var contLength = container.children.length;
var n = 0;

// Show previous slide
function pre(){
    if(n <= 0){
        n = contLength - 1;
    } else {
        n--;
    }
    displaySlide();
}

// Show next slide
function next(){
    if(n >= contLength - 1){
        n = 0;
    } else {
        n++;
    }
    displaySlide();
}

// Add click event listeners for previous and next buttons
preBut.addEventListener('click', pre);
nextBut.addEventListener('click', next);

// Update slide display
function displaySlide(){ 
    for(i = 0; i <= contLength - 1; i++){
        mainContianer[i].classList.remove("active");
    }
    mainContianer[n].classList.add("active");
}

// Automatically move to the next slide every 4 seconds
setInterval(next, 4000);

// Scroll to target section on window load
window.onload = function() {
    const target = setTimeout(function() {
        document.getElementById("targetA").scrollIntoView({ behavior: "smooth", block: "start" });
    }, 2000);
    clearTimeout(target);
};

// Scroll to top functionality
const goToTopBtn = document.getElementById("goToTopBtn");
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        goToTopBtn.style.display = "block";
    } else {
        goToTopBtn.style.display = "none";
    }
};
goToTopBtn.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

// Toggle category selection and add/remove cancel button
function catagorySelected(clickedElement) {
    var li = clickedElement;
    if (li.classList.contains('clicked')) {
        li.className = 'product-catagory-item';
        var removeBtn = li.querySelector('.cancelBtn');
        if (removeBtn) {
            removeBtn.remove();
        }
    } else {
        li.className = 'clicked';
        let removeBtn = document.createElement('button');
        removeBtn.innerHTML = '&#x2717;';
        removeBtn.className = 'cancelBtn';
        li.appendChild(removeBtn);
    }
}

// Cart functionality
let cart = document.querySelector('.cartDiv');
let cartIcon = document.querySelector('.cartIcon');
let main = document.querySelector('main');

// Toggle cart visibility on cart icon click
cartIcon.addEventListener('click', () => {
    cart.classList.toggle('visible');
});

// Hide cart when clicking outside of it
main.addEventListener('click', (event) => {
    if (event.target.closest('.cartDiv') || event.target.closest('.cartIcon')) {
        return;
    }
    cart.classList.remove('visible');
});

// Add product to cart and handle quantity changes
// Prevent adding duplicates
// Enable removal of items from the cart
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function () {
        button.textContent = 'Added';
        button.disabled = true;

        let productCard = this.parentElement.parentElement;
        let productImg = productCard.querySelector('img').src;
        let productName = productCard.querySelector('h3').textContent;
        let productPrice = parseFloat(productCard.querySelector('p').textContent.replace('₹', '').trim());

        let existingCartItem = Array.from(document.querySelectorAll('.cartItem'))
            .find(cartItem => cartItem.querySelector('.productName').textContent === productName);

        if (existingCartItem) return;

        let newCartItem = document.createElement('div');
        newCartItem.classList.add('cartItem');
        newCartItem.innerHTML = `
            <img src="${productImg}" alt="${productName}">
            <p class="productName">${productName}</p>
            <p class="price">₹${productPrice.toFixed(2)}</p>
            <div class="quantityDisplay">
                <button class="decreaseButton">-</button>
                <p class="quantity">1</p>
                <button class="increaseButton">+</button>
            </div>
            <button class="removeCartItem">X</button>
        `;

        document.querySelector('.cartDiv').appendChild(newCartItem);

        // Increase quantity
        newCartItem.querySelector('.increaseButton').addEventListener('click', function () {
            let quantityElem = newCartItem.querySelector('.quantity');
            let priceElem = newCartItem.querySelector('.price');
            let quantity = parseInt(quantityElem.textContent);
            quantity++;
            quantityElem.textContent = quantity;
            priceElem.textContent = `₹${(productPrice * quantity).toFixed(2)}`;
        });

        // Decrease quantity or remove item
        newCartItem.querySelector('.decreaseButton').addEventListener('click', function () {
            let quantityElem = newCartItem.querySelector('.quantity');
            let priceElem = newCartItem.querySelector('.price');
            let quantity = parseInt(quantityElem.textContent);
            if (quantity > 1) {
                quantity--;
                quantityElem.textContent = quantity;
                priceElem.textContent = `₹${(productPrice * quantity).toFixed(2)}`;
            } else {
                newCartItem.remove();
                document.querySelectorAll('.product-card').forEach(card => {
                    if (card.querySelector('h3').textContent === productName) {
                        let addToCartButton = card.querySelector('.add-to-cart-btn');
                        addToCartButton.textContent = 'Add to Cart';
                        addToCartButton.disabled = false;
                    }
                });
            }
        });

        // Remove item from cart
        newCartItem.querySelector('.removeCartItem').addEventListener('click', function () {
            newCartItem.remove();
            document.querySelectorAll('.product-card').forEach(card => {
                if (card.querySelector('h3').textContent === productName) {
                    let addToCartButton = card.querySelector('.add-to-cart-btn');
                    addToCartButton.textContent = 'Add to Cart';
                    addToCartButton.disabled = false;
                }
            });
        });
    });
});

// Select elements that trigger navigation
let shopNow = document.querySelector('.shopNow'); // Button to navigate to the product page from home
let aboutShopNow = document.querySelector('.about-shopNow'); // Button to navigate to the product page from About Us
let featuredProducts = document.querySelectorAll('.w3-card-4'); // Product cards on the homepage
let sportSelect = document.querySelectorAll('.items'); // Sport selection items (categories)
let footerHome = document.querySelector('.footerHome'); // Footer link to Home page
let footerAboutUs = document.querySelector('.footerAboutUs'); // Footer link to About Us page
let footerProducts = document.querySelector('.footerProducts'); // Footer link to Product page
let footerBlogs = document.querySelector('.footerBlogs'); // Footer link to Blog page
let footerContact = document.querySelector('.footerContact'); // Footer link to Contact page

// Event listener for the 'Shop Now' button on the homepage
shopNow.addEventListener('click', (event) => {
    showPage('productPage'); // Show the product page
    window.scrollTo(0, 0); // Scroll to the top of the page
});

// Event listener for the 'Shop Now' button on the About Us page
aboutShopNow.addEventListener('click', (event) => {
    showPage('productPage'); // Show the product page
    window.scrollTo(0, 0); // Scroll to the top of the page
});

// Event listeners for each featured product card
featuredProducts.forEach((featuredProduct) => {
    featuredProduct.addEventListener('click', (event) => {
        showPage('productPage'); // Show the product page
        window.scrollTo(0, 0); // Scroll to the top of the page
    });
});

// Event listeners for sport selection items
sportSelect.forEach((sportItem) => {
    sportItem.addEventListener('click', (event) => {
        showPage('productPage'); // Show the product page
        window.scrollTo(0, 0); // Scroll to the top of the page
    });
});

// Event listener for the Home link in the footer
footerHome.addEventListener('click', (event) => {
    showPage('homePage'); // Show the homepage
    window.scrollTo(0, 0); // Scroll to the top of the page
});

// Event listener for the About Us link in the footer
footerAboutUs.addEventListener('click', (event) => {
    showPage('aboutUsPage'); // Show the About Us page
    window.scrollTo(0, 0); // Scroll to the top of the page
});

// Event listener for the Products link in the footer
footerProducts.addEventListener('click', (event) => {
    showPage('productPage'); // Show the product page
    window.scrollTo(0, 0); // Scroll to the top of the page
});

// Event listener for the Blogs link in the footer
footerBlogs.addEventListener('click', (event) => {
    showPage('blogPage'); // Show the blog page
    window.scrollTo(0, 0); // Scroll to the top of the page
});

// Event listener for the Contact link in the footer
footerContact.addEventListener('click', (event) => {
    showPage('contactPage'); // Show the contact page
    window.scrollTo(0, 0); // Scroll to the top of the page
});

// Event listener for the contact form submission
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    
    // Get values from form fields
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const msg = document.getElementById('msg').value.trim();

    // Validate form fields
    if (name === '' || email === '' || msg === '') {
        alert('Please fill all the fields!'); // Alert user to fill all fields
    } else {
        alert('Your message has been submitted!'); // Notify user of successful submission
        document.getElementById('myForm').reset(); // Reset form fields
    }
});
