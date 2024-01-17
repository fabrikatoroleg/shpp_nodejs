/** 
 * file for checking the operation of methods in the console
 * import the product creation constructor, as well as processing methods
 */
import { Product, searchProducts, sortProducts } from './product.js';

const product1 = new Product();
// We check the work of the setters
product1.setMyID('A1');
product1.setMyName('Футболка');
product1.setMyDescription('Для виготовлення футболок застосовуються різні види легкого трикотажного полотна (бавовну, змішану бавовну (з еластаном, поліестером), віскозу, віскозу з еластаном, чистий поліестер). Щільність тканин різниться в межах від 110 до 260 г/м².');
product1.setMyPrice(199.99);
product1.setMyBrand('Puma');
product1.setMySizes(['XLS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']);
product1.setMyActiveSize('XL');
product1.setMyQuantity(100);
product1.setMyDate(new Date('2023-11-07'));

// first review about the T-shirt product
const review1 = {
    ID: 'of1',
    author: 'Author 1',
    date: new Date('2023-01-10'),
    comment: 'Це дуже гарний продукт!',
    rating: {
        service: 5,
        price: 5,
        value: 5,
        quality: 5
    }
}
// second review about the T-shirt product
const review2 = {
    ID: 'of2',
    author: 'Author 2',
    date: new Date('2023-02-10'),
    comment: 'Гарний продукт.',
    rating: {
        service: 5,
        price: 4,
        value: 5,
        quality: 4
    }
}
const review3 = {
    ID: 'of3',
    author: 'Author 3',
    date: new Date('2023-03-10'),
    comment: 'добрий продукт.',
    rating: {
        service: 4,
        price: 4,
        value: 4,
        quality: 4
    }
}
product1.setMyReviews([review1]);
product1.setMyImages(['image1.jpg', 'image2.jpg']);

// format the string to display product rating information
const formattedString = product1.toFormattedString();
console.log(formattedString);

import assert from 'node:assert/strict';
// checking the operation of getters
function testGetters() {
    assert.deepStrictEqual(product1.getMyID(), 'A1', 'Incorrect product ID');
    assert.deepStrictEqual(product1.getMyName(), 'Футболка', 'Incorrect product names');
    assert.deepStrictEqual(product1.getMyDescription(), 'Для виготовлення футболок застосовуються різні види легкого трикотажного полотна (бавовну, змішану бавовну (з еластаном, поліестером), віскозу, віскозу з еластаном, чистий поліестер). Щільність тканин різниться в межах від 110 до 260 г/м².', 'Incorrect product description');
    assert.deepStrictEqual(product1.getMyPrice(), 199.99, 'Incorrect product price');
    assert.deepStrictEqual(product1.getMyBrand(), 'Puma', 'Incorrect product brand');
    assert.deepStrictEqual(product1.getMySizes(), ['XLS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'], 'Incorrect product sizes');
    assert.deepStrictEqual(product1.getMyActiveSize(), 'XL', 'Incorrect product activeS sze');
    assert.deepStrictEqual(product1.getMyQuantity(), 100, 'Incorrect product activeS quantity');
    console.log('All getter tests passed successfully!');
}
testGetters();

// Checking the operation of the method getReviewByID
const reviewIdToFind = 'of1';
const foundReview = product1.getReviewByID(reviewIdToFind);
assert.deepStrictEqual(foundReview, review1, 'Incorrect getReviewByID result');

const invalidFeedbackID = 'InvalidID';
const invalidFoundReview = product1.getReviewByID(invalidFeedbackID);
assert.strictEqual(invalidFoundReview, null, 'Invalid ID should return null');

// Checking the operation of the method getImage
const imageIndexToFind = 1;
const foundImage = product1.getImage(imageIndexToFind);
assert.deepStrictEqual(foundImage, 'image2.jpg', 'Incorrect getImage result with parameter');

const defaultImage = product1.getImage(); // Without a parameter
assert.deepStrictEqual(defaultImage, 'image1.jpg', 'Incorrect getImage result without parameter');

// Function to test the addSize and deleteSize method
function testAddDeleteSize() {
    // delete by index from the beginning of the array, check that the size is reduced
    product1.deleteSize(0);
    assert.deepStrictEqual(product1.getMySizes(), ['XS', 'S', 'M', 'L', 'XL', 'XXL'], 'Size "XLS" was not deleted');
    assert.deepStrictEqual(product1.getMySizes().length, 6, 'When removing the "XLS" size, the size was not reduced');
    // We add a new size after another size
    product1.addSize('S+', 'S');
    assert.deepStrictEqual(product1.getMySizes(), ['XS', 'S', 'S+', 'M', 'L', 'XL', 'XXL'], 'Size "S+" should be added after "S"');
    // delete by index in the middle of the array, check that the size is reduced
    product1.deleteSize(2);
    assert.deepStrictEqual(product1.getMySizes(), ['XS', 'S', 'M', 'L', 'XL', 'XXL'], 'The "S+" size has not been removed.');
    assert.strictEqual(product1.getMySizes().length, 6, 'The size array length should be 6 after deletion.');
    // Add a new size without the previous size (it will be added at the end)
    product1.addSize('M+');
    assert.deepStrictEqual(product1.getMySizes(), ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'M+'], 'Size should be added to the end');
    // delete by index at the end of the array
    product1.deleteSize(6);
    assert.deepStrictEqual(product1.getMySizes(), ['XS', 'S', 'M', 'L', 'XL', 'XXL'], 'The "M+" size has not been removed.');
    /* We check the case when the specified size already exists
       Will output to the console: The specified size already exists in the size array
     */
    product1.addSize('XL');
    assert.deepStrictEqual(product1.getMySizes(), ['XS', 'S', 'M', 'L', 'XL', 'XXL'], 'Duplicate size should not be added');

    /* We check the case when the new size is not a string value
       Will be displayed in the console: Invalid size type. Size must be a string.
     */
    product1.addSize(42);
    assert.deepStrictEqual(product1.getMySizes(), ['XS', 'S', 'M', 'L', 'XL', 'XXL'], 'Invalid size type should not be added');
    /* we are trying to delete by non-existent indexes should receive a message in the console
    Error: Invalid index for size deletion.*/
    product1.deleteSize(10);
    product1.deleteSize(-1);
}
testAddDeleteSize();

// we check the operation of the method addReview
product1.addReview(review2);
product1.addReview(review3);
const addedReview1 = product1.getReviewByID('of2');
const addedReview2 = product1.getReviewByID('of3');
assert.deepStrictEqual(addedReview1, review2, 'this review2 has not been added');
assert.deepStrictEqual(addedReview2, review3, 'this review3 has not been added');

const avgRating = product1.getAverageRating();
assert.strictEqual(avgRating, 4.5, 'Incorrect average rating for product with reviews');

// checking the method of removing the "review" object from the "reviews" array by the specified key (ID)
const reviewIdToDelete = 'of1';
product1.deleteReview(reviewIdToDelete);
const deletedReview = product1.getReviewByID(reviewIdToDelete);
assert.strictEqual(deletedReview, null, 'Review should be deleted');

// we create an array "products" from "product" objects in my case sports clothes and sports shoes
let products = [
    { ID: "1", name: "футболка", description: "", price: 70 },
    { ID: "2", name: "майка", description: "", price: 69 },
    { ID: "3", name: "шорти", description: "в них можна грати в футбол", price: 68 },
    { ID: "4", name: "штани", description: "", price: 67 },
    { ID: "5", name: "гетри", description: "", price: 66 },
    { ID: "6", name: "куртка", description: "", price: 65 },
    { ID: "7", name: "кофти", description: "", price: 64 },
    { ID: "8", name: "шкарпетки", description: "", price: 63 },
    { ID: "9", name: "кепка", description: "", price: 62 },
    { ID: "10", name: "бандана", description: "", price: 61 },
    { ID: "11", name: "рукавиці", description: "", price: 60 },
    { ID: "12", name: "кросівки", description: "", price: 59 },
    { ID: "13", name: "кеди", description: "", price: 58 },
    { ID: "14", name: "снікери", description: "", price: 57 },
    { ID: "15", name: "хай-топи", description: "", price: 56 },
    { ID: "16", name: "бутси", description: "", price: 55 },
    { ID: "17", name: "футзалки", description: "", price: 54 },
    { ID: "18", name: "боксерки", description: "", price: 53 },
    { ID: "19", name: "вібрами", description: "", price: 52 },
    { ID: "20", name: "мотоботи", description: "", price: 51 },
];
// checking the operation of the method searchProducts
const searchText = "фут";
const searchResults = searchProducts(products, searchText);
console.log(searchResults);

/**
* Sort an array of products based on the specified criteria.
* @param {Array} products - The array of products to sort.
* @param {string} criteria - The criteria for sorting (e.g., 'ID', 'name', 'price').
* @returns {Array} - The sorted array of products.
*/
console.log(sortProducts(products, 'ID'));
console.log(sortProducts(products, 'name'));
console.log(sortProducts(products, 'price'));