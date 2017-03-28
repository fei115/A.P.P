var amazon = require('amazon-product-api');
var config = require('../config/config.js');

var client = amazon.createClient({
	awsId: config.aws.accessKeyId,
	awsSecret: config.aws.secretKey,
	awsTag: config.aws.associateTag
});

/**
 * Look up a book using ISBN, returns an object with structure of
 * a 'Book' model.
 */
function bookLookUp(isbn) {
	return client.itemLookup({
		idType: 'ISBN',
		itemId: isbn, 
		includeReviewsSummary: false,
		truncateReviewsAt: 0,
		MerchantId: 'Amazon',
		SearchIndex: 'Books',
		responseGroup: 'ItemAttributes, OfferSummary, Images',
		condition: 'New'
	})
	.then(function(results) {
		return resultToBookData(results[0], isbn);
	})
	.catch(function(err) {
		throw err;
	});
}

/**
 * Convert the response from Amazon to look like
 * the 'Book' model.  
 * Note: ISBN is passed here in case Amazon re-formatted the ISBN.
 */
function resultToBookData(result, isbn) { 
	var bookData = {
		title: result.ItemAttributes[0].Title[0],
		isbn: isbn,
		authors: result.ItemAttributes[0].Author,
		thumbnail: result.LargeImage[0].URL[0],
		amazon: result.OfferSummary[0].LowestNewPrice[0].Amount[0] / 100
	};
	return bookData;
}

module.exports = {
	bookLookUp
}