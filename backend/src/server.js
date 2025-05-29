const Hapi = require('@hapi/hapi');
const donorLocationRoutes = require('./routes/donorLocationRoutes');
const bloodRequestRoutes = require('./routes/bloodRequestRoutes');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: 'localhost',
        routes: {
            cors: { origin: ['*'] }
        }
    });

    // Register routes
    server.route(donorLocationRoutes);
    server.route(bloodRequestRoutes);


    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();
