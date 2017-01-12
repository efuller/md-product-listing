var app = app || {};

app.CartModel = ( function() {
	var items = [];

	function getItems() {
		return items; // Return cart items.
	}

	function addItem(item) {
		items.push(item);
	}

	return {
		getItems: getItems,
		addItem: addItem,
	}
})();