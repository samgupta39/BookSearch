const router = require("express").Router();
const booksControllers = require("../controllers/booksControllers");

router.route("/")
  .post(booksControllers.create)
  .put(booksControllers.save)
  .get(booksControllers.findAll);

router.route("/:id")
  .get(booksControllers.findById)
  .delete(booksControllers.remove);

module.exports = router;
