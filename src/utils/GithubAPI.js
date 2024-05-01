// Details available on https://github.com/settings/developers
import { config } from "./SensitiveInfo";

const client_id = config.client_id;
const client_secret = config.client_secret;
// const redirectUri = "http://localhost:3000/";
const redirectUri = "http://github_fav_language.surge.sh/";

const GithubAPI = {
  //GET request to retrieve a temporary code
  getCode() {
    const accessUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirectUri}`;
    window.location = accessUrl;
  },

  //POST request to exchange code for access token
  async fetchAccessToken(code) {
    const codeUrl = `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
    const proxyUrl = `https://cors-anywhere.herokuapp.com/${codeUrl}`;
    const reqConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
    };
    try {
      const response = await fetch(proxyUrl, reqConfig);
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
      }
      throw new Error();
    } catch (error) {
      console.log(error);
      return Error;
    }
  },

  //GET request of all repos of the specified username
  async fetchRepos(username, accessToken) {
    const url = `https://api.github.com/users/${username}/repos`;
    const reqConfig = {
      headers: { Authorization: `${accessToken} OAUTH-TOKEN` },
      method: "GET",
    };
    try {
      const response = await fetch(url, reqConfig);
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
      }
      throw new Error();
    } catch (error) {
      console.log(error);
      return Error;
    }
  },

  //Maps repositories and returns favourite language based on occurrence
  responseMap(jsonResponse) {
    const mappedRepos = jsonResponse.map((repo) => {
      return {
        language: repo.language,
      };
    });
    const languages = [];
    mappedRepos.forEach((obj) => {
      languages.push(obj.language);
    });
    const favLanguage = this.mostFrequentItem(languages);
    return favLanguage;
  },

  //Returns the most frequent item within an array
  mostFrequentItem(array) {
    if (array.length > 0) {
      return array.reduce((previous, current, i, arr) =>
        arr.filter((item) => item === previous).length >
        arr.filter((item) => item === current).length
          ? previous
          : current
      );
    }
  },
};

export default GithubAPI;
