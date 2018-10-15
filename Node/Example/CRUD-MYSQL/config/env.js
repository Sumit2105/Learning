'use strict'

const env = {
    PORT: process.env.PORT || 1234,
    DATABASE_URL: process.env.DATABASE_URL || '',
    DATABASE_NAME: process.env.DATABASE_NAME || 'practice',
    DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
    DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'sumeet',
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'dvector2',
    DATABASE_PORT: process.env.DATABASE_PORT || 3306,
    DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'mysql',
};

module.exports = env;