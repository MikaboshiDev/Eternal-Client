import axios from "axios";

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

export async function getGithubData(username: string) {
  const res = await axios({
    method: 'GET',
    url: `https://api.github.com/users/${username}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status !== 200) return false;
  const [resfoll, resPos] = await Promise.all([
    axios.get(res.data.followers_url, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),
    axios.get(res.data.repos_url, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  ]);

  const followers = resfoll.data.map((follower: GithubApiDataFollowers) => {
    return {
      username: follower.login,
      id: follower.id,
      url: follower.html_url,
      avatar: follower.avatar_url,
    };
  });

  const repository = resPos.data.map((repo: GithubApiDataRepository) => {
    return {
      name: repo.name,
      id: repo.id,
      description: repo.description,
      fork: repo.fork,
      url: repo.html_url,
      homepage: repo.homepage,
    };
  });

  const output: OutputData = {
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
