import router from "../router/index";

export const errorHandler = (status, error) => {
  if (status === 422) {
    throw error;
  }
  switch (status) {
    case 404:
      return router.push({ name: "Error", query: { status: 404 } });

    case 401:
      return router.push({ name: "signIn" });

    case 403:
      return router.push({ name: "Error", query: { status: 403 } });

    case 419:
      return router.push({ name: "SignIn", query: { status: 403 } });

    case 429:
      return router.push({ name: "Error", query: { status: 429 } });

    case 500:
      return router.push({ name: "Error", query: { status: 500 } });

    default:
      return router.push({ name: "Error", query: { status: 500 } });
  }
};

export const networkErrorHandler = (error) => {
  if (!error.response && error.toJSON().message === "Network Error") {
    alert("Ooops \n Netwok Error \n Make sure your connected to internet !");
    throw new Error(error);
  }
};
