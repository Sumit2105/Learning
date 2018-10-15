const env = {
    PORT: process.env.PORT || 1234,
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://someuser:password1234@dbh63.mlab.com:27637/crud-mongoclient',
    DATABASE_NAME: 'crud-mongoclient'
}

module.exports = env;