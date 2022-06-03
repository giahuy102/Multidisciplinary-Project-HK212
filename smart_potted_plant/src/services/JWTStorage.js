export const storeToken = async (key, value) => {
    try {
        localStorage.setItem(key, value);
    }
    catch (err) {
        // console.log(1);
        console.log(err);
    }
};

export const loadToken = async () => {
    try {
        const value = localStorage.getItem('jwt-token');
        if (value !== null) {
          // We have data!!
          return value;
        }
        return null;
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
}

export const removeKey = async (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    }
    catch(err) {
        console.log(err);
    }
};