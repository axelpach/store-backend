class OrdersServices{
  constructor(){
    this.orders = [];
  }

  find(){
    return this.orders;
  }

  findOrder(orderId){
    // return {orderId};
    return this.orders.find(item => item.orderId == orderId);
  }

  createOrder(body){
    this.orders.push(body);
    return {
      message: 'created',
      body
    }
  }

}

module.exports = OrdersServices;
