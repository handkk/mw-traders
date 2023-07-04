module.exports = {
   apps: [
      {
         name: "traders-service",
         script: "./app.js",
         env_production: {
            NODE_ENV: "production"
         },
         exec_mode: "fork"
      },
      {
         name: "traders-ui",
         script: "./web.js",
         env_production: {
            NODE_ENV: "production"
         },
         exec_mode: "fork"
      }
   ]
}