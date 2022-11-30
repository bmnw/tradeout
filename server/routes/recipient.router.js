const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET contract by contract key sent to recipient email. user not required to be logged in.
router.get('/:id', (req, res) => {
    console.log('in /api/recipient GET contract by contract key');
    console.log('contract key is:', req.params.id);
    const queryText =   `SELECT * FROM "contract"
                        WHERE "contract"."contract_key" = $1;`;
    pool.query(queryText, [req.params.id]).then(result => {
        res.send(result.rows[0]);
    }).catch(error => {
        console.log('Error in /api/recipient GET contract by contract key:', error);
        res.sendStatus(500);
    });
});

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
router.get('/api/recipient', async (req, res) => {
    const secondPartyEmail = req.params.newContractDetails.secondPartyEmail
    const msg = {
    to: secondPartyEmail, // Change to your recipient
    from: process.env.SENDGRID_EMAIL, // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    
    sgMail
    .send(msg)
    .then((response) => {
        console.log(response[0].statusCode)
        console.log(response[0].headers)
        res.send(200);
    })
    .catch((error) => {
        console.error(error)
    })
})

module.exports = router;