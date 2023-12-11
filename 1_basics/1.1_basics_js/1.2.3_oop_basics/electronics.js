import { AbstractProduct } from "./AbstractProduct.js";

export class Electronics extends AbstractProduct {
    constructor(ID = "", name = "", description = "", price = 0.0, quantity = 0, reviews = [], images = [], date = new Date(), brand = "", warranty = 0, power = 0) {
        super(ID, name, description, price, quantity, reviews, images, date, brand);
        // Additional properties for Electronics 
        this.warranty = warranty;
        this.power = power;
    }
    // Setter and getter for warranty
    setMyWarranty(newWarranty) {
        if (typeof newWarranty === 'number') {
            this.warranty = newWarranty;
        } else {
            throw new Error("Invalid warranty type. Warranty must be a number.");
        }
    }
    getMyWarranty() {
        return this.warranty;
    }
    // Setter and getter for power
    setMyPower(newPower) {
        if (typeof newPower === 'number') {
            this.power = newPower;
        } else {
            throw new Error("Invalid power type. Power must be a number.");
        }
    }
    getMyPower() {
        return this.power;
    }
}