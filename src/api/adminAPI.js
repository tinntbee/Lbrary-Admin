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
  postBook: (formData) => {
    const url = "/admin/postBook";
    return axiosClient.post(url, formData);
  },
  checkExistBookName: ({ name }) => {
    const url = "/admin/checkExistBookName";
    return axiosClient.post(url, { name });
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
  modifyUser: (user) => {
    const url = "/admin/modifyUser";
    return axiosClient.put(url, user);
  },
  //NOTE: Tag manage
  getAllTagsManage: () => {
    const url = "/admin/getAllTagsManage";
    return axiosClient.get(url);
  },
  getTagDetail: (_id) => {
    const url = "/admin/getTagDetail/" + _id;
    return axiosClient.get(url);
  },
  createTag: (tag) => {
    const url = "/admin/createTag";
    return axiosClient.post(url, tag);
  },
  editTag: (tag) => {
    const url = "/admin/editTag/" + tag._id;
    return axiosClient.put(url, tag);
  },
  banTag: ({ _id, is_active }) => {
    const url = "/admin/banTag/" + _id;
    return axiosClient.put(url, { is_active });
  },

  //NOTE: Category manage
  getAllCategories: () => {
    const url = "/admin/getAllCategories";
    return axiosClient.get(url);
  },
  getCategoryDetail: (_id) => {
    const url = "/admin/getCategoryDetail/" + _id;
    return axiosClient.get(url);
  },
  createCategory: (category) => {
    const url = "/admin/createCategory";
    return axiosClient.post(url, category);
  },
  editCategory: (category) => {
    const url = "/admin/editCategory/" + category._id;
    return axiosClient.put(url, category);
  },
  banCategory: ({ _id, is_active }) => {
    const url = "/admin/banCategory/" + _id;
    return axiosClient.put(url, { is_active });
  },

  //NOTE: report
  bookStatistical: () => {
    const url = "/admin/bookStatistical";
    return axiosClient.get(url);
  },
  topBooks: () => {
    const url = "/admin/topBooks";
    return axiosClient.get(url);
  },
  booksByTags: () => {
    const url = "/admin/booksByTags";
    return axiosClient.get(url);
  },
  hoaByMonth: () => {
    const url = "/admin/hoaByMonth";
    return axiosClient.get(url);
  },
  userStatistical: () => {
    const url = "/admin/userStatistical";
    return axiosClient.get(url);
  },
  userByFaculty: () => {
    const url = "/admin/userByFaculty";
    return axiosClient.get(url);
  },
  userByMonth: () => {
    const url = "/admin/userByMonth";
    return axiosClient.get(url);
  },
};

export default adminAPI;
