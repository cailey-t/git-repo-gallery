//Select div class .overview
const overview = document.querySelector(".overview");
//github username
const username = "cailey-t";
//unordered list to display repos
const repoList = document.querySelector(".repo-list");
//selects section where ALL repo data appears
const repos = document.querySelector(".repos");
//selects section where individual repo data appears
const repoData = document.querySelector(".repo-data");
//back to gallery button
const backButton = document.querySelector("button");
//search repo by name input
const filterInput = document.querySelector("input");

//async function to fetch information from my github profile
const userData = async function () {
    const fetchUserData = await fetch(`https://api.github.com/users/${username}`);
    const data = await fetchUserData.json();
    displayUserInfo(data);
};

userData();

const displayUserInfo = function (data) {
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = `
        <figure>
            <img alt = "user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>
    `;
    overview.append(userInfo);
};

//async function to fetch repos
const userRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    displayRepos(repoData);
};

//displays all repos
const displayRepos = function (repos) {
    filterInput.classList.remove("hide");

    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

userRepos();

//click event item in repo list
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

//async function to get specific repo info
const getRepoInfo = async function (repoName) {
    const fetchRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchRepo.json();

    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageData = await fetchLanguages.json();

    const languages = [];
    for (let language in languageData) {
        languages.push(language);
    }
    
    displayRepoInfo(repoInfo, languages);
};

//displays specific repo info upon click event
const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    repos.classList.add("hide");
    backButton.classList.remove("hide");

    const divRepo = document.createElement("div");
    divRepo.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(divRepo);
};

//click event to the back button
backButton.addEventListener("click", function() {
    repos.classList.remove("hide");
    repoData.classList.add("hide");

});

//input event to search box
filterInput.addEventListener("input", function(e) {
    const searchText = e.target.value;
    const reposAll = document.querySelectorAll(".repo");
    const searchLower = searchText.toLowerCase();

    for (const repo of reposAll) {
        const repoLower = repo.innerText.toLowerCase();
        if (repoLower.includes(searchLower)){
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});

