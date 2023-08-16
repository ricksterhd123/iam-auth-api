const API_ID = process.env.API_ID;
const AWS_REGION = process.env.AWS_REGION;
const BASE_URL = `https://${API_ID}.execute-api.${AWS_REGION}.amazonaws.com`;

const { createSignedFetcher } = require('aws-sigv4-fetch');
const signedFetch = createSignedFetcher({ service: 'execute-api', region: AWS_REGION });

async function handler(event, handler) {
    console.log(event, handler);
    const response = await signedFetch(`${BASE_URL}/hello`);
    if (!response.ok) {
        throw new Error(await response.text())
    }
    return response.json();
}

module.exports = {
    handler,
};
