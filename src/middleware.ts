import { verify } from "jsonwebtoken";
import User from "./models/user.model";


export class Middleware {
    
    public authenticateToken = async (req:any, res:any, next:any) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
      
        if (!token) {
          return res.redirect('/user/login'); 
        }
        
        verify(token, process.env.JWT_SECRET, async(err:any, decoded:any) => {
            if (err) {
              console.error('JWT verification error:', err);
              return res.redirect('/user/login', { message : 'Token Expired' }); 
            }
            
            const user = await User.findOne({_id : decoded._id});
            console.log(user);
            delete user.password;
            req.user = user;
            next(); 
          });
    }
}