"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
var express_1 = require("express");
var user_controller_1 = require("./user-controller");
var router = (0, express_1.Router)();
var userController = new user_controller_1.UserController();
    * 
    * /user/signup;
    * post;
    * summary;
signup;
USER
    * description;
This;
api;
is;
use;
to;
register;
user in web / app.
    * requestBody;
    * required;
true
    * content;
    * application / json;
    * schema;
    * $ref;
'#/components/schemas/userSignup'
    * responses;
    * '200';
    * description;
signup;
Successfully
    * type;
application / json
    * /;
router.post('/signup', userController.signUp);
exports.userRoute = router;
