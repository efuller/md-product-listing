var app = app || {};

app.CartApp = function() {
	var c = {};

	// Start things up.
	function init () {
		console.log('hi');
		cacheDOM();
		bindEvents();
		app.CartView.init();
	}

	function cacheDOM() {
		c.addToCartBtns = document.querySelectorAll('#cards .add-to-cart');
	}

	function bindEvents() {

		for (var i = 0; i < c.addToCartBtns.length; i++) {
			c.addToCartBtns[i].addEventListener('click', addToCart);
		}
	}

	function addToCart(e) {
		var cartItem = app.Helpers.createCartObject(e.target.parentNode);

		app.CartModel.addItem(cartItem);
		app.CartView.render();
	}

	init();
};

