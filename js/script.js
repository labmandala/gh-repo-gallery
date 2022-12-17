const overview = document.querySelector(".overview"); // Div where profile info appears
const username = "labmandala";
const repoList = document.querySelector(".repo-list"); // Select ul to display repos list
const allReposContainer = document.querySelector(".repos"); // Select section where all repo info appears
const repoData = document.querySelector(".repo-data"); // Select section where individual repo data will appear
const viewReposButton = document.querySelector(".view-repos"); // Select the Back to Repo Gallery button
const filterInput = document.querySelector(".filter-repos"); // Select the input with the “Search by name” placeholder

// Fetch data from GitHub API, pull GH profile data
const gitUserInfo = async function () {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await userInfo.json();
  // Log out the response to the console, then call fx to see results
  //console.log(data);
  displayUserInfo(data);
};

gitUserInfo();

// Pull additional info from user profile & display on web page
const displayUserInfo = function (data) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
      <figure>
        <img alt="user avatar" src=${data.avatar_url} />
      </figure>
      <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
      </div>
    `;
  overview.append(div);
  gitRepos();
};

// Fetch repo data using endpoint & parameters according to API documentation
const gitRepos = async function () {
// Parameters to sort repos by most recently updated first & show up to 100 repos per page 
  const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await fetchRepos.json();
  //console.log(gitRepos);
  displayRepos(repoData);
};

// Display repo’s info using properties from fetched data
const displayRepos = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};

// Event listener for repo title to show the individual repo info
repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

// Get specific repo info
const getRepoInfo = async function (repoName) {
  const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchInfo.json();
  console.log(repoInfo);
  // Fetch data from language_url property of repoInfo
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  console.log(languageData); // Return data on the languages used in the repo

  // Make a list of languages
  const languages = [];
  for (const language in languageData) {
   languages.push(language);
  }

  displayRepoInfo(repoInfo, languages); // Call fx to display repo info 
};

// Display specific, individual repo info
const displayRepoInfo = function (repoInfo, languages) {
  viewReposButton.classList.remove("hide"); // Displays Back to Repo Gallery button
  repoData.innerHTML = ""; // Empty HTML where individual repo data will appear
  repoData.classList.remove("hide");
  allReposContainer.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  repoData.append(div);
};

// Event listener for the Back to Repo Gallery
viewReposButton.addEventListener("click", function () {
  allReposContainer.classList.remove("hide");
  repoData.classList.add("hide");
  viewReposButton.classList.add("hide");
});