const fs = require('fs')
const path = require('path')
const session = require('express-session')
const Keycloak = require('keycloak-connect')

function configureKeycloak(app, graphqlPath) {

  const memoryStore = new session.MemoryStore()

  app.use(session({
    secret: process.env.SESSION_SECRET ,
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  }))

  const keycloak = new Keycloak({
    store: memoryStore
  }, 
  {
    "realm": process.env.KEYCLOAK_REALM,
    "auth-server-url": process.env.KEYCLOAK_URL,
    "resource": process.env.KEYCLOAK_CLIENT_ID,
    "ssl-required": "none",
    "confidential-port": 0,
    "use-resource-role-mappings": true,
      "enable-cors": true
    }
  )

  // Install general keycloak middleware
  app.use(keycloak.middleware({
    admin: graphqlPath
  }))

  // Protect the main route for all graphql services
  // Disable unauthenticated access
  app.use(graphqlPath, keycloak.middleware())

  return { keycloak }
}

module.exports = {
  configureKeycloak
}