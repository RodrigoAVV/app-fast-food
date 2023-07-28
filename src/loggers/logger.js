import winston from 'winston'
import * as dotenv from 'dotenv'
const customLevelOptions = {
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5
    },
    colors:{
        fatal:'red',
        error:'red',
        warning:'yellow',
        info:'yellow',
        http:'green',
        debug:'blue'
    }
}
dotenv.config()
const ENVIRONMENT = process.env.LOGGER
let logger
if(ENVIRONMENT === 'developer'){
    logger = winston.createLogger({
        levels:customLevelOptions.levels,
        transports:[
            new winston.transports.Console({
                level:'debug',
                format:winston.format.combine(
                    winston.format.colorize({
                        all:true,
                        colors:customLevelOptions.colors
                    }),
                    winston.format.simple()
                )
            })
        ]
    })
}else{
    logger = winston.createLogger({
        levels:customLevelOptions.levels,
        transports:[
            new winston.transports.File({
                filename:'src/loggers/logs/errors.log',
                level:'info'
            })
        ]
    })
}

export default logger