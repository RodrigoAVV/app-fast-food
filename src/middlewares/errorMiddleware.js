const errorMiddleware = (req,res) => {
    res.status(500).json({
        success:false,
        error:errorMiddleware.message
    })
}

export default errorMiddleware