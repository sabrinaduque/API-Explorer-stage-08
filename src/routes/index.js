//importou o Router do express
const { Router } = require("express")

const usersRouter = require("./users.routes")

const routes = Router()

//a rota users, e toda vez que eu usar o user ele vai ser mandado para o user router
routes.use("/users", usersRouter)

module.exports = routes;