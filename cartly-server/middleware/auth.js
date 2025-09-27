import { verifyToken } from '../utils/jwt.js';

export const auth = (req, res, next)=>{
    const token = req.header('Authorization')?.replace('Bearer ','');
    if(!token)
        return res.status(401).json({error:"Access denied"});
    try {
        const decode = verifyToken(token);
        req.userId=decode;
        next();
    } catch (error) {
        return res.status(401).json({error:'Session expired!'});
    }
}