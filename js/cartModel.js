var app = app || {};

app.CartModel = ( function() {
	var items = [];

	function getItems() {
		return items; // Return cart items.
	}

	function addItem(item) {
		items.push(item);
	}

	function removeItem(id) {
		// Find the item
		var newItems = items.filter(function(item) {
			return item.id !== id;
		});

		items = newItems;
	}

	return {
		getItems: getItems,
		addItem: addItem,
		removeItem: removeItem,
	}
})();