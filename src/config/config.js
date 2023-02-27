export default {
    mongo: {
        URL: process.env.MONGO_URL,
    },
    app: {
        PORT: process.env.PORT,
        SECRET: process.env.SESSION_SECRET,
        TOKEN: process.env.TOKEN
    },
}