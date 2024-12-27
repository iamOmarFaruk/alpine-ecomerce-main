addEventListener("alpine:init", () => {
  Alpine.data("app", () => ({
    // Products array initialized as empty
    products: [],

    // Fetch products from data.json
    async fetchProducts() {
      try {
        // Fetch the data.json file using Axios
        const response = await axios.get("./data.json");
        this.products = response.data;
        console.log("Products loaded:", this.products);
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

    // SECTION: Dynamic Title Update
    getTitle() {
      const titles = {
        home: "Welcome to Our Shop",
        about: "About Us",
        shop: "Explore Our Products",
        faq: "Frequently Asked Questions",
        cart: "Your Shopping Cart",
        contact: "Contact Us",
        checkout: "Secure Checkout",
      };
      return titles[this.currentScreen] || "Default Title";
    },

    updateTitle() {
      const titles = {
        home: "Welcome to Our Shop",
        about: "About Us",
        shop: "Explore Our Products",
        faq: "Frequently Asked Questions",
        cart: "Your Shopping Cart",
        contact: "Contact Us",
        checkout: "Checkout",
      };
      document.title = `${titles[this.currentScreen] || "Default Title"}`;
    },

    navigate(screen) {
      this.currentScreen = screen; // Update current screen
      localStorage.setItem("currentScreen", screen); // Save to localStorage
      this.updateTitle(); // Dynamically update the title
      // Scroll to the top of the page
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scrolling effect
      });
    },

    apptitle: "Alpine Shop",
    AddToCartToast: false,
    RemoveFromCartToast: false,
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],

    // SECTION: Toast Methods
    showToast() {
      this.AddToCartToast = true;
      setTimeout(() => {
        this.AddToCartToast = false;
      }, 900);
    },

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

    // SECTION: Cart Methods
    addToCart(productId, quantity = 1) {
      const product = this.products.find((product) => product.id === productId);

      const productInCart = this.cartItems.find(
        (product) => product.id === productId
      );

      if (productInCart) {
        productInCart.quantity =
          parseInt(productInCart.quantity) + parseInt(quantity);
      } else {
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
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    },

    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(
        (product) => product.id !== productId
      );

      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
      this.showToastRemoveFromCart();
    },

    updateQuantityInCart(productId, quantity) {
      if (quantity < 1) {
        this.removeFromCart(productId);
      } else {
        const product = this.cartItems.find(
          (product) => product.id === productId
        );

        product.quantity = quantity;

        localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
      }
    },

   calculateTotalItemsFromCart() {
  let totalItems = 0;
  this.cartItems.forEach((product) => {
    totalItems += parseInt(product.quantity, 10); // Ensure quantity is treated as a number
  });
  return totalItems;
}
,

    calculateTotalPriceFromCart() {
      let totalPrice = 0;
      this.cartItems.forEach((product) => {
        totalPrice += parseInt(product.price) * parseInt(product.quantity);
      });

      return totalPrice;
    },

    currentYear: "",
    scrollToTop: false,

    // SECTION: Init Method
    init() {
      this.fetchProducts(); // Fetch products on initialization
      this.updateTitle(); // Set the initial title on load
      this.currentYear = new Date().getFullYear();

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
