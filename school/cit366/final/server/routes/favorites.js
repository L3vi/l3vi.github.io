var express = require('express');
var Favorite = require('../models/favorite');
var router = express.Router();

function getFavorites(request, response) {
    Favorite.find()
        .exec((err, favorites) => {
            if (err) {
                return response.status(500).json({
                    error: err
                })
            }
            return response.status(200).json(
                favorites
            )
        })
}

function getFavorite(favorite) {
    Favorite.find((err, favorites) => {
        var matchingFavorite = null;
        favorites.forEach(f => {
            if (favorite.id === f.id) {
                matchingFavorite = f;
            }
        })
        if (err || !matchingFavorite) {
            return res.status(500).json({
                title: "No Favorite Found!",
                error: { favorite: "Favorite not found" }
            })
        }
        return matchingFavorite;
    })
}

function getMaxId() {
    var favorites = getFavorites();
    if (!favorites) {
        return;
    }
    var maxId = 0;
    favorites.forEach(f => {
        if (f.id > maxId) {
            maxId = f.id;
        }
    })
    return maxId;
}

function saveFavorite(response, favorite) {
    response.setHeader('Content-Type', 'application/json');
    Favorite.insertMany(favorite, err => {
        if (err) {
            return response.status(500).json({
                title: "An error occurred",
                error: err
            })
        }
        getFavorites(null, response);
    })
}

function updateFavorite(response, favorite) {
    var query = { id: favorite.id };
    response.setHeader('Content-Type', 'application/json');
    Favorite.updateOne(favorite, err => {
        if (err) {
            return response.status(500).json({
                title: "An error occurred",
                error: err
            })
        }
        getFavorites(null, response);
    })
}

function deleteFavorite(response, favorite) {
    var query = { id: favorite.id };
    Favorite.deleteOne(err => {
        if (err) {
            response.status(500).json({
                error: err
            })
        }
        getFavorites(null, response);
    })

}

router.get('/', (req, res, next) => {
    getFavorites(req, res);
})

router.post('/', (req, res, next) => {
    var maxId = getMaxId();

    var favorite = new Favorite({
        id: maxId,
        word: req.body.word,
        color: req.body.color,
    })

    saveFavorite(res, favorite);
})

router.patch('/:id', (req, res, next) => {
    Favorite.find((err, favorites) => {
        var matchingFavorite = null;
        favorites.forEach(f => {
            if (req.body.id === f.id) {
                matchingFavorite = req.body;
            }
        })
        if (err || !matchingFavorite) {
            return res.status(500).json({
                title: "No Favorite Found!",
                error: { favorite: "Favorite not found" }
            })
        }

        updateFavorite(res, matchingFavorite);
    })
});

router.delete('/:id', (req, res, next) => {
    Favorite.find((err, favorites) => {
        var matchingFavorite = null;
        favorites.forEach(f => {
            if (req.params.id === f.id) {
                matchingFavorite = f;
            }
        })
        if (err || !matchingFavorite) {
            return res.status(500).json({
                title: "No Favorite Found!",
                error: { favorite: "Favorite not found" }
            })
        }

        deleteFavorite(res, matchingFavorite);
    })
});

module.exports = router;