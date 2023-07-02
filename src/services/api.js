import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchData = async (page, perpage) => {
  try {
    const response = await axios.get(
      ` https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${API_KEY}&per_page=${perpage}&page=${page}&format=json&nojsoncallback=1`
    );
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};
