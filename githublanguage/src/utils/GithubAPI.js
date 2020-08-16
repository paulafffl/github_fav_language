const client_id = "6424af2a727bd1125847";
const client_secret = "";
const redirectUri = "http://localhost:3000/";

let code;

const GithubAPI = {
  
  getCode(username){
    // check for code
    const codeMatched = window.location.href.match(/code=([^&]*)/);
    if (codeMatched) {
      code = codeMatched[1];
      return code;
    //1ST Makes a GET request to return code
    } else {
      localStorage.setItem('savedUsername', username);
      const accessUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
      console.log(".....1 and code is", code)
    } 
  },

  async search(username){
    code = GithubAPI.getCode(username);
    const codeUrl = `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
    var proxyUrl = `https://cors-anywhere.herokuapp.com/${codeUrl}`;
    //2ND Makes a POST request to exchange code for access token
    const response1 = await fetch(proxyUrl, {
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      method: 'POST',
    })
    const jsonResponse1 = await response1.json();
    const accessToken = jsonResponse1.access_token;
    //3RD Makes a GET request of all repos of the specified username
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {Authorization: `${accessToken} OAUTH-TOKEN`}
      })
    const jsonResponse = await response.json();
    const mappedRepos = jsonResponse.map(repo => {
      return {
        language: repo.language
      }
    })
    const languages = []
    return mappedRepos.forEach(obj => {languages.push(obj.language)});
  },
  
}

export default GithubAPI;