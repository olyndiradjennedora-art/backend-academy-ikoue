import { userRepository } from "./outbound/user.repository";
import { userService } from "./domain/user.service";
import { UserController } from "./inbound/user.controller";

const repo = new userRepository()
const service = new userService(repo)
const router = UserController(service)

export default router;