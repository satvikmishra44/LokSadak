const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies && req.cookies.token;
    if(!token){
        return res.status(400).json({success: false, message: 'No token provided.'});
    }

    try{
        const decoded = jwt.verify(token, process.env.Token);
        req.user = decoded;
        next();
    } catch(err) {
        return res.status(403).json({success: false, message: 'Invalid Token'});
    }
}

module.exports = verifyToken;