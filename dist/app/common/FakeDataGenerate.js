"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProductData = void 0;
const faker_1 = require("@faker-js/faker");
const generateProductData = (sellerId) => {
    const name = faker_1.fakerDE.commerce.productName();
    const price = parseFloat(faker_1.fakerDE.commerce.price());
    const img_url = faker_1.fakerDE.image.imageUrl();
    const quantity = faker_1.fakerDE.datatype.number({ min: 1, max: 100 });
    const isNew = faker_1.fakerDE.datatype.boolean();
    const discount = faker_1.fakerDE.datatype.number({ min: 0, max: 50 });
    const total_sell = faker_1.fakerDE.datatype.number({ min: 0, max: 1000 });
    const seller = sellerId;
    return {
        name,
        price,
        img_url,
        quantity,
        isNew,
        discount,
        total_sell,
        seller,
    };
};
exports.generateProductData = generateProductData;
