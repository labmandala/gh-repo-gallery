const overview = document.querySelector(".overview"); // Div where profile info appears
const username = "labmandala";
const repoList = document.querySelector(".repo-list"); // Select ul to display repos list

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
};

// Fetch repo data using endpoint & parameters according to API documentation
const gitRepos = async function () {
// Parameters to sort repos by most recently updated first & show up to 100 repos per page 
  const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await fetchRepos.json();
  console.log(gitRepos);
};

gitRepos();

// Display repo’s info using properties from fetched data
const displayRepos = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};
