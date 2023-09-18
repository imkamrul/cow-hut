import { fakerDE as faker } from "@faker-js/faker";

export const generateProductData = (sellerId: string) => {
  const name = faker.commerce.productName();
  const price = parseFloat(faker.commerce.price());
  const img_url = faker.image.imageUrl();
  const quantity = faker.datatype.number({ min: 1, max: 100 });
  const isNew = faker.datatype.boolean();
  const discount = faker.datatype.number({ min: 0, max: 50 });
  const total_sell = faker.datatype.number({ min: 0, max: 1000 });
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
