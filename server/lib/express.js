const express = require('express');
const helmet = require('helmet');
const glob = require('glob');
const path =require('path');
const bodyParser = require('body-parser');
// const apppleRouts = require('../api/v1/apple.route');


/**
 * Init express server
 */
module.exports.initServer = () => {
    const app = express();

    // init express middleware
    // Set query string parser
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // Set json form parser
    app.use(bodyParser.json());

    // Use helmet to secure Express headers
    app.use(helmet());

    // Load api routes
    const routes = glob.sync(path.resolve('./api/*/*/*.route.js'));
    routes.forEach((route) => {
        require(route)(app);
    });

    // Register server error routes
    initErrorRoutes(app);

    // Start the server
    return app;
};

/**
 * Register error routes
 */
function initErrorRoutes(app) {
    // Catch 404 and forward to error handler
    app.use((req, res, next) => {
        res.statusCode = 404;
        next(new Error(`The route: ${req.originalUrl} not found`));
    });

    // Catch all server error and response with 500 status code
    app.use((err, req, res, next) => {
        const response = {};

        if (res.statusCode === 404) {
            response.message = err.message || 'Not Found';
            response.statusCode = 404;
        } else {
            response.message = 'Server Error: An unexpected error occurred';
            response.statusCode = 500;

            console.error('Error in express error middleware', err, req.originalUrl);
        }

        // Response the error
        res.status(response.statusCode).json(response);
    });
}
