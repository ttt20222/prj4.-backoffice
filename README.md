# prj4.-backoffice
prj4. 백오피스 프로젝트

## 🏁 목표

"Express.js, MySQL을 활용해 음식 배달 서비스 백엔드 서버 만들기"


## 🚀 설치 및 실행 방법

### 1. 프로젝트 클론

```
git clone https://github.com/ttt20222/prj4.-backoffice.git
cd prj4.-backoffice
```

### 2. 의존성 설치
```
yarn
```
### 3. 환경 변수 설정

`.env` 파일을 생성하고 다음 내용을 추가합니다:

```env
SERVER_PORT=
SERVER_IP=

# 데이터베이스 
DATABASE_URL=
# ACCESS TOKEN SECRET
ACCESS_TOKEN_SECRET=
# REFRESH TOKEN SECRET
REFRESH_TOKEN_SECRET=
# 이메일 인증 관련
MAILPASS=

####################### AWS S3 업로드 관련 #########################
# AWS ACEESS REGION // 접속 지역
AWS_S3_REGION=
# AWS ACCESS KEY ID // 엑세스 키
AWS_ACCESS_KEY_ID=
# AWS SECRET ACCESS KEY // 시크릿 키
AWS_SECRET_ACCESS_KEY=
# AWS BUCKET // 버킷 이름
AWS_BUCKET=
##################################################################

```

### 4. 데이터베이스 generate

```
yarn prisma generate
```

### 5. 서버 실행

```
yarn dev
```


## 📋 API 명세서

[API 명세서](https://www.notion.so/teamsparta/c0518474ab7a429794e6febdead020e3?pvs=4)

## 📑 ERD (Entity Relationship Diagram)

[ERD](https://drawsql.app/teams/les-team-1/diagrams/prj3)

## 🔒 인증 및 인가

- **JWT**를 사용하여 인증 및 인가를 처리합니다.
- **Middleware**를 활용하여 인증 및 역할 기반 인가를 구현합니다.

## 🌐 배포

- **http://54.160.249.70:3000/api**


### commit 규칙

| 작업 타입   | 작업내용                       |
| ----------- | ------------------------------ |
| update   | 해당 파일에 새로운 기능이 생김 |
| add      | 없던 파일을 생성함, 초기 세팅  |
| bugfix   | 버그 수정                      |
| refactor | 코드 리팩토링                  |
| fix      | 코드 수정                      |
| move     | 파일 옮김/정리                 |
| del      | 기능/파일을 삭제               |
| test     | 테스트 코드를 작성             |
| style    | CSS 스타일 변경                |
| gitfix   | .gitignore 수정                |
| function | function.js 변경(기능추가 등)  |
