const client_id = "6424af2a727bd1125847";
const client_secret = "";
const redirectUri = "http://localhost:3000/";

let accessToken;

const GithubAPI = {

  mostFrequentItem(array) {
    return array.reduce((previous, current, i, arr) =>
    arr.filter(item => item === previous).length > arr.filter(item => item === current).length ? previous : current);
  },
  
  getCode(){
    //1ST Makes a GET request to retrieve a temporary code
    const accessUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirectUri}`;
    window.location = accessUrl;
  },

  async getAccessToken(){
    const code = GithubAPI.getCode();
    const codeUrl = `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
    var proxyUrl = `https://cors-anywhere.herokuapp.com/${codeUrl}`;
    //2ND Makes a POST request to exchange code for access token
    try {
      const response = await fetch(proxyUrl, {
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        method: 'POST',
      })
      if (response.ok) {
        const jsonResponse = await response.json();
        accessToken = jsonResponse.access_token;
        return accessToken;
      }
      throw new Error('POST Request Failed');
    } catch (error) {
      return console.log(error, "Failed at: retrieving access token. Reason: possibly the code has expired");
    }
  },

  async search(username){
    //3RD Makes a GET request of all repos of the specified username
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {Authorization: `${accessToken} OAUTH-TOKEN`}
      })
      if (response.ok) {
        const jsonResponse = await response.json();
        const mappedRepos = jsonResponse.map(repo => {
          return {
            language: repo.language
          }
        })
        const languages = []
        mappedRepos.forEach(obj => {languages.push(obj.language)});
        const favLanguage = this.mostFrequentItem(languages);
        return `${username}'s favourite language is ${favLanguage}!`;
      }
      throw new Error('GET Request Failed');
    } catch (error) {
      console.log(error, " Failed at: retrieving repositories list of given user. Reason: possibly invalid username");
      return "Invalid username, please check if there isn't any typos :)";
    }
  },
  
}

export default GithubAPI;