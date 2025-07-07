import "dotenv/config";

export const config = {
PORT: process.env.PORT ?? 3008,
    //Meta
    jwtToken: process.env.jwtToken,
    numberId: process.env.numberId,
    verifyToken: process.env.verifyToken,
    version: "v22.0",
    //AI
    Model: process.env.Model,
    Apikey: process.env.ApiKey,
    //Google Sheets
    spreedsheetId: process.env.spreedsheetId,
    privateKey: process.env.privateKey,
    clientEmail: process.env.clientEmail
};