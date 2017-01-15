var app = app || {};

// The controller of sorts.

app.CartController = function() {

	// Cache object for DOM elements.
	var dom = {};

	// Start things up.
	function init () {
		cacheDOM();
		bindEvents();
		app.CartView.init();
	}

	// Cache DOM elements.
	function cacheDOM() {
		dom.body = document.body;
		dom.addToCartBtns = document.querySelectorAll('#cards .add-to-cart');
		dom.shoppingCartList = document.getElementById('shopping-cart-list');
		dom.updatePriceContainer = document.getElementById('update-price-container');
		dom.updatePrice = document.getElementById('update-price');
		dom.discountBtn = document.getElementById('discount-code-btn');
		dom.discountInput = document.getElementById('promo-code');
		dom.tinyCart = document.getElementById('tiny-cart-container');
		dom.shoppingCart = document.getElementById('shopping-cart');
		dom.overlay = document.getElementById('overlay');
	}

	// Bind events.
	function bindEvents() {

		// Bind the Add to Cart button for items.
		for (var i = 0; i < dom.addToCartBtns.length; i++) {
			dom.addToCartBtns[i].addEventListener('click', addToCart);
		}

		// Bind the delete item from the cart.
		dom.shoppingCartList.addEventListener('click', handleCartClicks);

		// Bind the update price button.
		dom.updatePrice.addEventListener('click', handlePriceUpdate);

		// Bind discount code button.
		dom.discountBtn.addEventListener('click', handleDiscountCode);

		// Bind a change event for the quantity input.
		dom.shoppingCart.addEventListener('change', handleCartClicks);

		// Bind tiny cart button to shopping cart.
		dom.tinyCart.addEventListener('click', handleTinyCart, false);

		dom.overlay.addEventListener('click', handleTinyCart);
	}

	function handleTinyCart(e) {
		if (dom.body.classList.contains('cart-opened')) {
			dom.body.classList.remove('cart-opened', 'fixed');
		} else {
			dom.body.classList.add('cart-opened', 'fixed');
		}
	}

	// Delete item from cart.
	function deleteFromCart(e) {
		// Get the id of the item.
		var id = app.Helpers.getGrandParentNode(e.target.parentNode).getAttribute('data-id');

		// Bail if there is no id.
		if (!id) {
			return;
		}

		// Remove the item from the cart model.
		app.CartModel.removeItem(id);
		app.CartView.render();
	}

	function handleDiscountCode(e) {
		var userCode = dom.discountInput.value.trim();

		// Check to see if it is a valid code.
		if (!app.CartModel.isValidCode(userCode)) {
			console.warn('Not a valid code');
			return;
		}

		app.CartModel.setCurrentCode(userCode);

		// If it is, update the total price
		app.CartModel.updateDiscount();
		app.CartView.updateTotalAndSubtotalView();

		// Clear the discount input
		dom.discountInput.value = '';
	}

	// Handle quantity changes.
	function handleQuantityChange(e) {
		var id = app.Helpers.getGrandParentNode(e.target.parentNode).getAttribute('data-id');
		var value = e.target.value;

		// If quantity is 0.
		if (parseInt(value) <= 0) {
			app.CartModel.removeItem(id);
			app.CartView.render();
		} else {
			app.CartModel.updateByID(id, {quantity: value});
			dom.updatePriceContainer.style.display = "flex";
		}
	}

	// Cart click handler.
	function handleCartClicks(e) {

		// If we are clicking the delete button.
		if (e.target.className === 'remove' && e.type === 'click') {
			deleteFromCart(e);
		}

		// If we are changing the quantity of an item in the shopping cart.
		if (e.target.parentNode.className === 'item-quantity' && e.type === 'change') {
			handleQuantityChange(e);
		}

		return false;
	}

	function handlePriceUpdate() {
		app.CartModel.updateSubtotal();
		app.CartModel.updateDiscount();
		app.CartModel.updateTotal();
		app.CartView.render();
		dom.updatePriceContainer.style.display = "none";
	}

	// Add and item to the cart.
	function addToCart(e) {
		var parentElem = e.target.parentNode;

		var id = parentElem.getAttribute('data-id');

		if (app.CartModel.isInCart(id)) {
			return;
		}

		var cartItem = app.Helpers.createCartObject(parentElem);

		app.CartModel.addItem(cartItem);
		app.CartView.render();
	}

	// Engage.
	init();
};

