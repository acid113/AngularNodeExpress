var express = require('express');
var router = express.Router();

var CustomerService = require('../services/service.customer');

/* GET customer 
   * NOTE: async is used
*/
router.get('/', async function(req, res, next) {
    //res.json({error: "Missing Customer UID."});
    console.log('API call to get all customers...');
    
    try {
        
        const customerList = await CustomerService.retreiveCustomerList();
        
        return res.json({
            customers: customerList
        });
    } catch (error) {
        console.log('Error calling retreiveCustomerList API.');
        console.log(error);
        return next(error);
    }

});

router.get('/:id', async function(req, res, next) {
    console.log('API call to get customer...');
    console.log(req.params);
    try {
        
        const customerVal = await CustomerService.retrieveCustomer(req.params.id);
        
        return res.json({
            customer: customerVal
        });
    } catch (error) {
        console.log('Error calling retrieveCustomer API.');
        console.log(error);
        return next(error);
    }
});

/* ADD customer */
router.post('/', async (req, res, next) => {
    console.log('API call to add customer...');
    console.log(req.body);

    const body = req.body;

     try {
         
        const customerVal = await CustomerService.createCustomer(body);

        if (body.UID != null) {
            customerVal.GUID = body.GUID;
        }

        res.cookie('GUID', customerVal.GUID, { 
            maxAge: 90000
            , httpOnly: true
        });

        return res.status(201).json({
            customer: customerVal
        });

     } catch (error) {
        console.log('Error calling createCustomer API.');
        console.log(error);
        
        if (error.name === 'ValidationError')
		{
        	return res.status(400).json({ error: error.message });
		}

		// unexpected error
		return next(error);
     }
});

/* UPDATE customer */
router.put('/:id', async(req, res, next) => {
    console.log('API call to update customer...');
    console.log(req.params);
    try {
        const customerVal = await CustomerService.updateCustomer(req.params.id, req.body);
        return res.json({ 
            customer: customerVal
        });

    } catch (error) {
        console.log('Error calling updateCustomer API.');
        console.log(error);
        return next(error);
    }
    
});

/* DELETE customer */
router.delete('/:id', async (req, res, next) =>
{
    console.log('API call to delete customer...');
    console.log(req.params);
	try
	{
		const customer = await CustomerService.deleteCustomer(req.params.id);

		return res.json({success: true});
	}
	catch(error)
	{
		console.log('Error calling deleteCustomer API.');
        console.log(error);
		return next(error);
	}
});

module.exports = router;