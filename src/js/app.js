// alpine init within event listener
addEventListener("alpine:init", () => {
  Alpine.data("app", () => ({
    // products

    products: [],

    async fetchProducts() {
      try {
        // Fetch the data.json file using Axios
        const response = await axios.get("./data.json");
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },

    // FAQ-specific data and methods start
    activeFAQ: null, // To track the currently open FAQ

    toggleFAQ(index) {
      this.activeFAQ = this.activeFAQ === index ? null : index; // Toggle visibility
    },

    isFAQOpen(index) {
      return this.activeFAQ === index; // Check if an FAQ is open
    },

    // FAQ-specific data and methods end

    currentScreen: localStorage.getItem("currentScreen") || "home",
    getTitle() {
      const titles = {
        home: "Welcome to Our Shop",
        about: "About Us",
        shop: "Explore Our Products",
        faq: "Frequently Asked Questions",
        cart: "Your Shopping Cart",
        contact: "Contact Us",
      };
     
      return titles[this.currentScreen] || "Default Title";
       
    },
    navigate(screen) {
      this.currentScreen = screen; // Update current screen
      localStorage.setItem("currentScreen", screen); // Save to localStorage
    },

    apptitle: "Alpine Shop",
    AddToCartToast: false,
    RemoveFromCartToast: false,
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
   

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
    init () {
      // fetch products
      this.fetchProducts();


      // get the current year
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
