const Hapi = require("@hapi/hapi");
const donorLocationRoutes = require("./routes/donorLocationRoutes");
const bloodRequestRoutes = require("./routes/bloodRequestRoutes");
const authRoutes = require("./routes/exampleRoute.js");
const formRoutes = require("./routes/formRoute.js");

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3001,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
        credentials: true,
      },
    },
  });

  server.route(donorLocationRoutes);
  server.route(bloodRequestRoutes);
  server.route(authRoutes);

  await server.register([]);
  server.route(formRoutes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

init();
