document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // 사용자 데이터 확인 (로컬 스토리지 사용)
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        alert("이메일 또는 비밀번호가 올바르지 않습니다.");
        return;
    }

    alert(`환영합니다, ${user.name}님!`);
    // 로그인 성공 후 메인 페이지로 이동
    window.location.href = "/messeng/public/index.html";
});