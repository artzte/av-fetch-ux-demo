export default function Get(path) {
  let response;

  return new Promise((resolve, reject) => {
    fetch(path)
      .then((res) => {
        response = res;

        return response.json();
      })
      .then((json) => {
        if (!response.ok) {
          const { status, statusText } = response;
          const error = new Error(statusText);

          return reject(Object.assign(error, { status, statusText, response: json }));
        }

        return resolve(json);
      })
      .catch((err) => {
        const { status, statusText } = response;
        const error = new Error(err.message);
        return reject(Object.assign(error, { status, statusText }));
      });
  });
}
