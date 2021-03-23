const { CustomerTC } = require('../../models/customer')

const CustomerQuery = {
    customerById: CustomerTC.getResolver("findById"),
    customerByIds: CustomerTC.getResolver("findByIds"),
    customerOne: CustomerTC.getResolver("findOne"),
    customerMany: CustomerTC.getResolver("findMany"),
    customerCount: CustomerTC.getResolver("count"),
  };
  
  const CustomerMutation = {
    customerCreateOne: CustomerTC.getResolver("createOne"),
    customerCreateMany: CustomerTC.getResolver("createMany"),
    customerUpdateById: CustomerTC.getResolver("updateById"),
    customerUpdateOne: CustomerTC.getResolver("updateOne"),
    customerUpdateMany: CustomerTC.getResolver("updateMany"),
    customerRemoveById: CustomerTC.getResolver("removeById"),
    customerRemoveOne: CustomerTC.getResolver("removeOne"),
    customerRemoveMany: CustomerTC.getResolver("removeMany"),
  };
  
  
  module.exports = { CustomerQuery, CustomerMutation };
  