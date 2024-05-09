const router = require("express").Router();
const {
  CreateServey,
  GetServeyResponse,
} = require("../controller/serveyController");

router.post("/servey", CreateServey);
router.get("/get-servey", GetServeyResponse);
module.exports = router;
