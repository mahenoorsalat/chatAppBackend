export const ProtectRoute = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(' ')[1];

    try{
        token.verify(token, process.env.JWT_SECRET , {
            expiredIn : '1d'
        });
        next();
    }
    catch(error){
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
