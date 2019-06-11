const { initServer } = require('./lib/express');
const port = 3000

async function start() {
    try {

        // Init express server
        const app = initServer();

        app.listen(port, () => console.log(`App listening on port ${port}!`))
    } catch (error) {
        console.error('Faild to start the server', error);
    }
}

start();
