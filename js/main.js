// A class to interact with the API's
class ApiHelpers {
  // to get the api data
  static get = async (url) => {
    try {
      let res = await fetch(url);
      if (res.ok) {
        let data = await res.json();
        return data;
      } else {
        console.log(`Une erreur s'est produite: ${res.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  }
}