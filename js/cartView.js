var app = app || {};

app.CartView = ( function() {

	// Cache object for DOM elements.
	var dom = {};

	// Render the cart.
	function render() {

		// Get all the cart items.
		var items = app.CartModel.getItems();

		if (items.length === 0) {
			app.CartModel.resetCart();
		}

		buildCartView(items);
		app.CartModel.updateDiscount();
		toggleTinyCart();
		updateTinyCartView();
		updateShoppingCartView();
		updateDiscountLabelView();
		updateDiscountCartView();
		updateSubtotalView();
		updateTotalView();
	}

	function updateDiscountLabelView() {
		var code = app.CartModel.getCurrentCode();

		if (!code) {
			dom.discountLabel.innerHTML = '';
			return;
		}

		dom.discountLabel.innerHTML = code;
	}

	function updateDiscountCartView() {
		var discount = app.CartModel.getDiscount();

		if (!discount) {
			dom.discount.innerHTML = '$0.00';
			return;
		}

		dom.discount.innerHTML = '$' + discount;
	}

	function updateTinyCartView() {
		var totalCount = app.CartModel.getTotalItemCount();

		if (!totalCount) {
			return;
		}

		dom.tinyCartCount.textContent = totalCount;
	}

	function updateShoppingCartView() {
		var items = app.CartModel.getItems();

		if (items.length === 0) {
			dom.body.classList.remove('cart-opened', 'fixed');
		}
	}

	function toggleTinyCart() {
		var items = app.CartModel.getItems();

		if (items.length === 0) {
			dom.body.classList.remove('tiny-cart-opened');
		} else {
			dom.body.classList.add('tiny-cart-opened');
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

	// Initialize.
	function init() {
		// Cache the cart
		dom.body = document.body;
		dom.tinyCart = document.getElementById('tiny-cart-container');
		dom.tinyCartCount = dom.tinyCart.querySelector('.cart-count');
		dom.cartList = document.getElementById('shopping-cart-list');
		dom.discount = document.querySelector('.cart-totals .promo-total-value');
		dom.subtotal = document.querySelector('.cart-totals .subtotal-value');
		dom.total = document.querySelector('.cart-totals .total-value');
		dom.discountLabel = document.querySelector('.cart-totals .promo-total-label span');

		render();
	}

	// Public API
	return {
		init: init,
		render: render,
		updateTotalAndSubtotalView: updateTotalAndSubtotalView,
	}
})();