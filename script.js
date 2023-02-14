const app = document.querySelector(".app");
const userName = document.querySelector("#userName");
const email = document.querySelector("#email");
const age = document.querySelector("#age");

const url = "http://localhost:3000/users";

const registerUser = async () => {
  if (userName.value === "" && email.value === "" && age.value === "") {
    return;
  }
  app.innerHTML = "";
  const user = userName.value;
  const mail = email.value;
  const ag = age.value;
  const users = { name: user, email: mail, age: ag };
  const resData = await fetch(url, {
    method: "POST",
    body: JSON.stringify(users),
  });
  userName.value = "";
  email.value = "";
  age.value = "";
  const data = await resData.json();
  updateUI(data);
};

const updateUser = (event) => {
  console.log(event.target.id);
};

const deleteUser = async (event) => {
  const deleteUserId = event.target.id;
  console.log(deleteUserId);
  const deleteToUser = { email: deleteUserId };
  console.log(deleteToUser);
  const response = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify(deleteToUser),
  });
  const data = await response.json();
  updateUI(data);
};

const updateUI = (userInfo) => {
  const usersDiv = document.createElement("div");
  for (let i = 0; i < userInfo.length; i++) {
    const user = userInfo[i];
    const userDiv = document.createElement("div");
    userDiv.style.cssText = "margin-top: 8px";
    userDiv.innerHTML = `
        <div class="btn-container">
            <div class="user-name">${user.name}</div>
            <div class="btn-box">
                <button type="button" class="btn btn-success" id="${user.email}" onclick="updateUser(event)">CreateUser</button>
                <button type="button" class="btn btn-danger" id="${user.email}" onclick="deleteUser(event)">DeleteUser</button>
            </div>
        </div>
    `;
    usersDiv.append(userDiv);
  }
  app.append(usersDiv);
};

const fetchData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  updateUI(data);
};

fetchData();
