const elForm = document.querySelector(".login__card");
elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    username: e.target[0].value,
    password: e.target[1].value,
  };
  const confirm = {
    checkUsername: "john@mail.com",
    checkPassword: "changeme"
  };
  if (
    data.username == confirm.checkUsername &&
    data.password == confirm.checkPassword
  ) {
    window.localStorage.setItem("user", JSON.stringify(data));
    setTimeout(() => {
      window.location = "./admin.html";
    }, 1000);
  } else {
    alert(
      "Notug'ri login yoke parol kiritildi iltimos boshqattan urinib ko'ring !"
    );
    e.target.reset();
  }
});
