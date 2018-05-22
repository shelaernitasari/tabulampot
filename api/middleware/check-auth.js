const jwt = require('jsonwebtoken');

module.export = (req, res, next) => {
    try {
        const token = req.headers.autorization.split(" ")[1];
        const decoded = jwt.verify(token, 'shelaernitasari');
        req.userData =decoded;
        next();
    }
    catch (error){
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};