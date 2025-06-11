const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const donorLocationRoutes = require('./routes/donorLocationRoutes');
const bloodRequestRoutes = require('./routes/bloodRequestRoutes');
const questionnaireQuestionRoutes = require('./routes/questionnaireQuestionRoutes.js');
const postRoutes = require('./routes/postRoutes.js');
const commentRoutes = require('./routes/commentRoutes.js');
const profileRoutes = require('./routes/profileRoutes.js');
const donorReservationRoutes = require('./routes/donorReservationRoutes.js');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3001,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
                headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'],
                additionalHeaders: ['X-Requested-With'],
                credentials: true
            }
        }
    });

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: {
                info: {
                    title: 'BloodConnect API Documentation',
                    version: '1.0.0',
                    description: 'API documentation for BloodConnect, a platform connecting blood donors and recipients.'
                },
                grouping: 'tags',
            }
        }
    ]);

    // Register routes
    server.route(donorLocationRoutes);
    server.route(bloodRequestRoutes);
    server.route(questionnaireQuestionRoutes);
    server.route(postRoutes);
    server.route(commentRoutes);
    server.route(profileRoutes);
    server.route(donorReservationRoutes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();
