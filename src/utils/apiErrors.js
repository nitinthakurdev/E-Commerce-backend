class ApiErrors extends Error{
    constructor(
        statusCode,
        message="Somthing Went wrong",
        errors = [],
        statck = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors
        if(statck){
            this.stack = statck
        }else {
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiErrors}