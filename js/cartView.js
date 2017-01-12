var app = app || {};

app.CartView = ( function() {

	var c = {}; // Cache object.

	function render() {

		// Get all the cart items.
		var items = app.CartModel.getItems();

		// Build the cart
		var cart = app.Helpers.buildCart(items);

		c.cartList.innerHTML = '';
		// Append the cart to the DOM.
		c.cartList.appendChild(cart);
	}

	function init() {
		// Cache the cart
		c.cartList = document.getElementById('shopping-cart-list');

		render();
	}

	return {
		init: init,
		render: render,
	}
})();