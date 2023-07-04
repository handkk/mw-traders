module.exports = {
   apps: [
      {
         name: "traders-service",
         script: "./app.js",
         max_memory_restart: "100M",
         env_production: {
            NODE_ENV: "production"
         },
         exec_mode: "fork"
      },
      {
         name: "traders-ui",
         script: "./web.js",
         max_memory_restart: "100M",
         env_production: {
            NODE_ENV: "production"
         },
         exec_mode: "fork"
      }
   ]
}