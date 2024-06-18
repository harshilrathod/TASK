import { Constants } from "./constants";


export class ResponseBuilder {
    public code: number;
    public msg: string;
    public error: string;
    public result: JSON;
    public description: string;

    public static successMessage(msg: string): ResponseBuilder {
        const rb: ResponseBuilder = new ResponseBuilder();
        rb.code = Constants.SUCCESS_CODE;
        rb.msg = msg;
        return rb;
    }

    public static validation(msg: string): ResponseBuilder {
        const rb: ResponseBuilder = new ResponseBuilder();
        rb.code = Constants.FORBIDDEN_CODE;
        rb.msg = msg;
        return rb;
    }

    public static notFound(msg: string): ResponseBuilder {
        const rb: ResponseBuilder = new ResponseBuilder();
        rb.code = Constants.NOT_FOUND_CODE;
        rb.msg = msg;
        return rb;
    }

    public static errorMessage(msg?: any): ResponseBuilder {
        const rb: ResponseBuilder = new ResponseBuilder();
        rb.code = Constants.INTERNAL_SERVER_ERROR_CODE;
        rb.msg = msg !== null ? msg : Constants.MESSAGE.INTERNAL_SERVER_ERROR;
        return rb;
    }

    public static badRequest(msg: any): ResponseBuilder {
        const rb: ResponseBuilder = new ResponseBuilder();
        rb.code = Constants.FAIL_CODE;
        rb.error = msg;
        return rb;
    }

    public static data(result: any, msg?: any): ResponseBuilder {
        const rb: ResponseBuilder = new ResponseBuilder();
        rb.code = Constants.SUCCESS_CODE;
        rb.result = result;
        rb.msg = msg || null;
        return rb;
    }

}
