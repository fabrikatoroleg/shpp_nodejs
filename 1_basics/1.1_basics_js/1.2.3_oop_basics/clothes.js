import { AbstractProduct } from "./abstract_product.js";

export function Clothes(ID = "", name = "", description = "", price = 0.0, quantity = 0, reviews = [], images = [], date = new Date(), brand = "", activeSize = "", material = "", color = "") {
    AbstractProduct.call(this, ID, name, description, price, quantity, reviews, images, date, brand);

    // Additional properties for Clothes
    this.sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    this.activeSize = activeSize;
    this.material = material;
    this.color = color;
}

// Встановлення прототипу Clothes на основі AbstractProduct
Clothes.prototype = Object.create(AbstractProduct.prototype);
Clothes.prototype.constructor = Clothes;

// Setter and getter for sizes
Clothes.prototype.getMySizes = function () {
    return this.sizes;
}
Clothes.prototype.setMySizes = function (newSizes) {
    if (Array.isArray(newSizes)) {
        this.sizes = newSizes;
    } else {
        throw new Error("Invalid sizes type. Sizes must be a string.");
    }
}
// Setter and getter for activeSize
Clothes.prototype.getMyActiveSize = function () {
    return this.activeSize;
}
Clothes.prototype.setMyActiveSize = function (newActiveSize) {
    if (typeof newActiveSize === 'string') {
        this.activeSize = newActiveSize;
    } else {
        throw new Error(" Invalid activeSize type. ActiveSize must be a string.");
    }
}

/* The method adds a new value to the "sizes" array 
 it's easiest to add it to the end of the array - this.sizes.puch(newSize);
 but perhaps  it is necessary to add not to the end of the array, but according to the specified index,
or the next by a certain size sizeToFind */
Clothes.prototype.addSize = function (newSize, previousSize) {
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
Clothes.prototype.deleteSize = function (index) {
    // check whether the index is in the available range
    if (index >= 0 && index < this.sizes.length) {
        this.sizes.splice(index, 1);
    } else {
        console.log("Error: Invalid index for size deletion.");
    }
}

// Setter and getter for material
Clothes.prototype.setMyMaterial = function (newMyMaterial) {
    if (typeof newMyMaterial === 'string') {
        this.material = newMyMaterial;
    } else {
        throw new Error("Invalid material type. Material must be a string.");
    }
}
Clothes.prototype.getMyMaterial = function () {
    return this.material;
}
// Setter and getter for color
Clothes.prototype.setMyColor = function (newColor) {
    if (typeof newColor === 'string') {
        this.color = newColor;
    } else {
        throw new Error("Invalid color type. Color must be a string.");
    }
}
Clothes.prototype.getMyColor = function () {
    return this.color;
}