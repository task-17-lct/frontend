import axios from "axios";

// export const backend = axios.create({
//     baseURL: 'https://dev2.akarpov.ru/api/',
//     timeout: 10000,
//     headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg3Mjk0NTExLCJpYXQiOjE2ODQ3MDI1MTEsImp0aSI6ImUwNGNjZGViMzA0NzQxYTlhYzJhODRhNzc1YWFkZTIxIiwidXNlcl9pZCI6N30.M-F08v6Wit5Bbm668m84JThyDX5yZhzsh3_GFh3nzXM'}
//   });


  export const backend = axios.create({
    baseURL: 'https://0e06-92-100-146-65.ngrok-free.app/api/',
    timeout: 100000,
    headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg3NjEwNTg3LCJpYXQiOjE2ODUwMTg1ODcsImp0aSI6IjZhY2E2NDJkYWM0NzQyYmZhNGRjM2UzNjdiZTlhMzZhIiwidXNlcl9pZCI6OH0.JsmCZTvNXuL3VCgntvaDDtnA7u9eBeR6WFfgaosXWZo'}
  });

  