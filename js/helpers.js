var app = app || {};

app.Helpers = {
	// Private Functions
	createCartObject: function(elem) {
		var cartItemObject = {};

		var id = elem.getAttribute('data-id');
		var name = elem.querySelector('.name').textContent;
		var description = elem.querySelector('.description').textContent;
		var imageURL = elem.querySelector('.item-image').src;
		var price = elem.querySelector('.price').textContent;
		var category = elem.querySelector('.category').textContent;

		return cartItemObject = {
			id: id,
			name: name,
			description: description,
			imageURL: imageURL,
			price: price,
			category: category,
		}
	},
	buildCart: function composeCart(items) {
		var completeOutput = [];

		// Create an element to hold our cart HTML.
		var cart = document.createElement('div');

		// Loop over each cart item.
		items.forEach(function(item) {
			var output = '';
			output += '<div data-id="' + item.id + '" class="item-row">';
			output += '<div class="item-image">';
			output += '<img class="cart item-image" src="http://unsplash.it/80/80" alt="">';
			output += '<p class="category">Art</p>';
			output += '</div>';
			output += '<div class="item-name">';
			output += '<h4>Here is an Item Name</h4>';
			output += '<span class="price">$7.99</span>';
			output += '</div>';
			output += '<div class="item-quantity">';
			output += '<input type="number" value="1" class="quantity">';
			output += '</div>';
			output += '<div class="item-remove">';
			output += '<button class="remove">X</button>';
			output += '</div>';
			output += '</div>';

			completeOutput.push(output);
		});

		// Add in the HTML to our cart element.
		cart.innerHTML = completeOutput.join('');

		// Return our cart!
		return cart;
	},
	getGrandParentNode: function(parentNode) {
		return parentNode.parentNode;
	}
};