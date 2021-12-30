//this is an user defined middleware, used in files named 11-methods-* examples.

//a simple version of authorize middleware
// const authorize = (req, res, next) =>{
//     console.log(req.query)
//     console.log("Authorized")
//     next() // //Express provides this function to go to the next middleware or go to the get method as per the req url
// }

//little complex version of authorize middleware
const authorize = (req, res, next) =>{
    // console.log(req.query)
    const {username} = req.query
    if(username=='dipto'){
        req.user = {username, id: 3}
        next() ///Express provides this function to go to the next middleware or go to the get method as per the req url
    }else{
        res.status(401).send("Not Authorized, Access Denied")
    }
}

module.exports = authorize