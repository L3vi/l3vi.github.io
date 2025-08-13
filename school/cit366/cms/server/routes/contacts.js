var express = require('express');
var model = require('../models/contact');
var router = express.Router();
var sequenceGenerator = require('./SequenceGenerator');

function getContacts(request, response) {
    model.find()
        .populate('group')
        .exec((err, contacts) => {
            if (err) {
                return response.status(500).json({
                    error: err
                })
            }
            return response.status(200).json(contacts)
        })
}

function saveContact(response, contact) {
    if (contact.group && contact.group.length > 0) {
        contact.group.map(contactGroup => contactGroup._id);
    }

    response.setHeader('Content-Type', 'application/json');
    contact.save(err => {
        if (err) {
            return response.status(500).json({
                title: "An error occurred",
                error: err
            })
        }
        getContacts(null, response);
    })


}

function deleteContact(response, contact) {
    contact.remove(err => {
        if (err) {
            response.status(500).json({
                error: errƒ
            })
        }
    })
    getContacts(null, response);
}

router.get('/', (req, res, next) => {
    getContacts(req, res);
})

router.post('/', (req, res, next) => {
    var maxContactId = sequenceGenerator.nextId("contacts");

    var contact = new model({
        id: maxContactId,
        email: req.body.email,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl,
        name: req.body.name,
        group: req.body.group
    })

    console.log(contact);

    saveContact(res, contact);
})

router.patch('/:id', (req, res, next) => {
    model.findOne({ id: req.params.id },
        (err, contact) => {
            if (err || !contact) {
                return res.status(500).json({
                    title: "No Contact Found!",
                    error: { contact: "Contact not found" }
                })
            }

            contact.email = req.body.email;
            contact.phone = req.body.phone;
            contact.imageUrl = req.body.imageUrl;
            contact.name = req.body.name;
            contact.group = req.body.group;

            saveDocument(contact);
        });
});

router.delete('/:id', (req, res, next) => {
    var query = { id: req.params.id };

    model.findOne(query,
        (err, contact) => {
            if (err) {
                return res.status(500).json({
                    title: "No Contact Found!",
                    error: err
                })
            }
            if (!contact) {
                return res.status(500).json({
                    title: "No Contact Found!",
                    error: { contactId: req.params.id }
                })
            }

            deleteContact(res, contact);
        });
});

module.exports = router;