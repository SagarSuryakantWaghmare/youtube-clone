import { Router } from "express";
import { refershAccessToken, registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { loginUser } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { logoutUser } from "../controllers/user.controllers.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(
  loginUser
)

// Here we make the secure routes
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refreshToken").post(refershAccessToken)
export default router;
