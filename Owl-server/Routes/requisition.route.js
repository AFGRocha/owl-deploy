const express = require("express")
const router = express.Router()
const controller = require("../Controller/requisition.controller")

router.get("/", controller.get)
router.post("/", controller.post)
router.put("/:id", controller.put)

module.exports = app => app.use("/requisitions", router)