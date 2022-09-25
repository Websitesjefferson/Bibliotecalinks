const {Router} = require("express")

const NotesController = require("../Controllers/NotesController")
const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const notesRoutes = Router()

const notesController = new NotesController()

notesRoutes.use(ensureAuthenticated)

notesRoutes.post("/", notesController.create)
notesRoutes.put("/", notesController.update)
notesRoutes.get("/:id", notesController.show)
notesRoutes.delete("/:id", notesController.delete)
notesRoutes.get("/", notesController.index)



  

module.exports = notesRoutes