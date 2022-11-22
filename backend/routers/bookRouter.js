const router = require("express").Router();

const { bookControllers } = require("../controllers");
const { multerUpload } = require("../helpers/multer");

router.post("/create", bookControllers.create);
router.get("/get", bookControllers.getAll);
router.get("/getby", bookControllers.getBy);
router.patch("/update", bookControllers.update);
router.delete("/delete", bookControllers.delete);
router.get("/search", bookControllers.searchBy);
router.get("/sort", bookControllers.sortBy);
router.get("/view2", bookControllers.view2);
router.post("/upload/:id", multerUpload.single("file"), bookControllers.uploadFile);

module.exports = router;
