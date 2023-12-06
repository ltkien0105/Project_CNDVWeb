const knex = require("../database/knex");
const Paginator = require("./paginator");

function makeSearchService() {
  async function searchByTitle(query) {
    const { q, page = 1, limit = 12 } = query;
    const paginator = new Paginator(page, limit);

    let results = await knex("movie")
      .select(
        knex.raw("count(*) OVER() as recordsCount"),
        "id",
        "title",
        "description",
        "img_url",
        "rating",
        "release_year",
        "trailer_url",
        "duration"
      )
      .whereRaw(`MATCH(title) AGAINST('${q}' WITH QUERY EXPANSION)`)
      .offset(paginator.offset)
      .limit(paginator.limit);

    let totalRecords = 0;
    results = results.map((result) => {
      totalRecords = result.recordsCount;
      delete result.recordsCount;
      return result;
    });

    return {
      metadata: paginator.getMetadata(totalRecords),
      movies: results,
    };
  }

  return {
    searchByTitle,
  };
}

module.exports = makeSearchService;
