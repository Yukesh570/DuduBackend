import { autoInjectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { validateBodyInput } from "../../../controller/helper/validate";
import { LoginDao } from "../../../dao/auth/loginDao";
import {
  changePasswordDataClass,
  UserEditDataClass,
} from "../../../controller/dataClass/auth/loginDataclass";
import { hashPassword } from "auth/login";

// import { validateBodyInput } from "controller/helper/validate";

@autoInjectable()
export class UserController {
  constructor(private loginDao: LoginDao) {}

  /**
   @desc edit user
   @route put /api/user/edit:id
   @access private
   **/
  edit = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const id = Number(req.params.id);
    const { validatedData: validBody, errors } = await validateBodyInput(
      req,
      UserEditDataClass
    );
    if (errors) return res.status(400).json(errors);
    console.log("req.user.userType", req.user.userType);
    if (req.user.userType !== "admin" && req.user.id !== id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const users = await this.loginDao.update(id, { ...validBody });
    res.status(200).json({
      status: "success",
      data: users,
    });
  };
  /**
   @desc changePassword user
   @route changePassword /api/user/changePassword:id
   @access private
   **/
  changePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const id = Number(req.params.id);
    const { validatedData: validBody, errors } = await validateBodyInput(
      req,
      changePasswordDataClass
    );
    if (errors) return res.status(400).json(errors);
    if (req.user.userType !== "admin" && req.user.id !== id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const hashpass = await hashPassword(validBody.password);

    const users = await this.loginDao.update(id, { password: hashpass });
    res.status(200).json({
      status: "success",
      data: users,
    });
  };

  /**
   @desc Create user
   @route delete /api/user/delete:id
   @access private
   **/

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const id = Number(req.params.id);
    const users = await this.loginDao.delete(id);
    if (!users.affected) return res.status(400).json("Data not found");
    res.status(200).json({
      status: "Success",
    });
  };

  /**
     @desc get user
     @route get /api/user/getOne
     @access private
     **/

  getOne = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    console.log("req.user.userType", req.user.userType);
    const id = Number(req.params.id);
    if (req.user.userType !== "admin" && req.user.id !== id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await this.loginDao.repository.findOne({
      where: { id },
    });
    res.status(200).json({
      status: "success",
      data: user,
    });
  };

  /**
   @desc Create user
   @route get /api/user/getAll
   @access private
   **/

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const id = req.user.id;
    if (req.user.userType !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const users = await this.loginDao.getAll(); // raw user items with product relation

    res.status(200).json({
      status: "success",
      data: users,
    });
  };
}
