"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGithubData = void 0;
const axios_1 = __importDefault(require("axios"));
async function getGithubData(username) {
    const res = await (0, axios_1.default)({
        method: 'GET',
        url: `https://api.github.com/users/${username}`,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (res.status !== 200)
        return false;
    const [resfoll, resPos] = await Promise.all([
        axios_1.default.get(res.data.followers_url, {
            headers: {
                'Content-Type': 'application/json',
            },
        }),
        axios_1.default.get(res.data.repos_url, {
            headers: {
                'Content-Type': 'application/json',
            },
        }),
    ]);
    const followers = resfoll.data.map((follower) => {
        return {
            username: follower.login,
            id: follower.id,
            url: follower.html_url,
            avatar: follower.avatar_url,
        };
    });
    const repository = resPos.data.map((repo) => {
        return {
            name: repo.name,
            id: repo.id,
            description: repo.description,
            fork: repo.fork,
            url: repo.html_url,
            homepage: repo.homepage,
        };
    });
    const output = {
        username: res.data.login,
        id: res.data.id,
        public_repos: res.data.public_repos,
        url: res.data.html_url,
        profile: {
            avatar: res.data.avatar_url,
            bio: res.data.bio,
            company: res.data.company,
            created_at: res.data.created_at,
            updated_at: res.data.updated_at,
        },
        account: {
            type: res.data.type,
            email: res.data.email,
            location: res.data.location,
            blog: res.data.blog,
            twitter: res.data.twitter_username,
            followers: res.data.followers,
            following: res.data.following,
        },
        followers: {
            url: res.data.followers_url,
            data: {
                count: resfoll.data.length,
                followers,
            },
        },
        repositories: {
            url: res.data.repos_url,
            data: {
                count: resPos.data.length,
                repository,
            },
        },
    };
    return output;
}
exports.getGithubData = getGithubData;
//# sourceMappingURL=FuncGithub.js.map