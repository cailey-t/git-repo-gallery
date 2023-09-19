//Select div class .overview
const overview = document.querySelector(".overview");
//github username
const username = "cailey-t";
//unordered list to display repos
const repoList = document.querySelector(".repo-list");

//async function to fetch information from my github profile
const userData = async function() {
    const fetchUserData = await fetch(`https://api.github.com/users/${username}`);
    const data = await fetchUserData.json();
    displayUserInfo(data);
};

userData();

const displayUserInfo = function(data){
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
const userRepos = async function() {
    const fetchRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    displayRepos(repoData);
};

const displayRepos = function(repos) {
    for (const repo of repos){
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

userRepos();
