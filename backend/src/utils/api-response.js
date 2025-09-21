class Apiresponse{
    constructor(statusCode,message="Succesfully responded",data){
        super(message)
        this.message=message
        this.statusCode=statusCode
        this.data=data
    }
}

export default Apiresponse