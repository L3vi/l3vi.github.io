var express = require('express');
var model = require('./contact');
var router = express.Router();
var sequenceGenerator = require('../routes/SequenceGenerator');

function getContacts(request, response) {
    model.find()
        .populate('group')
        .exec(err, contacts => {
            if (err) {
                response.status(500).json({
                    error: err
                })
            }
            return response.status(200).json({
                contact: 'Success',
                obj: contacts
            })
        })
}

function saveContact(response, contact) {
    if (contact.group && contact.group.length > 0) {
        contact.group.map(contactGroup => contactGroup._id);
    }

    contact.save(err => {
        response.setHeader('Content-Type', 'application/json');
        if (err) {
            return response.status(500).json({
                title: "An error occurred",
                error: err
            })
        }
    })

    getContacts(response);

}

function deleteContact(response, contact) {
    contact.remove(err => {
        if (err) {
            response.status(500).json({
                error: errƒ
            })
        }
    }).then({
        getContacts();
    })
}

router.get('/', (req, res, next) => {
    getContacts(res);
})

router.post('/', (req, res, next) => {
    var maxContactId = sequenceGenerator.nextId("contacts");

    var contact = new Contact({
        id: maxContactId,
        email: req.body.email,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl,
        name: req.body.name,
        group: req.body.group
    })

    saveContact(res, contact);
})

router.patch('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.id },
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

    Contact.findOne(query,
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