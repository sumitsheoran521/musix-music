import useFetch from "../hooks/useFetch";

export const fetchSong = (props = "hindi", page = 1) => {
    const url = `https://jiosaavn-api-privatecvc2.vercel.app/search/songs?query=${encodeURIComponent([props])}&limit=36&page=${page}`;
    return useFetch(url);
};

