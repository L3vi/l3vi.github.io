var express = require('express');
var model = require('../models/document');
var router = express.Router();
var sequenceGenerator = require('./SequenceGenerator');

function getDocuments(request, response) {
    model.find()
        .exec((err, documents) => {
            if (err) {
                return response.status(500).json({
                    error: err
                })
            }
            return response.status(200).json(
                documents
            )
        })
}

function saveDocument(response, document) {
    response.setHeader('Content-Type', 'application/json');
    model.insertMany(document, err => {
        if (err) {
            return response.status(500).json({
                title: "An error occurred",
                error: err
            })
        }
        getDocuments(null, response);
    })
}

function deleteDocument(response, document) {
    document.remove(err => {
        if (err) {
            response.status(500).json({
                error: err
            })
        }
        getDocuments(null, response);
    })

}

router.get('/', (req, res, next) => {
    getDocuments(req, res);
})

router.post('/', (req, res, next) => {
    var maxDocumentId = sequenceGenerator.nextId("documents");

    var document = new model({
        id: maxDocumentId,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
    })

    saveDocument(res, document);
})

router.patch('/:id', (req, res, next) => {
    model.findOne({ id: req.params.id },
        (err, document) => {
            if (err || !document) {
                return res.status(500).json({
                    title: "No Document Found!",
                    error: { document: "Document not found" }
                })
            }

            document.name = req.body.name;
            document.description = req.body.description;
            document.url = req.body.url;

            saveDocument(document);
        });
});

router.delete('/:id', (req, res, next) => {
    var query = { id: req.params.id };

    model.findOne(query,
        (err, document) => {
            if (err) {
                return res.status(500).json({
                    title: "No Document Found!",
                    error: err
                })
            }
            if (!document) {
                return res.status(500).json({
                    title: "No Document Found!",
                    error: { documentId: req.params.id }
                })
            }

            deleteDocument(res, document);
        });
});

module.exports = router;