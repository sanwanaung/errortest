const app = document.querySelector(".app");
const userName = document.querySelector("#userName");
const email = document.querySelector("#email");
const age = document.querySelector("#age");

const url = "http://localhost:3000/users";

const registerUser = async () => {
  if (userName.value === "" && email.value === "" && age.value === "") {
    return;
  }

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
  app.innerHTML = "";
  updateUI(data);
};

const updateUser = async (event) => {
  const name = document.querySelector(".updateName").value;
  const email = document.querySelector(".updateEmail").value;
  const age = document.querySelector(".updateAge").value;
  const updateInfo = { name, email, age };
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(updateInfo),
  });
  const data = await response.json();
  app.innerHTML = "";
  updateUI(data);
};

const deleteUser = async (event) => {
  app.innerHTML = "";
  const deleteUserId = event.target.id;
  console.log(deleteUserId);
  const deleteToUser = { email: deleteUserId };
  console.log(deleteToUser);
  const response = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify(deleteToUser),
  });
  const data = await response.json();
  console.log(data);
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
                <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@mdo"
      >
        Open modal for @mdo
      </button>
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
