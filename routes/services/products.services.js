const faker = require('faker');
const boom = require('@hapi/boom');


class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){
    const limit =  100;

    for (let index = 0; index < limit; index++) {
      this.products.push({
        productId: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }

  create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 3000);
    })
    // return this.products;
  }

  findOne(productId){
    const product = this.products.find(item => item.productId === productId);
    if(!product){
      throw boom.notFound('Product not found');
    } else if(product.isBlocked){
      throw boom.conflict('Product is blocked');
    }
    return product;
  }

  update(productId, changes){
    const index = this.products.findIndex(item => item.productId === productId);
    if(index === -1){
      throw boom.notFound('Product not found');
      // throw new Error('Product not found');
    } else {
      const product = this.products[index];
      this.products[index] = {
        ...product,
        ...changes
      };
    }
    return this.products[index];
  }

  delete(productId){
    const index = this.products.findIndex(item => item.productId === productId);
    if(index === -1){
      throw boom.notFound('Product not found');
      // throw new Error('Product not found');
    }

    this.products.splice(index, 1);

    return {message: true};
  }

}

module.exports = ProductsService;
