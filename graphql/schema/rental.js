const { RentalTC } = require('../../models/rental')

const RentalQuery = {
    rentalById: RentalTC.getResolver("findById"),
    rentalByIds: RentalTC.getResolver("findByIds"),
    rentalOne: RentalTC.getResolver("findOne"),
    rentalMany: RentalTC.getResolver("findMany"),
    rentalCount: RentalTC.getResolver("count"),
  };
  
  const RentalMutation = {
    rentalCreateOne: RentalTC.getResolver("createOne"),
    rentalCreateMany: RentalTC.getResolver("createMany"),
    rentalUpdateById: RentalTC.getResolver("updateById"),
    rentalUpdateOne: RentalTC.getResolver("updateOne"),
    rentalUpdateMany: RentalTC.getResolver("updateMany"),
    rentalRemoveById: RentalTC.getResolver("removeById"),
    rentalRemoveOne: RentalTC.getResolver("removeOne"),
    rentalRemoveMany: RentalTC.getResolver("removeMany"),
  };
  
  
  module.exports = { RentalQuery, RentalMutation };
  