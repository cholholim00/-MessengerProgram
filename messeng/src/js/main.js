const loginButton = document.getElementById("loginButton");
const usernameInput = document.getElementById("usernameInput");

loginButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    if (username) {
        localStorage.setItem("username", username);
        window.location.href = "chat.html";
    } else {
        alert("사용자 이름을 입력해주세요.");
    }
});