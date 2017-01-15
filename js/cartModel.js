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
		discount: 0,
		subtotal: 0,
		total: 0,
		items: [],
	};

	// Get discount codes
	function getDiscountCodes() {
		return cartObject.codes;
	}


	// Get the cart.
	function getCart() {
		return cartObject;
	}

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

	// Get the highest priced item in the cart.
	function getHighestPricedItem() {
		var items = getItems();

		// Bail if no items.
		if (!items) {
			return;
		}

		// Sort the items on price.
		var sorted = items.sort(function(a,b) {
			return a.price - b.price;
		});

		return sorted[sorted.length - 1];
	}

	// See if an item is already in the cart.
	function isInCart(id) {
		// Get the cart items.
		var items = getItems();

		// Check and see if the item is in the cart.
		var inCart = items.filter(function(item) {
			return item.id === id;
		});

		return inCart.length > 0;
	}

	// Update and item by ID.
	function updateByID(id, obj) {

		// Loop over the cart items and update the appropriate one.
		cartObject.items.forEach(function(cartItem) {
			// If we found an item with the provided ID.
			if (parseInt(cartItem.id) === parseInt(id)) {
				// Loop over the items properties and change them.
				for(var prop in obj) {
					if (obj[prop] !== cartItem[prop]) {
						cartItem[prop] = obj[prop];
					}
				}
			}
		});
	}

	// Find by category
	function findByCategory(category) {
		var items = getItems();

		return items.filter(function(item) {
			return item.category.toLowerCase() === category.toLowerCase();
		});
	}

	// Update total.
	function updateTotal() {
		cartObject.total = cartObject.subtotal - cartObject.discount;
	}

	function isValidCode(code) {
		var codes = getDiscountCodes();

		if (!codes[code]) {
			return false;
		}

		return true;
	}

	function setCurrentCode(code) {

		// Bail if no code.
		if (!code) {
			return;
		}

		cartObject.currentCode = code;
	}

	function getCurrentCode() {
		return cartObject.currentCode;
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

	function isItWorthIt(newDiscount) {
		// Bail if there is no current code.
		if (!getCurrentCode()) {
			return true;
		}

		var potentialDiscount = cartObject.subtotal - newDiscount;

		return potentialDiscount <= cartObject.total;
	}

	function updateDiscount() {
		var code = getCurrentCode();

		// Bail if no code
		if (!code) {
			return;
		}

		code = code.toUpperCase();

		// This is where all the magic will happen.
		switch(code) {
			case "10OFFONE":
				var highestPricedItem = getHighestPricedItem();
				var discount10 = (highestPricedItem.price * highestPricedItem.quantity) * cartObject.codes["10OFFONE"];

				// Bail if it's not worth it!
				if (!isItWorthIt(discount10)) {
					break;
				}

				cartObject.discount = discount10.toFixed(2);
				updateTotal();
				break;
			case "15OFFCANVAS":
				var canvasItems = findByCategory('canvas');
				var totalPrice = 0;

				if (canvasItems.length === 1) {
					totalPrice = canvasItems[0].price * canvasItems[0].quantity;
				} else {
					totalPrice = canvasItems.reduce(function(acc, current) {
						return parseFloat(acc) + parseFloat(current.price * current.quantity);
					}, 0);
				}

				var discount15 = totalPrice * cartObject.codes["15OFFCANVAS"];

				if (!isItWorthIt(discount15)) {
					break;
				}

				cartObject.discount = discount15.toFixed(2);
				updateTotal();

				break;
			case "5OFFTOTAL":
				var discount5 = cartObject.subtotal * cartObject.codes["5OFFTOTAL"];

				// Bail if it's not worth it!
				if (!isItWorthIt(discount5)) {
					break;
				}

				cartObject.discount = discount5.toFixed(2);
				updateTotal();
				break;
			default:
				break;
		}
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
		updateDiscount();
		updateTotal();
	}

	// Public API
	return {
		getItems: getItems,
		getCart: getCart,
		addItem: addItem,
		removeItem: removeItem,
		updateSubtotal: updateSubtotal,
		getSubtotal: getSubtotal,
		getTotal: getTotal,
		isInCart: isInCart,
		updateTotal: updateTotal,
		updateByID: updateByID,
		cartObject: cartObject,
		isValidCode: isValidCode,
		setCurrentCode: setCurrentCode,
		getCurrentCode: getCurrentCode,
		updateDiscount: updateDiscount,
	}
})();