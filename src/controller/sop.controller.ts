import { NextFunction, Request, Response } from 'express'
import ErrorMessages from '~/constants/errorMessage'
import { HttpMessage, HttpStatus } from '~/constants/status'
import { ErrorWithStatus } from '~/models/errors'
import { 
  CreateSOPReqBody, 
  UpdateSOPReqBody, 
  AddProductToSOPReqBody,
  RemoveProductFromSOPReqBody
} from '~/models/requets/sop.request'
import sopService from '~/services/sop.service'

class SOPController {
  async createSOP(
    req: Request<Record<string, string>, any, CreateSOPReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const sop = await sopService.createSOP(req.body)
    res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: sop,
      msg: HttpMessage[HttpStatus.CREATED]
    })
  }

  async getSOPById(req: Request, res: Response, next: NextFunction) {
    const sop = await sopService.getSOPById(req.params.id)
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: sop })
  }

  async getAllSOPs(req: Request, res: Response, next: NextFunction) {
    const result = await sopService.getAllSOPs()
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: result })
  }

  async updateSOP(
    req: Request<Record<string, string>, any, UpdateSOPReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const updatedSOP = await sopService.updateSOP(req.params.id, req.body)
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'SOP updated successfully',
      data: updatedSOP
    })
  }

  async deleteSOP(req: Request, res: Response, next: NextFunction) {
    const deleted = await sopService.deleteSOP(req.params.id)
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, message: 'SOP deleted successfully' })
  }

  async addProductToSOP(
    req: Request<Record<string, string>, any, AddProductToSOPReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const updatedSOP = await sopService.addProductToSOP(req.params.id, req.body.product_id)
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Product added to SOP successfully',
      data: updatedSOP
    })
  }

  async removeProductFromSOP(
    req: Request<Record<string, string>, any, RemoveProductFromSOPReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const updatedSOP = await sopService.removeProductFromSOP(req.params.id, req.body.product_id)
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Product removed from SOP successfully',
      data: updatedSOP
    })
  }
}

const sopController = new SOPController()
export default sopController