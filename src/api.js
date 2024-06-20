import axios from 'axios';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // 기본 URL 설정
  timeout: 10000, // 요청 타임아웃 시간 설정 (밀리초)
  headers: {
    'Content-Type': 'application/json', // 기본 헤더 설정
  },
});

export default axiosInstance; // 생성된 Axios 인스턴스를 기본 내보내기로 설정
