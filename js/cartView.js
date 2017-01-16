var app = app || {};

app.CartView = ( function() {

	// Cache object for DOM elements.
	var dom = {};

	// Update the discount label view.
	function updateDiscountLabelView() {
		var code = app.CartModel.getCurrentCode();

		if (!code) {
			dom.discountLabel.innerHTML = '';
			return;
		}

		dom.discountLabel.innerHTML = code;
	}

	// Update the actual discount value in the view.
	function updateDiscountCartView() {
		var discount = app.CartModel.getDiscount();

		if (!discount) {
			dom.discount.innerHTML = '$0.00';
			return;
		}

		dom.discount.innerHTML = '$' + discount;
	}

	// Update the count in the tiny cart.
	function updateTinyCartView() {
		var totalCount = app.CartModel.getTotalItemCount();

		if (!totalCount) {
			return;
		}

		dom.tinyCartCount.textContent = totalCount;
	}

	// Toggle the tiny cart.
	function toggleTinyCart() {
		var items = app.CartModel.getItems();

		if (items.length === 0) {
			dom.body.classList.remove('tiny-cart-opened');
		} else {
			dom.body.classList.add('tiny-cart-opened');
		}
	}

	// If the cart is empty, then hide the view.
	function updateShoppingCartView() {
		var items = app.CartModel.getItems();

		if (items.length === 0) {
			dom.body.classList.remove('cart-opened', 'fixed');
		}
	}

	// Update the total
	function updateTotalView() {
		var total = app.CartModel.getTotal();

		dom.total.innerHTML = '$' + total.toFixed(2);
	}

	// Update the subtotal
	function updateSubtotalView() {
		var subtotal = app.CartModel.getSubtotal();

		dom.subtotal.innerHTML = '$' + subtotal.toFixed(2);
	}

	// Update all totals.
	function updateTotalAndSubtotalView() {
		updateSubtotalView();
		updateDiscountLabelView();
		updateDiscountCartView();
		updateTotalView();
	}

	// Build out the cart.
	function buildCartView(items) {

		// Build the cart
		var cart = app.Helpers.buildCart(items);

		dom.cartList.innerHTML = '';

		// Append the cart to the DOM.
		dom.cartList.appendChild(cart);
	}

	// Render the cart.
	function render() {

		// Get all the cart items.
		var items = app.CartModel.getItems();

		if (items.length === 0) {
			app.CartModel.resetCart();
		}

		// Update the discount.
		app.CartController.updateDiscount();

		buildCartView(items);
		toggleTinyCart();
		updateTinyCartView();
		updateShoppingCartView();
		updateDiscountLabelView();
		updateDiscountCartView();
		updateSubtotalView();
		updateTotalView();
	}

	// Initialize.
	function init() {
		// Cache the cart
		dom.body = document.body;
		dom.addToCartBtns = document.querySelectorAll('#cards .add-to-cart');
		dom.updatePriceContainer = document.getElementById('update-price-container');
		dom.updatePrice = document.getElementById('update-price');
		dom.shoppingCart = document.getElementById('shopping-cart');
		dom.shoppingCartList = document.getElementById('shopping-cart-list');
		dom.tinyCart = document.getElementById('tiny-cart-container');
		dom.tinyCartCount = dom.tinyCart.querySelector('.cart-count');
		dom.cartList = document.getElementById('shopping-cart-list');
		dom.discount = document.querySelector('.cart-totals .promo-total-value');
		dom.discountInput = document.getElementById('promo-code');
		dom.discountBtn = document.getElementById('discount-code-btn');
		dom.subtotal = document.querySelector('.cart-totals .subtotal-value');
		dom.total = document.querySelector('.cart-totals .total-value');
		dom.discountLabel = document.querySelector('.cart-totals .promo-total-label span');
		dom.overlay = document.getElementById('overlay');

		bindEvents();
		render();
	}

	// Bind events.
	function bindEvents() {

		// Bind the Add to Cart button for items.
		for (var i = 0; i < dom.addToCartBtns.length; i++) {
			dom.addToCartBtns[i].addEventListener('click', handleAddToCart);
		}

		// Bind the events for each item row.
		dom.shoppingCartList.addEventListener('click', handleCartClicks);

		// Bind the update price button.
		dom.updatePrice.addEventListener('click', handlePriceUpdate);

		// Bind discount code button.
		dom.discountBtn.addEventListener('click', handleDiscountCodeView);

		// Bind a change event for the quantity input.
		dom.shoppingCart.addEventListener('change', handleCartClicks);

		// Bind tiny cart button to shopping cart.
		dom.tinyCart.addEventListener('click', handleTinyCart, false);

		// Bind the overlay. Allow the cart to be closed by clicking it.
		dom.overlay.addEventListener('click', handleTinyCart);
	}

	// Handle the add to cart.
	function handleAddToCart(e) {
		app.CartController.addToCart(e);
	}

	// Handle a price update.
	function handlePriceUpdate() {
		// Update
		app.CartController.priceUpdate();

		// Re-render.
		render();

		dom.updatePriceContainer.style.display = "none";
	}

	// Handle the discount view.
	function handleDiscountCodeView() {
		var code = dom.discountInput.value.trim();

		app.CartController.applyDiscountCode(code);

		// Clear the discount input
		dom.discountInput.value = ''
	}

	// Cart click handler.
	function handleCartClicks(e) {

		// If we are clicking the delete button.
		if (e.target.className === 'remove' && e.type === 'click') {
			app.CartController.deleteFromCart(e);
		}

		// If we are changing the quantity of an item in the shopping cart.
		if (e.target.parentNode.className === 'item-quantity' && e.type === 'change') {
			app.CartController.quantityChange(e);
		}

		return false;
	}

	// Toggle the tiny cart!
	function handleTinyCart() {
		if (dom.body.classList.contains('cart-opened')) {
			dom.body.classList.remove('cart-opened', 'fixed');
		} else {
			dom.body.classList.add('cart-opened', 'fixed');
		}
	}

	// Public API
	return {
		init: init,
		render: render,
		updateTotalAndSubtotalView: updateTotalAndSubtotalView,
	}
})();