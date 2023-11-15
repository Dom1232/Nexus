const config = {
    env: process.env.NODE_ENV || 'development', 
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "NexusAuthenticate", 
    mongoUri: process.env.MONGODB_URI || "mongodb+srv://Dom1232:NexusAppGroupProject@nexusdatabase.uimnpxh.mongodb.net/Nexus?retryWrites=true&w=majority"||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' + 
    (process.env.MONGO_PORT || '27017') +
    '/mernproject' 
}
module.exports = config;
    

