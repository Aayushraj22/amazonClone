import { Router } from "express";
import { msg, statusCodes } from "../utils/statusMsg.js";
import userRoutes from '../features/users/route.js'
import { checkLogicMiddleware } from "../utils/index.js";

const router = Router();

const userServiceServer = `http://localhost:8001`;


router.get('/health', (req, res) => {
    res.json({
        status: statusCodes.OK,
        msg: 'Healthy Server'
    })
})

router.use("/user", checkLogicMiddleware, userRoutes);

// ALL UNKNOWN ROUTES
router.use((req, res) => {
  res.status(statusCodes.BAD_REQUEST).json({
    status: statusCodes.BAD_REQUEST,
    msg: msg.Not_Found,
  });
});

export default router;
