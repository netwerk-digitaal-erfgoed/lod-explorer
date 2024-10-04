const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });


/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.goudatijdmachine.nl',
                port: '',
                pathname: '**',
                search: ''
            }
        ]
    },
    env: Object.keys(process.env).reduce((acc, key) => {
        if (key.startsWith('NEXT_PUBLIC_')) {
            acc[key] = process.env[key];
        }
        return acc;
    }, {})
}

module.exports = nextConfig
