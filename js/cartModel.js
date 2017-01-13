var app = app || {};

app.CartModel = ( function() {

	// The main cart object.
	var cartObject = {
		codes: {
			'10OFFONE': 0.1,
			'15OFFCANVAS': 0.15,
			'5OFFTOTAL': 0.05,
		},
		currentCode: null,
		subtotal: 0,
		total: 0,
		items: [],
	};

	// Get the subtotal.
	function getSubtotal() {
		return cartObject.subtotal;
	}

	function getTotal() {
		return cartObject.total;
	}

	// Get all the items in the cart.
	function getItems() {
		return cartObject.items; // Return cart items.
	}

	// Update total.
	function updateTotal() {

		// If there is no active codes.
		if (!cartObject.currentCode) {
			cartObject.total = cartObject.subtotal;
		}
	}

	// Update subtotal.
	function updateSubtotal() {
		var items = getItems();

		// Calculate the subtotal.
		var subtotal = items.reduce(function(accumulator, current) {
			return accumulator = accumulator + current.quantity * current.price;
		}, 0);

		// Set the subtotal.
		cartObject.subtotal = subtotal;
	}

	// Add an item to the cart.
	function addItem(item) {
		// Push item into the items array.
		cartObject.items.push(item);

		// Update the subtotal.
		updateSubtotal();
		updateTotal();
	}

	// Remove an item from the cart.
	function removeItem(id) {
		// Find the item
		var newItems = cartObject.items.filter(function(item) {
			return item.id !== id;
		});

		// Set the items.
		cartObject.items = newItems;

		// Update the subtotal.
		updateSubtotal();
		updateTotal();
	}

	// Public API
	return {
		getItems: getItems,
		addItem: addItem,
		removeItem: removeItem,
		updateSubtotal: updateSubtotal,
		getSubtotal: getSubtotal,
		getTotal: getTotal,
		updateTotal: updateTotal,
		cartObject: cartObject,
	}
})();