const { SchemaComposer } = require( 'graphql-compose');

const schemaComposer = new SchemaComposer();

const { GenreQuery, GenreMutation } =require ('./genre');

schemaComposer.Query.addFields({
    ...GenreQuery,
});

schemaComposer.Mutation.addFields({
    ...GenreMutation,
});

module.exports = schemaComposer.buildSchema();