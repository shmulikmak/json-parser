const express = require('express');
const fs = require('fs');
const fsPromises = require('fs').promises;

let fileName = '';

/**
 * get the json Files name
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function getFilesName(req, res) {

    try {
        fs.readdir('./json', (err, files) => {
            // "files" is an Array with files names
            if(!err) {
                res.send(files);    
            } else {
            return res.status(404).send(`Json folder not found`);
            }
        });
        
    } catch (error) {
        res.status(500).send(`An unexpected error occurred while try to get original url for`);
    }
}

/**
 * Get List Of Tabels
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function getListOfTabels(req, res) {

    fileName = req.query.fileName;
    const jsonFile = await fsPromises.readFile(`./json/${fileName}`, 'utf-8');
    const tables = JSON.parse(jsonFile)
    const tabelsNameIndex = tables.tables.map((tabel, index) => {
            return [tabel.title, index]
    });
    res.send(tabelsNameIndex);    
}

/**
 * get List Of Tabels Info
 *
 * @param {express.Request | any} req
 * @param {express.Response} res
 */
async function getListOfTabelsInfo(req, res) {

    const tableIndex = req.query.tableIndex;
    const jsonFile = await fsPromises.readFile(`./json/${fileName}`, 'utf-8');
    const tables = JSON.parse(jsonFile)
    const tabelData = tables.tables.filter((tabel, index) => {
            if(tableIndex == index) {
                return tabel;
            }
    });
    res.send(tabelData);    
}

module.exports = {
    getFilesName,
    getListOfTabels,
    getListOfTabelsInfo
};
