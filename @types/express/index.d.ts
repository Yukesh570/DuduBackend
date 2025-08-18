import { User } from "entity/users/user";



declare global{
    namespace Express {
        interface Request {
            user: User;
        }
    }
}