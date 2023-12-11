/**
 * constructor function to create a AbstractProduct object based on the property description
 */
export class AbstractProduct {
    /**
    * Creates a new AbstractProduct object (product).
    * @constructor
    * @param {string} ID - product key.
    * @param {string} name - product name.
    * @param {string} description - Brief description of the product.
    * @param {number} price - product price.   
    * @param {number} quantity - Number of units of the product in stock.
    * @param {Array.<object>} reviews - An array of objects with reviews.
    * @param {Array.<string>} images - An array of product image URLs. 
    * @param {Date} date - Date of manufacture of the produc  
    * @param {string} brand - product brand.
    */
    constructor(ID = "", name = "", description = "", price = 0.0, quantity = 0, reviews = [], images = [], date = new Date(), brand = "") {
        // Checking properties and their types before assignment
        if (!(typeof ID === 'string' ||
            typeof name === 'string' ||
            typeof description === 'string' ||
            Number.isInteger(quantity) ||
            typeof price === 'number' ||
            Array.isArray(reviews) || reviews.every(review => typeof review === 'object') ||
            Array.isArray(images) || images.every(image => typeof image === 'string') ||
            date instanceof Date ||
            typeof brand === 'string'
        )) { throw new Error("Incorrect product properties."); }
        {
            this.ID = ID;
            this.name = name;
            this.description = description;
            this.price = parseFloat(price);
            this.quantity = parseInt(quantity);
            this.reviews = Array.isArray(reviews) ? reviews : [];
            this.images = images;
            this.date = new Date(date);
            this.brand = brand;
        }
    }

    /**
    * Get the value of a specific property by name.
    * @param {string} propertyName - The name of the property.
    * @returns {*} - The value of the specified property.
    */
    getMyProperty(propertyName) {
        if (this.hasOwnProperty(propertyName)) {
            return this[propertyName];
        } else {
            throw new Error(`Property '${propertyName}' does not exist.`);
        }
    }
    /**
    * Set the value of a specific property by name.
    * @param {string} propertyName - The name of the property.
    * @param {*} value - The new value to set.
    */
    setMyProperty(propertyName, value) {
        if (this.hasOwnProperty(propertyName)) {
            this[propertyName] = value;
        } else {
            throw new Error(`Property '${propertyName}' does not exist.`);
        }
    }

    // we implement getter and setter for each field of the object
    getMyID() {
        return this.ID;
    }
    setMyID(newID) {
        if (typeof newID === 'string') {
            this.ID = newID;
        } else {
            throw new Error("Invalid ID type. ID must be a string.");
        }
    }
    getMyName() {
        return this.name;
    }
    setMyName(newName) {
        if (typeof newName === 'string') {
            this.name = newName;
        } else {
            throw new Error("Invalid name type. Name must be a string.");
        }
    }
    getMyDescription() {
        return this.description;
    }
    setMyDescription(newDescription) {
        if (typeof newDescription === 'string') {
            this.description = newDescription;
        } else {
            throw new Error("Invalid description type. Description must be a string.");
        }
    }
    getMyPrice() {
        return this.price;
    }
    setMyPrice(newPrice) {
        if (typeof newPrice === 'number') {
            this.price = parseFloat(newPrice);
        } else {
            throw new Error(" Invalid price type. Price must be a non-negative number.");
        }
    }
    getMyBrand() {
        return this.brand;
    }
    setMyBrand(newBrand) {
        if (typeof newBrand === 'string') {
            this.brand = newBrand;
        } else {
            throw new Error(" Invalid brand type. Brand must be a string.");
        }
    }
    getMyQuantity() {
        return this.quantity;
    }
    setMyQuantity(newQuantity) {
        if (Number.isInteger(newQuantity) && newQuantity >= 0) {
            this.quantity = newQuantity;
        } else {
            throw new Error("Invalid quantity type. Quantity must be a non-negative integer.");
        }
    }
    getMyDate() {
        return this.date;
    }
    setMyDate(newDate) {
        if (newDate instanceof Date && !isNaN(newDate) && newDate.toString() !== 'Invalid Date' && newDate.getTime() > 0) {
            this.date = newDate;
        } else {
            throw new Error(" Invalid date type. Date must be a valid Date object.");
        }
    }
    getMyReviews() {
        return this.reviews;
    }
    setMyReviews(newReviews) {
        if (Array.isArray(newReviews) && newReviews.every(review => typeof review === 'object')) {
            this.reviews = newReviews;
        } else {
            throw new Error(" Invalid reviews type. Reviews must be an array of review objects.");
        }
    }
    getMyImages() {
        return this.images;
    }
    setMyImages(newImages) {
        if (Array.isArray(newImages) && newImages.every(image => typeof image === 'string')) {
            this.images = newImages;
        } else {
            throw new Error(" Invalid images type. Images must be an array of strings.");
        }
    }
    // The method returns the "review" object by the given key    
    getReviewByID(reviewID) {
        const foundReview = this.reviews.find(review => review.ID === reviewID);
        return foundReview || null;
    }
    /* The method returns the image by the passed parameter,
     if the parameter was not passed then the first image from the array */
    getImage(parameter) {
        if (parameter !== undefined && parameter < this.images.length) {
            return this.images[parameter];
        } else {
            return this.images[0];
        }
    }

    // A method to add a new object "review" to an array "reviews"
    addReview(newReview) {
        if (typeof newReview === 'object') {
            this.reviews.push(newReview);
        } else {
            console.log("Error: You are trying to add a review with invalid property types");
        }
    }
    // The method deletes the "review" object from the "reviews" array by the given key (ID)   
    deleteReview(ID) {
        //We use the method findIndex to search by key in an array of objects
        const index = this.reviews.findIndex(review => review.ID === ID);
        if (index !== -1) {
            this.reviews.splice(index, 1);
        } else {
            console.log("Error: Review with the given ID not found.");
        }
    }
    // The method returns the average score of the product    
    getAverageRating() {
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
    toFormattedString() {
        const formattedAbstractProduct = {
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
        return JSON.stringify(formattedAbstractProduct, null, 2);
    }

    /**
     * Returns a string with the values of all properties.
     * @returns {string} - String with property values.
     */
    getFullInformation() {
        return (
            `ID: ${this.ID}\n` +
            `Name: ${this.name}\n` +
            `Description: ${this.description}\n` +
            `Price: ${this.price}\n` +
            `Brand: ${this.brand}\n` +
            `Active Size: ${this.activeSize}\n` +
            `Quantity: ${this.quantity}\n` +
            `Date: ${this.date.toString()}\n` +
            `Reviews: ${JSON.stringify(this.reviews)}\n` +
            `Images: ${JSON.stringify(this.images)}`
        );
    }

    // Returns the price for n products of this type
    getPriceForQuantity(int) {
        if (Number.isInteger(int) && int > 0) {
            const totalCost = this.price * int;
            const formattedCost = totalCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            return formattedCost;
        } else {
            throw new Error("Invalid quantity. Quantity must be a positive integer.");
        }
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
// A search function that returns an array of objects that contain text in the name or description
export function searchAbstractProducts(products, search) {
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
// A function of sorting products by price, name and ID
export function sortAbstractProducts(products, sortRule) {
    //  future sorted array - surfacearray copy
    const sortedProducts = products.slice();
    // We sort the array according to the given parameter
    sortedProducts.sort((a, b) => compareFn(a, b, sortRule));
    return sortedProducts;
}
// A function to compare two products based on a given parameter
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