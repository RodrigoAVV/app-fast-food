import EErrors from './errors/enums.js'

export default (error,req,res,next) => {
    switch(error.code){
        case EErrors.INVALID_TYPE_ERROR:
            res.status(400).send({
                success: false,
                error: error.name,
                description: error.cause
            })
            break
        default:
            res.status(500).send({
                success: 'error',
                error: error.name,
                description: error.cause
            })
            break
    }
    next()
}