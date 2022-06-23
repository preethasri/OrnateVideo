import axios from "axios";

export const removeWatchLater = (token, video) => {
  return axios.delete(`/api/user/watchlater/${video._id}`, {
    headers: { authorization: token },
  });
};