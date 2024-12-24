// alpine init within event listener
addEventListener("alpine:init", () => {
  Alpine.data("app", () => ({
    currentScreen: "home",
    apptitle: "Alpine Shop",
    AddToCartToast: false,
    RemoveFromCartToast: false,
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    products: [
      // I need 10 products
      {
        quantity: 1,
        id: 1,
        name: "iPhone 14 Pro",
        image: "img/product-1.jpeg",
        price: 999,
        description:
          "The latest and greatest from Apple, with a powerful new A16 Bionic chip, a stunning ProMotion display, and a new 48MP camera system.",
      },

      {
        quantity: 1,
        id: 2,
        name: "Samsung Galaxy S22 Ultra",
        image: "img/product-2.jpeg",
        price: 899,
        description:
          "The latest and greatest from Samsung, with a powerful new Exynos 2200 chip, a stunning 120Hz display, and a new 108MP camera system.",
      },

      {
        quantity: 1,
        id: 3,
        name: "Google Pixel 6 Pro",
        image: "img/product-3.jpeg",
        price: 799,
        description:
          "The latest and greatest from Google, with a powerful new Tensor chip, a stunning 120Hz display, and a new 50MP camera system.",
      },

      {
        quantity: 1,
        id: 4,
        name: "OnePlus 10 Pro",
        image: "img/product-4.jpeg",
        price: 699,
        description:
          "The latest and greatest from OnePlus, with a powerful new Snapdragon 898 chip, a stunning 120Hz display, and a new 50MP camera system.",
      },

      {
        quantity: 1,
        id: 5,
        name: "Xiaomi 12 Pro",
        image: "img/product-5.jpeg",
        price: 599,
        description:
          "The latest and greatest from Xiaomi, with a powerful new Snapdragon 898 chip, a stunning 120Hz display, and a new 50MP camera system.",
      },

      {
        quantity: 1,
        id: 6,
        name: "Huawei Mate 50 Pro",
        image: "img/product-6.jpeg",
        price: 499,
        description:
          "The latest and greatest from Huawei, with a powerful new Kirin 9000 chip, a stunning 120Hz display, and a new 50MP camera system.",
      },

      {
        quantity: 1,
        id: 7,
        name: "Sony Xperia 1 III",
        image: "img/product-7.jpeg",
        price: 399,
        description:
          "The latest and greatest from Sony, with a powerful new Snapdragon 898 chip, a stunning 120Hz display, and a new 50MP camera system.",
      },

      {
        quantity: 1,
        id: 8,
        name: "Motorola Edge 30 Pro",
        image: "img/product-8.jpeg",
        price: 299,
        description:
          "The latest and greatest from Motorola, with a powerful new Snapdragon 898 chip, a stunning 120Hz display, and a new 50MP camera system.",
      },

      {
        quantity: 1,
        id: 9,
        name: "Nokia 10 Pro",
        image: "img/product-9.jpeg",
        price: 199,
        description:
          " The latest and greatest from Nokia, with a powerful new Snapdragon 898 chip, a stunning 120Hz display, and a new 50MP camera system.",
      },
    ],

    // methods

    // toast
    showToast() {
      this.AddToCartToast = true;
      setTimeout(() => {
        this.AddToCartToast = false;
      }, 900);
    },

    // toast remove from cart
    showToastRemoveFromCart() {
      this.RemoveFromCartToast = true;
      setTimeout(() => {
        this.RemoveFromCartToast = false;
      }, 900);
    },

    calculatePrice(price, quantity) {
      if (quantity < 1) {
        quantity = 1;
      }
      return parseInt(price) * parseInt(quantity);
    },

    addToCart(productId, quantity) {
      // grab the product from products array
      const product = this.products.find((product) => product.id === productId);

      // check if the product is already in cartItems array
      const productInCart = this.cartItems.find(
        (product) => product.id === productId
      );

      // if product is already in cartItems array then update the quantity
      if (productInCart) {
        // update the quantity
        productInCart.quantity =
          parseInt(productInCart.quantity) + parseInt(quantity);
      } else {
        // else add the product to cartItems array
        this.cartItems.push({
          quantity: quantity,
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          description: product.description,
        });
      }

      this.showToast();

      // save the cartItems array to localStorage
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    },
    // end of addToCart method

    // remove product from cartItems array
    removeFromCart(productId) {
      // filter out the product from cartItems array
      this.cartItems = this.cartItems.filter(
        (product) => product.id !== productId
      );

      // save the cartItems array to localStorage
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));

      this.showToastRemoveFromCart();
    }, // end of removeFromCart method

    updateQuantityInCart(productId, quantity) {
      // if quantity is o the remove the product from cartItems array
      if (quantity < 1) {
        // filter out the product from cartItems array
        this.removeFromCart(productId);
      } else {
        // grab the product from cartItems array and update the quantity
        const product = this.cartItems.find(
          (product) => product.id === productId
        );

        // update the quantity
        product.quantity = quantity;

        // save the cartItems array to localStorage
        localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
      }
    },

    // totalItemsInCartCalculator
    calculateTotalItemsFromCart() {
      let totalItems = 0;
      this.cartItems.forEach((product) => {
        totalItems += 1;
      });

      return totalItems;
    },

    // totalPriceinCartCalculator
    calculateTotalPriceFromCart() {
      let totalPrice = 0;
      this.cartItems.forEach((product) => {
        totalPrice += parseInt(product.price) * parseInt(product.quantity);
      });

      return totalPrice;
    },

    currentYear: "",
    scrollToTop: false,
    init() {
      this.currentYear = new Date().getFullYear();

      // scroll to top, if user scrolls down 70% or more then scrollToTop make true
      window.addEventListener("scroll", () => {
        if (window.scrollY > window.innerHeight * 0.7) {
          this.scrollToTop = true;
        } else {
          this.scrollToTop = false;
        }
      });
    },
  }));
});
