const Hapi = require('@hapi/hapi');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: 'localhost',
        routes: {
            cors: { origin: ['*'] }
        }
    });

    // Register routes
    // server.route(authRoutes); EXAMPLE

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();
