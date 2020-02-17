const customerModel = require('./../models/model.customer');
let validator = require('fastest-validator');

let customers = {}; // data saved in a cookie
let counter = 1;

/* create instance of validator */
let customerValidator = new validator();

/* pattern violation backend side, but should also be done in frontend */
let namePattern = /([A-Za-z\-\’])*/;
// let emailPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

/* customer validator schema 
    * property names must exactly match, they are case sensitive
*/
const customerSchema = {
    GUID: { type: "string", min: 3 }
    , FirstName: { type: "string", min: 1, pattern: namePattern }
    , LastName: { type: "string", min: 1, pattern: namePattern }
    , Email: { type: "string", min: 1
        // , pattern: emailPattern 
    }
}

class CustomerService {

    static createCustomer(data) {
        console.log('inside createCustomer() service');

        var vres = customerValidator.validate(data, customerSchema);
        console.log('vres value: ' + vres);

        /* validate failed */
        if (vres == false) {
            let errors = {}, item;

            for (const index in vres) {
                item = vres[index];
                errors[item.field] = item.message;
            }
    
            throw {
                name: "ValidationError"
                , message: errors
            };
        }

        let customer = new customerModel(data.GUID, data.FirstName, data.LastName, data.Email);
        customer.UID = "c" + counter;
        counter++;

        
        console.log('customer object value...');
        console.log(customer);
        
        /*
            info saved into array with format: customers["c"<count_number>]
        */
        customers[customer.UID] = customer;
        return customer;
    }

    static retrieveCustomer(uid) {
        console.log('inside retrieveCustomer() service');
        
        if (customers[uid] == null) {
            console.log("Error retreiving Customer ID:" + uid);
            throw new Error("Customer ID:" + uid + " not found!");
        }
        
        return customers[uid];
        
    }

    static retreiveCustomerList() {
        console.log('inside retreiveCustomerList() service');
        console.log(customers);

        if (customers == null) {
            console.log('Customer list is empty.');
            return null;
        }

        return customers;
    }

    static updateCustomer(uid) {
        console.log('inside updateCustomer() service');

        if (customers[uid] == null) {
            console.log("Error updating Customer ID:" + uid);
            throw new Error("Customer ID:" + uid + " not found!");
        }
        
        const customer = customers[uid];
        Object.assign(customer, data);
    }

    static deleteCustomer(uid) {
        console.log('inside deleteCustomer() service');

        if (customers[uid] == null) {
            console.log("Error deleting Customer ID:" + uid);
            throw new Error("Customer ID:" + uid + " not found!");
        } 
        
        delete customers[uid];
    }
}

module.exports = CustomerService;