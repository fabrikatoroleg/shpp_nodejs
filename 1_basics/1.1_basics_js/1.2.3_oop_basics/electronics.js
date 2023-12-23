import { AbstractProduct } from "./abstract_product.js";

export function Electronics(ID = "", name = "", description = "", price = 0.0, quantity = 0, reviews = [], images = [], date = new Date(), brand = "", warranty = 0, power = 0) {
    AbstractProduct.call(this, ID, name, description, price, quantity, reviews, images, date, brand);
    // Additional properties for Electronics 
    this.warranty = warranty;
    this.power = power;
}

// Встановлення прототипу Electronics на основі AbstractProduct
Electronics.prototype = Object.create(AbstractProduct.prototype);
Electronics.prototype.constructor = Electronics;

// Setter and getter for warranty
Electronics.prototype.setMyWarranty = function (newWarranty) {
    if (typeof newWarranty === 'number') {
        this.warranty = newWarranty;
    } else {
        throw new Error("Invalid warranty type. Warranty must be a number.");
    }
}
Electronics.prototype.getMyWarranty = function () {
    return this.warranty;
}
// Setter and getter for power
Electronics.prototype.setMyPower = function (newPower) {
    if (typeof newPower === 'number') {
        this.power = newPower;
    } else {
        throw new Error("Invalid power type. Power must be a number.");
    }
}
Electronics.prototype.getMyPower = function () {
    return this.power;
}