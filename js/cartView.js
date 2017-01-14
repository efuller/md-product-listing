var app = app || {};

app.CartView = ( function() {

	// Cache object for DOM elements.
	var dom = {};

	// Render the cart.
	function render() {

		// Get all the cart items.
		var items = app.CartModel.getItems();

		buildCartView(items);
		updateSubtotalView();
		updateTotalView();
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

	function updateTotalAndSubtotalView() {
		updateSubtotalView();
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

	// Initialize.
	function init() {
		// Cache the cart
		dom.cartList = document.getElementById('shopping-cart-list');
		dom.subtotal = document.querySelector('.cart-totals .subtotal-value');
		dom.total = document.querySelector('.cart-totals .total-value');

		render();
	}

	// Public API
	return {
		init: init,
		render: render,
		updateTotalAndSubtotalView: updateTotalAndSubtotalView,
	}
})();