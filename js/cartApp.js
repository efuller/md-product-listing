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
		c.shoppingCart = document.getElementById('shopping-cart-list');
	}

	function bindEvents() {

		// Bind the Add to Cart button for items.
		for (var i = 0; i < c.addToCartBtns.length; i++) {
			c.addToCartBtns[i].addEventListener('click', addToCart);
		}

		// Bind the delete item from the cart.
		c.shoppingCart.addEventListener('click', deleteFromCart);
	}

	function deleteFromCart(e) {
		// Bail if not clicking the delete button.
		if (e.target.className !== 'remove') {
			return;
		}

		var id = app.Helpers.getGrandParentNode(e.target.parentNode).getAttribute('data-id');

		// Bail if there is no id.
		if (!id) {
			return;
		}

		// Remove the item from the cart model.
		app.CartModel.removeItem(id);
		app.CartView.render();
	}

	function addToCart(e) {
		var cartItem = app.Helpers.createCartObject(e.target.parentNode);

		app.CartModel.addItem(cartItem);
		app.CartView.render();
	}

	init();
};

