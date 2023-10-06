let baseURL: string = "";

switch (process.env.NODE_ENV) {
  case "development":
    baseURL = "http://localhost:8030";
    break;
  case "production":
    baseURL = "http://8.134.109.167:8030";
    break;
}

export { baseURL };
