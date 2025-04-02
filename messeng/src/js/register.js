document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;

    // 유효성 검사
    if (!email || !password || !name || !gender) {
        alert("모든 필드를 입력해주세요.");
        return;
    }

    // 사용자 데이터 저장 (로컬 스토리지 사용)
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        alert("이미 존재하는 이메일입니다.");
        return;
    }

    users.push({ email, password, name, gender });
    localStorage.setItem("users", JSON.stringify(users));

    alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
    window.location.href = "./public/login.html";
});