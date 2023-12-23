/** 
 * file for checking the operation of methods in the console
 * we import the product's child classes and methods
 */
import { Clothes } from './clothes.js';
import { Electronics } from './electronics.js';
import { searchAbstractProducts, sortAbstractProducts } from "./abstract_product.js";

const clothesProduct = new Clothes("1", "T-shirt", "Comfortable cotton T-shirt", 199.99, 50, [], ["tshirt.jpg"], new Date(), "Nike", "L", "Cotton", "Blue");
const electronicsProduct = new Electronics("2", "Smartphone", "High-end smartphone", 6999.99, 20, [], ["phone.jpg"], new Date(), "Samsung", 36, 5000);

// verification of universal methods Getter-Setter
const findNameClothesProduct = clothesProduct.getMyProperty("name");
const setClothesProductName = clothesProduct.setMyProperty("name", "Super T-shirt");
const setElectronicsProductName = electronicsProduct.setMyProperty("name", "Super Smartphone");
const reviewClothes = {
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
const reviewElectronics = {
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
clothesProduct.addReview(reviewClothes);
electronicsProduct.addReview(reviewElectronics);

console.log(clothesProduct);
console.log(electronicsProduct);

const fullInformationClothesProduct = clothesProduct.getFullInformation();
const fullInformationElectronicsProduct = electronicsProduct.getFullInformation();
console.log(fullInformationClothesProduct);
console.log(fullInformationElectronicsProduct);

// Validation of a formatted price
const totalCostPriceClothesProduct = clothesProduct.getPriceForQuantity(10);
const totalCostElectronicsProduct = electronicsProduct.getPriceForQuantity(10);
console.log(totalCostPriceClothesProduct);
console.log(totalCostElectronicsProduct);

// we create an array "products" from "product" objects in my case sports clothes and sports shoes
let productsClothes = [
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
const searchResults = searchAbstractProducts(productsClothes, searchText);
console.log(searchResults);

/* checking the operation of the method sortProducts
 everything is correct here, but it should be noted that yaya sorts the string,
 which you may not like if the identifier is numeric*/
console.log(sortAbstractProducts(productsClothes, 'ID'));
console.log(sortAbstractProducts(productsClothes, 'name'));
console.log(sortAbstractProducts(productsClothes, 'price'));