const checkLogin = (req, res, next) => {
    if (!req.oidc.isAuthentiated()){
        return res.status(401).send({
            error: 'You are not authorized to change any data. Please log in.',
            login: "https://cse341project-fnj4.onrender.com/login"
        });
    }
    next();
};

module.exports = {checkLogin};