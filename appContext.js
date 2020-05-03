let appContext = {
    app: {
        name: 'express.places',
        summary: 'Web UI for places app',
        author: 'Chris Krahe',
        year: 2020
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 27017,
        name: 'geo'
    },
    web: {
        port: normalizePort(process.env.PORT || '3000')
    }
};
appContext.db.url = `mongodb://${appContext.db.host}:${appContext.db.port}`;

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

module.exports = appContext;