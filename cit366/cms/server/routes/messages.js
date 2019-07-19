var express = require('express');
var model = require('../models/message');
var router = express.Router();
var sequenceGenerator = require('./SequenceGenerator');

function getMessages(request, response) {
    model.find()
        .populate('sender')
        .exec((err, messages) => {
            if (err) {
                return response.status(500).json({
                    error: err
                })
            }
            // messages.forEach(m => {
            //     console.log(m.sender);
            // })
            console.log(messages);
            return response.status(200).json(messages)
        })
}

function saveMessage(response, message) {
    message.save(err => {
        response.setHeader('Content-Type', 'application/json');
        if (err) {
            return response.status(500).json({
                title: "An error occurred",
                error: err
            })
        }
    })

    getMessages(null, response);
}

function deleteMessage(response, message) {
    message.remove(err => {
        if (err) {
            response.status(500).json({
                error: errƒ
            })
        }
    })

    getMessages(null, response);
}

router.get('/', (req, res, next) => {
    getMessages(req, res);
})

router.post('/', (req, res, next) => {
    var maxMessageId = sequenceGenerator.nextId("messages");

    var message = new Message({
        id: maxMessageId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender
    })

    saveMessage(res, message);
})

router.patch('/:id', (req, res, next) => {
    model.findOne({ id: req.params.id },
        (err, message) => {
            if (err || !message) {
                return res.status(500).json({
                    title: "No Message Found!",
                    error: { message: "Message not found" }
                })
            }

            message.subject = req.body.subject;
            message.msgText = req.body.msgText;
            message.sender = req.body.sender;

            saveDocument(message);
        });
});

router.delete('/:id', (req, res, next) => {
    var query = { id: req.params.id };

    model.findOne(query,
        (err, message) => {
            if (err) {
                return res.status(500).json({
                    title: "No Message Found!",
                    error: err
                })
            }
            if (!message) {
                return res.status(500).json({
                    title: "No Message Found!",
                    error: { messageId: req.params.id }
                })
            }

            deleteMessage(res, message);
        });
});

module.exports = router;