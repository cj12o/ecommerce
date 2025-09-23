class Apiresponse extends Error {
    constructor(statusCode,message="Succesfully responded",data){
        super(message)
        this.message=message
        this.statusCode=statusCode
        this.data=data
    }
}

export default Apiresponse