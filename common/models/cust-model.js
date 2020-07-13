class Customer {
    customerId;
    firstName;
    lastName;
    address1;
    state = "Tamil Nadu";
    pincode;
    landmark;
    status;
    pwd;

    constructor(customerId, firstName,address1,pincode,landmark,pwd) {
        this.customerId = customerId;
        this.firstName = firstName;
        this.address1=address1;
        this.pincode = pincode;
        this.landmark =landmark;
        if(pwd)
            this.pwd = app.utils.encode(pwd);
    }
}

class OrderDetails{
    orderId;
    productId;
    listPrice;
    unitType;
    qty;
    moq

    constructor(orderId, productId,listPrice,unitType,qty,moq) {
        this.orderId = orderId;
        this.productId = productId;
        this.listPrice=listPrice;
        this.unitType = unitType;
        this.qty =qty;
        this.moq = moq
    }
}

class Order {
    id;
    customerId;
    status;
    orderAmount;
    orderDetails;

    constructor(id,customerId,status,orderAmount,orderDetails) {
        this.id = id;
        this.customerId=customerId;
        this.status = status;
        this.orderAmount =orderAmount;
        this.orderDetails = orderDetails
    }
}