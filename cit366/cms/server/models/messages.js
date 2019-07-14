var express = require('express');
var model = require('./message');
var router = express.Router();
var sequenceGenerator = require('../routes/SequenceGenerator');

function getMessages(request, response) {
    model.find()
        .exec(err, messages => {
            if (err) {
                response.status(500).json({
                    error: err
                })
            }
            return response.status(200).json({
                message: 'Success',
                obj: messages
            })
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

    getMessages(response);
}

function deleteMessage(response, message) {
    message.remove(err => {
        if (err) {
            response.status(500).json({
                error: errƒ
            })
        }
    }).then({
        getMessages();
    })
}

router.get('/', (req, res, next) => {
    getMessage(res);
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
    Message.findOne({ id: req.params.id },
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

    Message.findOne(query,
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