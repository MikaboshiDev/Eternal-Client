"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiTools = void 0;
const axios_1 = __importDefault(require("axios"));
/* The `ApiTools` class in TypeScript provides methods for interacting with a web API to post, get, and
retrieve applications with specific parameters and error handling. */
class ApiTools {
    constructor(url, client) {
        this.url = url;
        this.client = client;
    }
    /**
     * The function `postAppWeb` is an asynchronous method in TypeScript that posts application web data
     * with validation checks.
     * @param  - The `postAppWeb` function is an asynchronous function that takes in the following
     * parameters:
     */
    async postAppWeb({ description, iconURL, ownerId, licence, email, supportServer, }) {
        try {
            const regex = new RegExp(/(https?:\/\/.*\.(?:png|jpg))/);
            const params = [description, iconURL, ownerId, email];
            if (params.some((param) => !param))
                throw new Error('Missing parameters for postAppWeb method');
            if (!regex.test(iconURL))
                throw new Error('Invalid URL provided for iconURL parameter');
            await (0, axios_1.default)({
                method: 'POST',
                url: `${this.url}/aplications/register/${this.client.user?.id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    name: this.client.user?.username,
                    id: this.client.user?.id,
                    description: description ? description : 'No description provided',
                    licence: licence,
                    avatarURL: iconURL,
                    ownerId: ownerId,
                    guilds: this.client.guilds,
                    supportServer: supportServer,
                    emailContact: email,
                },
            })
                .then((res) => {
                return res.data;
            })
                .catch((err) => {
                throw new Error(err);
            });
        }
        catch (e) {
            throw new Error(e);
        }
    }
    /**
     * This TypeScript function makes an asynchronous GET request to retrieve application data based on the
     * provided ID.
     * @param  - It looks like you have a TypeScript method `getAppWeb` that takes an object with a `id`
     * property of type string as a parameter. The method makes a GET request using Axios to a specific URL
     * endpoint based on the provided `id`. If successful, it returns the response data, otherwise
     */
    async getAppWeb({ id }) {
        try {
            if (!id)
                throw new Error('Missing parameters for getAppWeb method');
            await (0, axios_1.default)({
                method: 'GET',
                url: `${this.url}/aplications/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                return res.data;
            })
                .catch((err) => {
                throw new Error(err);
            });
        }
        catch (e) {
            throw new Error(e);
        }
    }
    /**
     * This TypeScript function makes an asynchronous GET request to retrieve applications data from a
     * specified URL.
     */
    async getAppsWeb() {
        try {
            await (0, axios_1.default)({
                method: 'GET',
                url: `${this.url}/aplications`,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                return res.data;
            })
                .catch((err) => {
                throw new Error(err);
            });
        }
        catch (e) {
            throw new Error(e);
        }
    }
}
exports.ApiTools = ApiTools;
//# sourceMappingURL=apiTools.js.map