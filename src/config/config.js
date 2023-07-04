import dotenv from 'dotenv'

const environment = 'DEVELOPMENT'

dotenv.config({
    path:environment === 'DEVELOPMENT' ? './.env.development' : './.env.production'
})

export default {
    port:process.env.PORT,
    mongoUrl:process.env.MONGO_URL,
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    secretOrKey:process.env.SECRET_OR_KEY,
    secret:process.env.SECRET_SESSION,
    persistence:process.env.PERSISTENCE
}