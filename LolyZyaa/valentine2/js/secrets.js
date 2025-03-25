const validCredentials = {
  // username: "admin", // MASUKAN USERNAME KAMU DISINI, CONTOH: 'admin'
  // password: "admin", // MASUKAN PASSWORD KAMU DISINI, CONTOH: 'admin'
  username: "aW5kcmE=",
  password: "bG9seQ==",

};

function checkLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const encodedUsername = btoa(username);
  const encodedPassword = btoa(password);

  // const encodedUsername = username;
  // const encodedPassword = password;

  if (
    encodedUsername === validCredentials.username &&
    encodedPassword === validCredentials.password
  ) {
    // Hide login page
    document.getElementById("login-page").style.display = "none";
    // Show content
    document.getElementById("content").style.display = "block";
    // Start the valentine page animations
    initValentinePage();
  } else {
    document.getElementById("error-message").textContent =
      "Username atau password salah, coba lagi sayang ❤️";
  }
}

document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    checkLogin();
  }
});

function initValentinePage() {
  createHearts();
  setInterval(createHearts, 300);
  updateLoveCounter();

  const container = document.querySelector(".container");
  container.style.opacity = 0;
  let opacity = 0;
  const fadeIn = setInterval(() => {
    if (opacity >= 1) {
      clearInterval(fadeIn);
    }
    container.style.opacity = opacity;
    opacity += 0.02;
  }, 20);
}
