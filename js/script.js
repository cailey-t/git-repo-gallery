//Select div class .overview
const overview = document.querySelector(".overview");
//github username
const username = "cailey-t";
//async function to fetch information from my github profile
const userData = async function() {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
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
        <div class = "user-info">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>
    `;
    overview.append(userInfo);
};

