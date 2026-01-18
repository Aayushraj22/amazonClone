const USER_ROLES = ['user', 'seller', 'admin', 'super_admin', 'delivery_agent']


export { USER_ROLES,  }


const checkLogicMiddleware = ( req, res, next ) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
}

const generateRandomOTP = ( length = 6 ) => {
    let otp = '';
    for ( let i = 0; i < length; i++ ) {
        otp += Math.floor( Math.random() * 10 ).toString();
    }
    return otp;
}

export { checkLogicMiddleware, generateRandomOTP }