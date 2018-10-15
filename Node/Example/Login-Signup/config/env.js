const env = {
    PORT: process.env.PORT || '1234',
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://someuser:password1234@ds227243.mlab.com:27243/users',
    DATABASE_NAME: process.env.DATABASE_NAME || 'users'
}

module.exports = env