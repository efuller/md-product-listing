var app = app || {};

/**
 * A sort of modal for our cart object.
 * @todo There are many functions here that could/should be pulled into the controller.
 */

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

	// Get discount codes.
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

	// Get the cart total.
	function getTotal() {
		return cartObject.total;
	}

	// Get all the items in the cart.
	function getItems() {
		return cartObject.items; // Return cart items.
	}

	// Get the discount.
	function getDiscount() {
		return cartObject.discount;
	}

	// Get total item count. This includes quantity of each.
	function getTotalItemCount() {
		var items = getItems();

		// Get the total count.
		var total = items.reduce(function(acc, current) {
			return acc += parseInt(current.quantity);
		}, 0);

		return total;
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

	// Reset all car values.
	function resetCart() {
		cartObject.items = [];
		cartObject.currentCode = null;
		cartObject.discount = 0;
		cartObject.subtotal = 0;
		cartObject.total = 0;
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

	// Find by category.
	function findByCategory(category) {
		var items = getItems();

		// Return the item in the provided category.
		return items.filter(function(item) {
			return item.category.toLowerCase() === category.toLowerCase();
		});
	}

	// Update total.
	function updateTotal() {
		cartObject.total = cartObject.subtotal - cartObject.discount;
	}

	// Check to see if a code is valid.
	function isValidCode(code) {
		var codes = getDiscountCodes();

		if (codes[code]) {
			return true;
		}

		return false;
	}

	// Get the current code.
	function getCurrentCode() {
		return cartObject.currentCode;
	}

	// Set the current code.
	function setCurrentCode(code) {

		// Bail if no code.
		if (!code) {
			return;
		}

		// The the new code better than the current?
		if (!isItWorthIt(code)) {
			return;
		}

		cartObject.currentCode = code;
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

	// Is the newer code better than the previous?
	function isItWorthIt(newCode) {

		if (!isValidCode(newCode)) {
			console.warn('Not a valid code.');
			return false;
		}

		// Figure the new discount.
		var newDiscount = calculateDiscounts(newCode);

		// This is what we got!
		var potentialDiscount = cartObject.subtotal - newDiscount;

		return potentialDiscount <= cartObject.total;
	}

	// Calculate the discounts.
	function calculateDiscounts(code) {

		// If using the "10OFFONE" code.
		if (code === "10OFFONE") {
			var highestPricedItem = getHighestPricedItem();
			return (highestPricedItem.price * highestPricedItem.quantity) * cartObject.codes["10OFFONE"];
		}

		// If using the "15OFFCANVAS" code.
		if (code === "15OFFCANVAS") {
			var canvasItems = findByCategory('canvas');
			var totalPrice = 0;

			// Calculate total price.
			if (canvasItems.length === 1) {
				totalPrice = canvasItems[0].price * canvasItems[0].quantity;
			} else {
				totalPrice = canvasItems.reduce(function(acc, current) {
					return parseFloat(acc) + parseFloat(current.price * current.quantity);
				}, 0);
			}

			return totalPrice * cartObject.codes["15OFFCANVAS"];
		}

		// If using the "5OFFTOTAL" code.
		if (code === "5OFFTOTAL") {
			return cartObject.subtotal * cartObject.codes["5OFFTOTAL"];
		}

		return false;
	}

	// Update the discount.
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

				// Bail if it's not worth it!
				if (!isItWorthIt(code)) {
					break;
				}

				// Calculate the discount.
				var discount10 = calculateDiscounts(code);

				// Set the discount.
				cartObject.discount = discount10.toFixed(2);

				// Update the total.
				updateTotal();
				break;
			case "15OFFCANVAS":

				// Bail if the new code isn't worth it.
				if (!isItWorthIt(code)) {
					break;
				}

				// Calculate the discount.
				var discount15 = calculateDiscounts(code);

				// Set the discount.
				cartObject.discount = discount15.toFixed(2);

				// Update the total.
				updateTotal();
				break;
			case "5OFFTOTAL":

				// Bail if it's not worth it!
				if (!isItWorthIt(code)) {
					break;
				}

				// Calculate the discount.
				var discount5 = calculateDiscounts(code);

				// Set the discount.
				cartObject.discount = discount5.toFixed(2);

				// Update the total.
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

		// If no items, reset the cart.
		if (newItems.length === 0) {
			resetCart();
			return false;
		}

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
		resetCart: resetCart,
		getTotalItemCount: getTotalItemCount,
		getDiscount: getDiscount,
	}
})();