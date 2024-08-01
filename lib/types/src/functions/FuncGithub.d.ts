export interface OutputData {
    username: string;
    id: number;
    public_repos: number;
    url: string;
    profile: {
        avatar: string;
        bio: string;
        company: string;
        created_at: string;
        updated_at: string;
    };
    account: {
        type: string;
        email: string | null;
        location: string;
        blog: string;
        twitter: string | null;
        followers: number;
        following: number;
    };
    followers: {
        url: string;
        data: {
            count: number;
            followers: {
                username: string;
                id: number;
                url: string;
                avatar: string;
            }[];
        };
    };
    repositories: {
        url: string;
        data: {
            count: number;
            repository: {
                name: string;
                id: number;
                description: string;
                fork: boolean;
                url: string;
                homepage: string;
            }[];
        };
    };
}
export interface GithubApiDataFollowers {
    login: string;
    id: number;
    url: string;
    avatar_url: string;
    html_url: string;
}
export interface GithubApiDataRepository {
    name: string;
    id: number;
    description: string;
    fork: boolean;
    url: string;
    html_url: string;
    homepage: string;
}
export declare function getGithubData(username: string): Promise<false | OutputData>;
