const express = require('express');
const bodyParser = require('body-parser');

const sql = require('../dao/db');

const productRouter = express.Router();

productRouter.use(bodyParser.json());

productRouter.route('')
    .get((req, response) => {
        sql.query('SELECT * FROM product', (err, result) => {
            if (err) {
                response.statusCode = 500;
                response.setHeader('Content-Type', 'application/json');
                response.json(err);
                return
            }
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(result);
        })
    })
    .post((req, response) => {
        let objectJson = req.body;
        if (!objectJson.name || !objectJson.description || !objectJson.price) {
            response.statusCode = 400;
            response.setHeader('Content-Type', 'application/json');
            response.json({ error: 'the properties of json are not valid' });
            return
        }
        sql.query(`INSERT INTO product(product_name, product_desc, price) values('${req.body.name}', '${req.body.description}', ${req.body.price})`,
            err => {
                if (err) {
                    response.statusCode = 500;
                    response.setHeader('Content-Type', 'application/json');
                    response.json(err);
                }
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json({ desc: "Data inserted successfully!" });
            })
    })
    .delete((req, response) => {
        sql.query('DELETE FROM product', (err, result) => {
            if (err) {
                response.statusCode = 500;
                response.setHeader('Content-Type', 'application/json');
                response.json(err);
                return
            }
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(result);
        })
    });

productRouter.route('/:id')
    .get((req, response) => {
        sql.query(`SELECT * FROM product WHERE product_id=${req.params.id}`, (err, result) => {
            if (err) {
                response.statusCode = 500;
                response.setHeader('Content-Type', 'application/json');
                response.json(err);
                return
            }
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(result);
        });
    })
    .put((req, response) => {
        let objectJson = req.body;
        if (!objectJson.name || !objectJson.description || !objectJson.price) {
            response.statusCode = 400;
            response.setHeader('Content-Type', 'application/json');
            response.json({ error: 'the properties of json are not valid' });
            return;
        }
        sql.query(`UPDATE product SET product_name='${req.body.name}',product_desc='${req.body.description}',price=${req.body.price} WHERE product_id=${req.params.id}`,
            err => {
                if (err) {
                    response.statusCode = 500;
                    response.setHeader('Content-Type', 'application/json');
                    response.json(err);
                    return;
                }
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json({
                    'info': 'Succesffully udpdate the data',
                    'data': { 'product_name': req.body.name, 'product_desc': req.body.description, 'price': req.body.price }
                });
            });
    })
    .delete((req, response) => {
        sql.query(`DELETE FROM product WHERE product_id=${req.params.id}`, err => {
            if (err) {
                response.statusCode = 500;
                response.setHeader('Content-Type', 'application/json');
                response.json(err);
                return;
            }
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json({ 'info': 'Succesffully delete the data' });
        });
    })

module.exports = productRouter;