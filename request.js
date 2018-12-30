const https = require("https");

/**
 * Requests the Urban Dictionary API with a term and returns an array of results.
 * @param {String} term - The term to search.
 * @returns {Promise<String>}
 */
module.exports = function request({ defid, term, limit = Infinity } = {}) {
  return new Promise((resolve, reject) => {
    if(!defid && !term)
      return reject(new Error("either defid or term must be provided."));
    const query = defid
      ? `defid=${encodeURIComponent(defid)}`
      : `term=${encodeURIComponent(term)}`;
    const req = https.get({
      host: "api.urbandictionary.com",
      path: `/v0/define?${query}`,
      headers: {
        "Accept": "application/json",
        "User-Agent": "Urban JavaScript (https://github.com/pollen5/urbandict.js)"
      }
    });
    req.once("response", (res) => {
      const body = [];
      res
        .on("data", (chunk) => body.push(chunk))
        .once("error", (err) => reject(err))
        .once("end", () => {
          try {
            let { list } = JSON.parse(Buffer.concat(body));
            if(!list) return Promise.reject(new Error("Malformed response body."));
            if(list.length > limit) list = list.slice(0, limit);
            return resolve(list);
          } catch(err) {
            return reject(err);
          }
        });
    });
    req.once("error", (err) => reject(err));
  });
};
