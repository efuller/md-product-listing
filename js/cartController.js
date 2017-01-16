var app = app || {};

// The controller of sorts.

app.CartController = ( function() {

	// Cache object for DOM elements.
	var dom = {};

	// Start things up.
	function init () {

		// Cache the DOM.
		cacheDOM();
	}

	// Cache DOM elements.
	function cacheDOM() {
		dom.updatePriceContainer = document.getElementById('update-price-container');
	}

	// Delete item from cart.
	// @todo This function can be refactored further. Move some functionality into view.
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

	// Apply a discount code.
	function applyDiscountCode(code) {

		// Check to see if it is a valid code.
		if (!app.CartModel.isValidCode(code)) {
			console.warn('Not a valid code');
			return;
		}

		// Set the current code.
		app.CartModel.setCurrentCode(code);

		// If it is, update the total price
		app.CartModel.updateDiscount();
		app.CartView.updateTotalAndSubtotalView();
	}

	// Handle quantity changes.
	function quantityChange(e) {
		var id = app.Helpers.getGrandParentNode(e.target.parentNode).getAttribute('data-id');
		var value = e.target.value;

		// If quantity is 0.
		if (parseInt(value) <= 0) {
			app.CartModel.removeItem(id);
			app.CartView.render();
		} else {
			app.CartModel.updateByID(id, {quantity: value});
			// @todo This shouldn't be here. It should be part of the view.
			dom.updatePriceContainer.style.display = "flex";
		}
	}

	// Update the price.
	function priceUpdate() {
		app.CartModel.updateSubtotal();
		app.CartModel.updateDiscount();
		app.CartModel.updateTotal();
	}

	// Add and item to the cart.
	// @todo This function needs refactored. Some of this can be put into the view function.
	function addToCart(e) {

		// Get the parent element.
		var parentElem = e.target.parentNode;

		// Get the ID from the parent element.
		var id = parentElem.getAttribute('data-id');

		// Bail if the item is already in the cart.
		if (app.CartModel.isInCart(id)) {
			return;
		}

		// Compose the cart item.
		var cartItem = app.Helpers.createCartObject(parentElem);

		// Insert the cart item.
		app.CartModel.addItem(cartItem);

		// Render.
		app.CartView.render();
	}

	function updateDiscount() {
		app.CartModel.updateDiscount();
	}

	// Engage.
	init();

	// Public API.
	return {
		deleteFromCart: deleteFromCart,
		quantityChange: quantityChange,
		priceUpdate: priceUpdate,
		applyDiscountCode: applyDiscountCode,
		addToCart: addToCart,
		updateDiscount: updateDiscount,
	}
})();

