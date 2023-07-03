import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchData = async (page, perpage, searchq) => {
  try {
    const searchUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${searchq}&safe_search=1&per_page=${perpage}&page=${page}&format=json&nojsoncallback=1`;

    const getUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${API_KEY}&safe_search=1&per_page=${perpage}&page=${page}&format=json&nojsoncallback=1`;

    const url = searchq ? searchUrl : getUrl;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};
