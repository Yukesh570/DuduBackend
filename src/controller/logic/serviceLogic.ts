import { autoInjectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { validateBodyInput } from "controller/helper/validate";
import { ServiceDao } from "dao/serviceDao";
import {
  ServiceCreateBody,
  ServiceEditBody,
} from "controller/dataClass/serviceDataclass";
// import { validateBodyInput } from "controller/helper/validate";

@autoInjectable()
export class ServiceController {
  constructor(private serviceDao: ServiceDao) {}
  /**
   @desc Create service
   @route POST /api/service/create
   @access private
   **/
  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { validatedData: validBody, errors } = await validateBodyInput(
      req,
      ServiceCreateBody
    );
    if (errors) return res.status(400).json(errors);
    // if (req.user.userType !== "admin")
    //   return res.status(401).json({ message: "Unauthorized" });
    const service = await this.serviceDao.create({
      ...validBody,
    });

    res.status(200).json({
      status: "success",
      data: service,
    });
  };
  /**
   @desc Create service
   @route put /api/service/edit:id
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
      ServiceEditBody
    );
    if (errors) return res.status(400).json(errors);

    const service = await this.serviceDao.update(id, { ...validBody });
    res.status(200).json({
      status: "success",
      data: service,
    });
  };

  /**
   @desc Create service
   @route delete /api/service/delete:id
   @access private
   **/

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const id = Number(req.params.id);
    const service = await this.serviceDao.delete(id);
    if (!service.affected) return res.status(400).json("Data not found");
    res.status(200).json({
      status: "Success",
    });
  };

  /**
   @desc Create service
   @route get /api/service/getByPanel
   @access private
   **/

  getbypanel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const query = req.query;
  };

  /**
   @desc Create service
   @route get /api/service/getByname
   @access private
   **/

  getByName = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const name = req.query.name as string | undefined;
    const service = await this.serviceDao.getByName(name);
    res.status(200).json({
      status: "success",
      data: service,
    });
  };

  /**
   @desc Create service
   @route get /api/service/getByPanel
   @access private
   **/

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const service = await this.serviceDao.getAll();
    res.status(200).json({
      status: "success",
      data: service,
    });
  };
}
