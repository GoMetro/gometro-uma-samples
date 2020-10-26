/**
 * Generate Random Data
 *
 * @param len
 *
 * @returns {any[]|Uint8Array}
 */
const generateRandomData = (len) => {
    // use web crypto APIs if possible
    let array = null;
    const crypto = window.crypto || window.msCrypto;
    if (crypto && crypto.getRandomValues && window.Uint8Array) {
        array = new Uint8Array(len);
        crypto.getRandomValues(array);
        return array;
    }

    // fallback to Math random
    array = new Array(len);
    for (let j = 0; j < array.length; j++) {
        array[j] = Math.floor(256 * Math.random());
    }

    return array;
}

/**
 * Generate Random String
 *
 * @param len
 * @param alphabet
 *
 * @returns {string}
 */
const generateRandomString = (len, alphabet) => {

    const randomData = generateRandomData(len);
    const chars = new Array(len);

    for (let i = 0; i < len; i++) {
        chars[i] = alphabet.charCodeAt(randomData[i] % alphabet.length);
    }

    return String.fromCharCode.apply(null, chars);
}

/**
 * Create UUID
 *
 * @returns {string}
 */
export const createUUID = () => {

    const hexDigits = "0123456789abcdef";
    const s = generateRandomString(36, hexDigits).split("");
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";

    return s.join("");
};
