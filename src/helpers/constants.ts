export class Constants {
    public static readonly UNAUTHORIZED_CODE = 401;
    public static readonly NOT_FOUND_CODE = 404;
    public static readonly SUCCESS_CODE = 200;
    public static readonly INTERNAL_SERVER_ERROR_CODE = 500;
    public static readonly FAIL_CODE = 400;
    public static readonly FORBIDDEN_CODE = 403;
    public static readonly NOT_ACCEPTABLE_CODE = 406;
    public static readonly FOUND = 404;
    public static readonly REQUIRED_FIELD = 460;
    public static readonly TIMEZONE = 'Asia/Kolkata';
    public static readonly SUCCESS = 'SUCCESS';
    public static readonly ERROR = 'ERROR';
    public static readonly BAD_DATA = 'BAD_DATA';
    public static readonly BACKEND_API_FAILURE = 'BACKEND_API_FAILURE';
    public static readonly CODE = 'CODE';
    public static readonly APPROVED = 'APPROVED';

    public static readonly MESSAGE = {
        NOT_FOUND : '404 Not found',
        INTERNAL_SERVER_ERROR : 'Internal Server Error',
        USER_REGISTER_SUCCESS : 'User Register Successfully',
        USER_LOGIN_SUCCESS : 'User Login Successfully',
    }

    public static readonly TABLES = {
        USER : 'user',
        TASK : 'task'
    }
}