import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchData = async (page, perpage, searchq) => {
  try {
    const method = searchq ? "flickr.photos.search" : "flickr.photos.getRecent";
    const response = await axios.get(
      ` https://www.flickr.com/services/rest/?method=${method}&api_key=${API_KEY}&safe_search=1&per_page=${perpage}&page=${page}&format=json&nojsoncallback=1`,
      {
        params: {
          text: searchq,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};
