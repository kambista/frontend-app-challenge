import { instance } from "./config";

export const setupInterceptors = () => {
  instance.interceptors.request.use(function (config) {
    return config;
  });
};
