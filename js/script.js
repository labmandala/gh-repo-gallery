// This div is where profile information will appear
const overview = document.querySelector(".overview");
const username = "labmandala";

const gitUserInfo = async function () {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await userInfo.json();
};

gitUserInfo();
