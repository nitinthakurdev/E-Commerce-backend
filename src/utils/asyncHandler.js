const asynchandler = (handler)=>{
    (req,res,next)=>{
        Promise.resolve(handler(req,res,next)).catch(err => next(err))
    }
}

export {asynchandler}

// higher order function 
// const asynchandler = (fn) => async(req,res,next) => {
//     try{
//         await fn(req,res,next)
//     }catch(err){
//         res.status(err.code || 500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }