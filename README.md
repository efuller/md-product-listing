# MD Product Listing Page

This was a really great project to work on! I decided to try and implement some sort of MV* pattern, but it was more of an exercise at implementing separation of concerns.

[View the Shopping Cart Demo](https://efuller.github.io/md-product-listing/)

I think the two biggest things I took away during this exercise were:

1. To really start thinking about creating something with a useful API.
2. When showing/hiding things via JS, using body classes to do this is a great way to do it rather than add/removing classes from a nested container.
3. Was able to implement event delegation! Handling events for dynamically created items.

## Features

* Cart will remain hidden until an item is added.
* Toggle the cart view via a button.
* Add items to the cart.
* If an item is already in the cart, don't add it.
* Remove items from the cart.
* Change quantity of items.
* A quantity of zero removes item from cart.
* Update price.
* Pricing is updated upon adding and removing items from the cart.
* Coupon Codes - There are 3 codes you can use. There if has been a code applied and you apply another one, the one that gives the greatest savings will be applied.

	* **5OFFTOTAL** - This will take 5% off the total cart price.
	* **15OFFCANVAS** - This will take 15% off canvas items.
	* **10OFFONE** - This will take 10% off the most expensive item in the cart.

## TODO
[ ] Provide a notification when the user tries to add an item that is already in the cart.  
[ ] Perhaps show the discount on the cart item itself.  
[ ] Certianly some more code refactoring is in order.  
[ ] Testing more possible discount code scenarios .