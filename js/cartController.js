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
		dom.addToCartBtns = document.querySelectorAll('#cards .add-to-cart');
		dom.shoppingCart = document.getElementById('shopping-cart-list');
		dom.updatePriceContainer = document.getElementById('update-price-container');
		dom.updatePrice = document.getElementById('update-price');
	}

	// Bind events.
	function bindEvents() {

		// Bind the Add to Cart button for items.
		for (var i = 0; i < dom.addToCartBtns.length; i++) {
			dom.addToCartBtns[i].addEventListener('click', addToCart);
		}

		// Bind the delete item from the cart.
		dom.shoppingCart.addEventListener('click', handleCartClicks);

		dom.updatePrice.addEventListener('click', handlePriceUpdate);

		// Bind a change event for the quantity input
		dom.shoppingCart.addEventListener('change', handleCartClicks)
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
		app.CartModel.updateTotal();
		app.CartView.render();
	}

	// Add and item to the cart.
	function addToCart(e) {
		var cartItem = app.Helpers.createCartObject(e.target.parentNode);

		app.CartModel.addItem(cartItem);
		app.CartView.render();
	}

	// Engage.
	init();
};

