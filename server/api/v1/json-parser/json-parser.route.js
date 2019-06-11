const express = require('express');
const { getFilesName, getListOfTabels, getListOfTabelsInfo } = require('./json-parser.controller');

/**
 * json-parser routes
 *
 * @param { express.Express } app express application
 */
module.exports = (app) => {
    app.route('/api/v1/TableName')
        .get(getListOfTabels);

    app.route('/api/v1/TabelInfo')
        .get(getListOfTabelsInfo);

    app.route('/api/v1/jsonParser')
        .get(getFilesName)
};
