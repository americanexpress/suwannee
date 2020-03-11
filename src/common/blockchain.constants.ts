import 'dotenv/config';
export const BLOCKCHAIN_SERVICE = 'BlockchainService';
export const PLATFORM = require((process.env.PLATFORM == null) ? './default' : `${process.env.PLATFORM}`).default;
