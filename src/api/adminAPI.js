import axiosClient from "./axiosClient";

const adminAPI = {
  login: ({ username, password }) => {
    const url = `/admin/login`;
    return axiosClient({
      method: "POST",
      url: url,
      data: { username: username, password: password },
    });
  },
  reSign: () => {
    const url = "/admin/resign";
    return axiosClient({
      method: "GET",
      url: url,
    });
  },
  logout: () => {
    const url = "/admin/logout";
    return axiosClient.get(url);
  },

  //NOTE: Book manage
  getAllBook: () => {
    const url = "/admin/getAllBooks";
    return axiosClient.get(url);
  },
  getBookDetail: (_id) => {
    const url = "/admin/getBookDetail/" + _id;
    return axiosClient.get(url);
  },
  putBook: (book) => {
    const { _id } = book;
    const url = "/admin/putBook/" + _id;
    return axiosClient.put(url, book);
  },
  banBook: ({ _id, is_active }) => {
    const url = "/admin/banBook/" + _id;
    return axiosClient.put(url, { is_active });
  },
  deleteBook: (_id) => {
    const url = "/admin/deleteBook/" + _id;
    return axiosClient.delete(url);
  },

  //NOTE: Tags manage
  getAllTags: () => {
    const url = "/admin/getAllTags";
    return axiosClient.get(url);
  },

  //NOTE: User manage
  getAllUser: () => {
    const url = "/admin/getAllUser";
    return axiosClient.get(url);
  },
  getUserDetail: (_id) => {
    const url = "/admin/getUserDetail/" + _id;
    return axiosClient.get(url);
  },
  banUser: ({ _id, is_banned }) => {
    const url = "/admin/banUser/" + _id;
    return axiosClient.put(url, { is_banned });
  },
};

export default adminAPI;
