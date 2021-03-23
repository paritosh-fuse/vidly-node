const { GenreTC } = require("../../models/genre");

const GenreQuery = {
  genreById: GenreTC.getResolver("findById"),
  genreByIds: GenreTC.getResolver("findByIds"),
  genreOne: GenreTC.getResolver("findOne"),
  genreMany: GenreTC.getResolver("findMany"),
  genreCount: GenreTC.getResolver("count"),
};

const GenreMutation = {
  genreCreateOne: GenreTC.getResolver("createOne"),
  genreCreateMany: GenreTC.getResolver("createMany"),
  genreUpdateById: GenreTC.getResolver("updateById"),
  genreUpdateOne: GenreTC.getResolver("updateOne"),
  genreUpdateMany: GenreTC.getResolver("updateMany"),
  genreRemoveById: GenreTC.getResolver("removeById"),
  genreRemoveOne: GenreTC.getResolver("removeOne"),
  genreRemoveMany: GenreTC.getResolver("removeMany"),
};


module.exports = { GenreQuery, GenreMutation };
