/**
 * Constructor function to create a Product object.
 * @param {string} ID - The product ID.
 * @param {string} name - The name of the product.
 * @param {string} description - The description of the product.
 * @param {number} price - The price of the product.
 * @param {string} brand - The brand of the product.
 * @param {string} activeSize - The active size of the product.
 * @param {number} quantity - The quantity of the product.
 * @param {Date} date - The date the product was created.
 * @param {Array.<Object>} reviews - An array of product reviews.
 * @param {Array.<string>} images - An array of image URLs associated with the product.
 */
function Product(ID = "", name = "", description = "", price = 0.0, brand = "", activeSize = "", quantity = 0, date = new Date(), reviews = [], images = []) {
    // Checking properties and their types before assignment
    if (!(typeof ID === 'string' ||
        typeof name === 'string' ||
        typeof description === 'string' ||
        typeof price === 'number' ||
        typeof brand === 'string' ||
        //Array.isArray(sizes) && sizes.every(size => typeof size === 'string') ||
        typeof activeSize === 'string' ||
        Number.isInteger(quantity) ||
        date instanceof Date ||
        Array.isArray(reviews) ||
        reviews.every(review => typeof review === 'object') ||
        Array.isArray(images)
        || images.every(image => typeof image === 'string')
    )) { throw new Error("Incorrect product properties."); }

    // Product object properties
    this.ID = ID;
    this.name = name;
    this.description = description;
    this.price = parseFloat(price);
    this.brand = brand;
    this.sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    this.activeSize = activeSize;
    this.quantity = parseInt(quantity);
    this.date = new Date(date);
    this.reviews = Array.isArray(reviews) ? reviews : [];
    this.images = Array.isArray(images) ? images : [];

    // we implement getter and setter for each field of the object
    Product.prototype.getMyID = function () {
        return this.ID;
    }
    Product.prototype.setMyID = function (newID) {
        if (typeof newID === 'string') {
            this.ID = newID;
        } else {
            throw new Error("Invalid ID type. ID must be a string.");
        }
    }
    Product.prototype.getMyName = function () {
        return this.name;
    }
    Product.prototype.setMyName = function (newName) {
        if (typeof newName === 'string') {
            this.name = newName;
        } else {
            throw new Error("Invalid name type. Name must be a string.");
        }
    }
    Product.prototype.getMyDescription = function () {
        return this.description;
    }
    Product.prototype.setMyDescription = function (newDescription) {
        if (typeof newDescription === 'string') {
            this.description = newDescription;
        } else {
            throw new Error("Invalid description type. Description must be a string.");
        }
    }
    Product.prototype.getMyPrice = function () {
        return this.price;
    }
    Product.prototype.setMyPrice = function (newPrice) {
        if (typeof newPrice === 'number') {
            this.price = parseFloat(newPrice);
        } else {
            throw new Error(" Invalid price type. Price must be a non-negative number.");
        }
    }
    Product.prototype.getMyBrand = function () {
        return this.brand;
    }
    Product.prototype.setMyBrand = function (newBrand) {
        if (typeof newBrand === 'string') {
            this.brand = newBrand;
        } else {
            throw new Error(" Invalid brand type. Brand must be a string.");
        }
    }
    Product.prototype.getMySizes = function () {
        return this.sizes;
    }
    Product.prototype.setMySizes = function (newSizes) {
        if (Array.isArray(newSizes)) {
            this.sizes = newSizes;
        } else {
            throw new Error("Invalid sizes type. Sizes must be a string.");
        }
    }
    Product.prototype.getMyActiveSize = function () {
        return this.activeSize;
    }
    Product.prototype.setMyActiveSize = function (newActiveSize) {
        if (typeof newActiveSize === 'string') {
            this.activeSize = newActiveSize;
        } else {
            throw new Error(" Invalid activeSize type. ActiveSize must be a string.");
        }
    }
    Product.prototype.getMyQuantity = function () {
        return this.quantity;
    }
    Product.prototype.setMyQuantity = function (newQuantity) {
        if (Number.isInteger(newQuantity) && newQuantity >= 0) {
            this.quantity = newQuantity;
        } else {
            throw new Error("Invalid quantity type. Quantity must be a non-negative integer.");
        }
    }
    Product.prototype.getMyDate = function () {
        return this.date;
    }
    Product.prototype.setMyDate = function (newDate) {
        if (newDate instanceof Date && !isNaN(newDate) && newDate.toString() !== 'Invalid Date' && newDate.getTime() > 0) {
            this.date = newDate;
        } else {
            throw new Error(" Invalid date type. Date must be a valid Date object.");
        }
    }
    Product.prototype.getMyReviews = function () {
        return this.reviews;
    }
    Product.prototype.setMyReviews = function (newReviews) {
        if (Array.isArray(newReviews) && newReviews.every(review => typeof review === 'object')) {
            this.reviews = newReviews;
        } else {
            throw new Error(" Invalid reviews type. Reviews must be an array of review objects.");
        }
    }
    Product.prototype.getMyImages = function () {
        return this.images;
    }
    Product.prototype.setMyImages = function (newImages) {
        if (Array.isArray(newImages) && newImages.every(image => typeof image === 'string')) {
            this.images = newImages;
        } else {
            throw new Error(" Invalid images type. Images must be an array of strings.");
        }
    }
    // The method returns the "review" object by the given key    
    Product.prototype.getReviewByID = function (reviewID) {
        const foundReview = this.reviews.find(review => review.ID === reviewID);
        return foundReview || null;
    }
    /* The method returns the image by the passed parameter,
     if the parameter was not passed then the first image from the array */
    Product.prototype.getImage = function (parameter) {
        if (parameter !== undefined && parameter < this.images.length) {
            return this.images[parameter];
        } else {
            return this.images[0];
        }
    }
    /* The method adds a new value to the "sizes" array 
     it's easiest to add it to the end of the array - this.sizes.puch(newSize);
     but perhaps  it is necessary to add not to the end of the array, but according to the specified index,
    or the next by a certain size sizeToFind */
    Product.prototype.addSize = function (newSize, previousSize) {
        // if the dimensions array is empty 
        if (this.sizes.length === 0) {
            if (typeof newSize === 'string') {
                this.sizes.push(newSize);
            } else {
                console.log("Invalid size type. Size must be a string.");
            }
        } else {
            // We check that the dimensions array does not contain the dimension we want to add
            if (!this.sizes.includes(newSize)) {
                /* unless specified the size after which it should be inserted
                and the size to be set is not contained in the array*/
                if (!previousSize || !this.sizes.includes(previousSize)) {
                    if (typeof newSize === 'string') {
                        this.sizes.push(newSize);
                    } else {
                        console.log("Invalid size type. Size must be a string.");
                    }
                } else {
                    const index = this.sizes.indexOf(previousSize);
                    this.sizes.splice(index + 1, 0, newSize);
                }
            } else {
                console.log("The specified size already exists in the size array");
            }
        }
    }
    // The method removes a value from the "sizes" array by the given key - index
    Product.prototype.deleteSize = function (index) {
        // check whether the index is in the available range
        if (index >= 0 && index < this.sizes.length) {
            this.sizes.splice(index, 1);
        } else {
            console.log("Error: Invalid index for size deletion.");
        }
    }
    // A method to add a new object "review" to an array "reviews"
    Product.prototype.addReview = function (newReview) {
        if (typeof newReview === 'object') {
            this.reviews.push(newReview);
        } else {
            console.log("Error: You are trying to add a review with invalid property types");
        }
    }
    // The method deletes the "review" object from the "reviews" array by the given key (ID)   
    Product.prototype.deleteReview = function (ID) {
        //We use the method findIndex to search by key in an array of objects
        const index = this.reviews.findIndex(review => review.ID === ID);
        if (index !== -1) {
            this.reviews.splice(index, 1);
        } else {
            throw new Error("Review with the given ID not found.");
        }
    }
    // The method returns the average score of the product    
    Product.prototype.getAverageRating = function () {
        if (this.reviews.length === 0) {
            throw new Error("There are no reviews for this product yet");
        } else {
            // calculation of the sum of components rating all reviews carried out using the method reduce  
            const totalRating = this.reviews.reduce((sum, review) => {
                const ratingKeys = Object.keys(review.rating);
                const ratingSum = ratingKeys.reduce((sum, key) => sum + review.rating[key], 0);
                return sum + ratingSum;
            }, 0);
            // Average product rating
            const averageRating = totalRating / (this.reviews.length * Object.keys(this.reviews[0].rating).length);
            return averageRating;
        }
    }
    /*
     method to display all information in the console, inclusive з rating 
     this method is designed to make testing easier
    */
    Product.prototype.toFormattedString = function () {
        const formattedProduct = {
            ID: this.ID,
            name: this.name,
            description: this.description,
            price: this.price,
            brand: this.brand,
            sizes: this.sizes,
            activeSize: this.activeSize,
            quantity: this.quantity,
            date: this.date,
            reviews: this.reviews.map(review => ({
                ...review,
                rating: {
                    service: review.rating.service,
                    price: review.rating.price,
                    value: review.rating.value,
                    quality: review.rating.quality
                }
            })),
            images: this.images
        };
        return JSON.stringify(formattedProduct, null, 2);
    }
}
// we create an associative array "rating"
const rating = {
    "service": 0,
    "price": 0,
    "value": 0,
    "quality": 0
}
// we create object "review" with the specified properties
const review = {
    ID: "",
    author: "",
    date: new Date(),
    comment: "",
    rating: rating
}
/**
 * Search products based on the provided search string.
 * @param {Array} products - The array of products to search through.
 * @param {string} search - The search string.
 * @returns {Array} - An array of products that match the search criteria.
 */
function searchProducts(products, search) {
    const searchPattern = search
        .replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') /* screening all found (\\$&) of all coincidences (/g) special characters. This is what the text does search safe to use in regular expressions, and they will treat these symbols as normal symbols.*/
        .replace(/\*/g, '.*'); // Replacing "*" with ".*" for advanced search with this flag the search finds all matches, without it
    const searchRegex = new RegExp(searchPattern, 'i') // with this flag the search is case-insensitive;
    const searchResult = products.filter(obj => {
        return (
            // test checks if there is at least one match
            searchRegex.test(obj.name) || searchRegex.test(obj.description)
        );
    });
    return searchResult;
}
/**
 * Sorts an array of products based on a given sorting rule.
 *
 * @param {Array} products - The array of products to be sorted.
 * @param {string} sortRule - The sorting rule ('price', 'name', 'ID').
 * @returns {Array} - A new array containing the sorted products.
 */
function sortProducts(products, sortRule) {
    //  future sorted array - surfacearray copy
    const sortedProducts = products.slice();
    // We sort the array according to the given parameter
    sortedProducts.sort((a, b) => compareFn(a, b, sortRule));
    return sortedProducts;
}
/**
 * Compare two products based on a given sorting rule.
 * @param {Object} firstProduct - The first product to compare.
 * @param {Object} secondProduct - The second product to compare.
 * @param {string} sortRule - The sorting rule ('price', 'name', 'ID').
 * @returns {number} - - A number indicating the comparison result:
 *                    -1 if firstProduct < secondProduct, 
 *                     1 if firstProduct > secondProduct,
 *                     0 if firstProduct === secondProduct.
 */
function compareFn(firstProduct, secondProduct, sortRule) {
    switch (sortRule) {
        case "price":
            return firstProduct.price - secondProduct.price;
        case "name":
            return firstProduct.name.localeCompare(secondProduct.name);
        case "ID":
            return firstProduct.ID.localeCompare(secondProduct.ID);
        default:
            return 0;
    }
}
// We export the constructor function and the necessary functions
export { Product, searchProducts, sortProducts };