let baseURL: string = "";

switch (process.env.NODE_ENV) {
  case "development":
    baseURL = "http://localhost:8030";
    break;
  case "":
}

export { baseURL };
