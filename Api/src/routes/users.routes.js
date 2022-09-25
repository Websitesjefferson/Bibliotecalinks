const {Router} = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/update")

const UsersControllers = require("../Controllers/UsersControllers")
const ensureAuthenticated = require("../middleware/ensureAuthenticated")
const UserAvatarController = require("../Controllers/UserAvatarController")

const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const usersControllers = new UsersControllers()
const userAvatarController = new UserAvatarController()


usersRoutes.post("/", usersControllers.create)
usersRoutes.put("/", ensureAuthenticated, usersControllers.Update)
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)


  

module.exports = usersRoutes