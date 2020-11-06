const { urlencoded } = require('express')
const express = require('express')
const app = express()

const tagihan = require('../models/index').tagihan
app.use(express.urlencoded({ extended:true }))
const verifyToken = require('./verifyToken')

app.get('/', verifyToken, async (req, res) => {
    tagihan.findAll({
        include: [{ all: true, nested: true }]
    }) // get data
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post('/', verifyToken,async (req, res) => {
    let data = {
        id_penggunaan: req.body.id_penggunaan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        jumlah_meter: req.body.jumlah_meter,
        status: req.body.status
    }
    tagihan.create(data)
    .then(result => {
        res.json({
            message: 'Data inserted',
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.put('/', verifyToken, async (req, res) => {
    let param = { id_tagihan: req.body.id_tagihan }
    let data = {
        id_penggunaan: req.body.id_penggunaan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        jumlah_meter: req.body.jumlah_meter,
        status: req.body.status
    }
    tagihan.update(data,{where:param})
    .then(result => {
        res.json({
            message: 'Data Updated',
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.delete('/:id_tagihan', verifyToken, async (req, res) => {
    let param = { id_tagihan: req.params.id_tagihan }
    tagihan.destroy({where:param})
    .then(result => {
        res.json({
            message: 'Data Destroyed',
            data: result
        })
    })
    .cathc(error => {
        res.json({
            message: error.message
        })
    })
})

module.exports = app