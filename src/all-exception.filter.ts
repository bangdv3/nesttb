import { ArgumentsHost, Catch, HttpException, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { LogfService } from "./logformat/logf.service";
import { Request, Response } from "express";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

//response type when Exception happends
type ApiResponseObj = {
    statusCode: number,
    timestamp: string,
    path: string,
    response: string | object
}

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
    private readonly logger = new LogfService(AllExceptionFilter.name)

    catch(exception: any, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const responseObj: ApiResponseObj = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: ''
        } 

        if (exception instanceof HttpException) {
            responseObj.statusCode = exception.getStatus()
            responseObj.response = exception.getResponse()
        } else if (exception instanceof PrismaClientValidationError) {
            responseObj.statusCode = 422
            responseObj.response = exception.message.replaceAll (/\n/g,'')
        } else {
            responseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            responseObj.response = 'Internal Server Error'
        }
        response
            .status(responseObj.statusCode)
            .json(responseObj)
        this.logger.error(responseObj.response, AllExceptionFilter.name)

        super.catch(exception, host)
    }
}