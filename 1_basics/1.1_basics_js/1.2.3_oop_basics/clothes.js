import { AbstractProduct } from "./AbstractProduct.js";

export class Clothes extends AbstractProduct {
    constructor(ID = "", name = "", description = "", price = 0.0, quantity = 0, reviews = [], images = [], date = new Date(), brand = "", activeSize = "", material = "", color = "") {
        super(ID, name, description, price, quantity, reviews, images, date, brand);

        // Additional properties for Clothes
        this.sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
        this.activeSize = activeSize;
        this.material = material;
        this.color = color;
    }
    // Setter and getter for sizes
    getMySizes() {
        return this.sizes;
    }
    setMySizes(newSizes) {
        if (Array.isArray(newSizes)) {
            this.sizes = newSizes;
        } else {
            throw new Error("Invalid sizes type. Sizes must be a string.");
        }
    }
    // Setter and getter for activeSize
    getMyActiveSize() {
        return this.activeSize;
    }
    setMyActiveSize(newActiveSize) {
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
    addSize(newSize, previousSize) {
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
    deleteSize(index) {
        // check whether the index is in the available range
        if (index >= 0 && index < this.sizes.length) {
            this.sizes.splice(index, 1);
        } else {
            console.log("Error: Invalid index for size deletion.");
        }
    }

    // Setter and getter for warranty
    setMyMaterial(newMyMaterial) {
        if (typeof newMyMaterial === 'string') {
            this.material = newMyMaterial;
        } else {
            throw new Error("Invalid material type. Material must be a string.");
        }
    }
    getMyMaterial() {
        return this.material;
    }
    // Setter and getter for power
    setMyColor(newColor) {
        if (typeof newColor === 'string') {
            this.color = newColor;
        } else {
            throw new Error("Invalid color type. Color must be a string.");
        }
    }
    getMyColor() {
        return this.color;
    }
}