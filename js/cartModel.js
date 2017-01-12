var app = app || {};

app.CartModel = ( function() {
	var items = [
		{
			quantity: '0',
			image: 'http://unsplash.it/400/400',
			name: 'Image 1',
			description: 'Here is an item description.',
			price: '7.99'
		}
	];

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