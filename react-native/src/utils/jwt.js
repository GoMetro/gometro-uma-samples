import { atob } from "./base64";

/**
 * Decode Token
 *
 * @param token
 *
 * @returns {string}
 */
export const decodeToken = (token) => {
    token = token.split(".")[1];

    token = token.replace(/-/g, "+");
    token = token.replace(/_/g, "/");
    switch (token.length % 4) {
        case 0:
            break;
        case 2:
            token += "==";
            break;
        case 3:
            token += "=";
            break;
        default:
            throw new Error("Invalid token");
    }

    token = decodeURIComponent(escape(atob(token)));

    token = JSON.parse(token);

    return token;
};

