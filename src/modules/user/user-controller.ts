import { Constants } from "../../helpers/constants";
import { UserUtils } from "./user-utils";
export class UserController {
    private userUtils = new UserUtils();

    public signUp = async (req: any, res: any) => {
        const { first_name, last_name, email, mobile_number, password } = req.body;
        const userData = {
            first_name, last_name, email, password, mobile_number
        }
        const result: any = await this.userUtils.signUp(userData);
        console.log(result);

        if (result.code == Constants.SUCCESS_CODE) {
            res.render('login.ejs', { message: result.msg });
        }
        res.render('signup.ejs', { message: result.msg });

        // return res.status(result.code).json(result);

    }

    public login = async (req: any, res: any) => {
        const { email, password } = req.body;
        const userData = {
            email, password
        }
        const result: any = await this.userUtils.login(userData);
        console.log(result.result.allTask);

        if (result.code == Constants.SUCCESS_CODE) {
            // return res.status(result.code).json(result);
            res.render('dashboard.ejs',
                {
                    message: result.msg,
                    data: result.result,
                    allTask: result.result.allTask
                }
            );
        }
        else{
            res.render('login.ejs', { message: result.msg });
        }

        // return res.status(result.code).json(result);

    }

}