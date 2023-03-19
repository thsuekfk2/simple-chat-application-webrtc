# simple-chat-application-webrtc

해당 레포지토리는 webRTC을 이용하여 간단한 화상 채팅 프로젝트를 연습한 개인 프로젝트입니다.

각 컴포넌트들은 아토믹 디자인을 활용하여 구현하였습니다.
[참고 사이트](https://fe-developers.kakaoent.com/2022/220505-how-page-part-use-atomic-design-system/).

css는 tailwind를 사용하였으며,
전역 상태 관리로는 recoil을 사용하였습니다.

## 주요 기능 📚

### 👀 룸 생성 및 룸 입장

- 룸 생성을 할 수 있으며, 현재 열려있는 룸을 확인할 수 있습니다.

### 👀 룸 입장 대기

- 룸 입장 전 화상, 음성 사용 유무를 선택할 수 있습니다.

### 👀 1:1 화상 및 채팅 구현

- 화상과 채팅을 동시에 할 수 있습니다. 

## 프로젝트 실행 방법

```
# server
$ npm i
$ npm start
```

```
# client
$ npm i
$ npm run dev
```

## 기술 스택✨

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/TypeScript-3178C6.svg?&style=for-the-badge&logo=TypeScript&logoColor=white"><img src="https://img.shields.io/badge/Tailwind CSS -06B6D4.svg?&style=for-the-badge&logo=Tailwind CSS&logoColor=white"><img src="https://img.shields.io/badge/WebRTC-333333.svg?&style=for-the-badge&logo=WebRTC&logoColor=white"><img src="https://img.shields.io/badge/Socket.io-010101.svg?&style=for-the-badge&logo=Socket.io&logoColor=white"><img src="https://img.shields.io/badge/Express-000000.svg?&style=for-the-badge&logo=Express&logoColor=white"><img src="https://img.shields.io/badge/Vite-646CFF.svg?&style=for-the-badge&logo=Vite&logoColor=white">
