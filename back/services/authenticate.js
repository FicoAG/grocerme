const UserModel = require('../models/users.model')
const VendorModel = require('../models/vendors.model')
const jwt = require('jsonwebtoken')

const authenticated = (req, res, next) => {
    jwt.verify(req.headers.token, 'secret', (err, token) => {
        if (err) {
            res.status(403).json({
                error: 'Token not valid'
            })
        }
        UserModel.findOne({email : token.email})
            .then( user => {
                if (user) {
                    // es un  usuario 

                    console.log("es un usuario")
                    if (!req.locals){
                        req.locals = {}
                    }
                    req.locals.authenticated = user;
                    next();

                } else {
                    // no era un user, es un vendor 
                    VendorModel.findOne({
                            email: token.email
                        })
                        .then(vendor => {
                            if (vendor) {
                                // es un vendor
                                console.log("es un vendor")

                                if (!req.locals) {
                                    req.locals = {}
                                }
                                req.locals.authenticated = vendor;
                                next();

                            } else {
                                console.log('No eras ni usuario ni vendor pillín. ENTERAAOOO');
                                return res.status(403).json({err : "Vete pa tu casa machango"})
                                
                            };

                        })

                };
                
            })
            .catch(err => {
                console.log('Hubo un error estramboliiico')
                VendorModel
            })

        console.log(token)
    });
}

const me = (req, res, next) => {
    if (req.params.id === req.locals.user._id) {
        next()
    }else{
        req.status(403).json({err : `You are not ${req.params.id} so you cant do a ${req.method}`});
    }
}

module.exports = {
   authenticated,
   me

}