import axios from "axios";
import keycloak from "./keycloak";

const instance = axios.create({
    // baseURL: `${process.env.REACT_APP_API_BASE_URL}`
    baseURL: "https://api.gometroapp.com/"
});

instance.interceptors.request.use(config => {
        return new Promise((resolve) => {
                return keycloak
                    .updateToken(5)
                    .then((token) => {
                        config.headers.Authorization = "Bearer " + token;
                        resolve(config);
                    })
                    .catch((error) => {
                        keycloak.logout();
                    });
            }
        )
    }
)

export default instance;
