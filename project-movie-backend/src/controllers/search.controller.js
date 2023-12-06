const makeSearchService = require('../services/search.service');
const ApiError = require('../api-error');

async function searchByTitle(req, res, next) {
    let movies = [];

    try {
        const searchService = makeSearchService();
        movies = await searchService.searchByTitle(req.query);
        if (!movies) {
            return next(new ApiError(404, 'Movie not found'));
        }
    } catch(error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred when searching movie'));
    }

    return res.send(movies);
}

module.exports = { searchByTitle };