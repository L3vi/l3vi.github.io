var express = require('express');
var model = require('./document');
var router = express.Router();
var sequenceGenerator = require('../routes/SequenceGenerator');

function getDocuments(request, response) {
    model.find()
        .exec(err, documents => {
            if (err) {
                response.status(500).json({
                    error: err
                })
            }
            return response.status(200).json({
                document: 'Success',
                obj: documents
            })
        })
}

function saveDocument(response, document) {
    document.save(err => {
        response.setHeader('Content-Type', 'application/json');
        if (err) {
            return response.status(500).json({
                title: "An error occurred",
                error: err
            })
        }
    })

    getDocuments(response);
}

function deleteDocument(response, document) {
    document.remove(err => {
        if (err) {
            response.status(500).json({
                error: errƒ
            })
        }
    }).then({
        getDocuments();
    })
}

router.get('/', (req, res, next) => {
    getDocuments(res);
})

router.post('/', (req, res, next) => {
    var maxDocumentId = sequenceGenerator.nextId("documents");

    var document = new Document({
        id: maxDocumentId,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
    })

    saveDocument(res, document);
})

router.patch('/:id', (req, res, next) => {
    Document.findOne({ id: req.params.id },
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

    Document.findOne(query,
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