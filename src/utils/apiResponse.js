class ApiResponse {
    constructor(stateCode,data,message= "Success"){
        this.stateCode = stateCode
        this.data = data
        this.message = message
        this.success = stateCode
    }
}

export {ApiResponse}