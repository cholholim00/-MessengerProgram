# kakao-clone-app

이 프로젝트는 카카오톡과 유사한 웹 애플리케이션으로, 로그인, 유저 목록, 채팅 기능을 제공합니다. 

## 프로젝트 구조

```
kakao-clone-app
├── public
│   ├── index.html        # 애플리케이션의 진입점 HTML 파일
│   ├── login.html        # 사용자 로그인 페이지 HTML 파일
│   ├── chat.html         # 채팅 인터페이스 HTML 파일
│   ├── css
│   │   ├── styles.css    # 일반 스타일 시트
│   │   └── chat.css      # 채팅 인터페이스 전용 스타일 시트
│   └── images
│       └── send-icon.png # 메시지 전송 아이콘 이미지
├── src
│   ├── js
│   │   ├── main.js       # 애플리케이션 초기화 및 전역 기능 처리
│   │   ├── login.js      # 사용자 로그인 처리
│   │   └── chat.js       # 채팅 기능 관리
│   └── api
│       └── userApi.js    # 사용자 관련 API와 상호작용하는 함수
├── package.json           # npm 설정 파일
├── README.md              # 프로젝트 문서
└── .gitignore             # Git 무시 파일
```

## 설치 및 실행

1. **저장소 클론**: 
   ```
   git clone <repository-url>
   ```

2. **의존성 설치**: 
   ```
   npm install
   ```

3. **애플리케이션 실행**: 
   ```
   npm start
   ```

## 사용 방법

- 사용자는 `login.html` 페이지에서 로그인 후, `chat.html` 페이지로 이동하여 채팅 기능을 사용할 수 있습니다.
- 친구 목록은 `chat.html`에서 확인할 수 있으며, 메시지를 입력하고 전송할 수 있는 인터페이스가 제공됩니다.

## 기여

기여를 원하시는 분은 이 저장소를 포크한 후, 변경 사항을 제안해 주세요.