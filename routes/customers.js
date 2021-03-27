const express = require('express')
const router = express.Router()
const authorize = require('../middleware/admin')
const {Customer, validate} = require('../models/customer')
const validateObjID = require('../middleware/validateObjectID');

router.get('/', async (req, res) => {        
    const customers = await Customer.find().sort('name')
    return res.send(customers)
})

router.get('/:id', validateObjID, async (req, res) => {
    const id = req.params.id
    const customer = await Customer.findById(id)
    if (!customer) return res.status(404).send('Customer not found!')
    res.send(customer)
})

router.post('/', async (req, res) => {
    const customer = req.body

    const { error } = validate(customer); 
    if (error) return res.status(400).send(error.details[0].message);

    let newCustomer = new Customer(customer)
    try {
        newCustomer = await newCustomer.save()
        res.send(newCustomer)
    } catch(err) {
        res.send(err.message)
    }
})

router.put('/:id', validateObjID, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body , { new: true });

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
  res.send(customer);
})

router.delete('/:id', [authorize, validateObjID], async (req, res) => {
    const id = req.params.id

    const customer = await Customer.findByIdAndRemove(id)
    if (!customer) return res.status(404).send('Customer not found!')
    return res.send(customer)
})

module.exports = router;