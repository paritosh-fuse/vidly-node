const { SchemaComposer } = require( 'graphql-compose');

const schemaComposer = new SchemaComposer();

const { GenreQuery, GenreMutation } =require ('./genre');
const { MovieQuery, MovieMutation } =require ('./movie');
const { CustomerQuery, CustomerMutation } =require ('./customer');
const { RentalQuery, RentalMutation } =require ('./rental');
const { UserQuery } =require ('./user');

schemaComposer.Query.addFields({
    ...GenreQuery,
    ...MovieQuery,
    ...CustomerQuery,
    ...RentalQuery,
    ...UserQuery,
});

schemaComposer.Mutation.addFields({
    ...GenreMutation,
    ...MovieMutation,
    ...CustomerMutation,
    ...RentalMutation,
});

module.exports = schemaComposer.buildSchema();