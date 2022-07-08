import PeopleIcon from "../Icon/PeopleIcon";
import ChartIcon from "../Icon/ChartIcon";
import BookIcon from "../Icon/BookIcon";
import BookSymbolIcon from "../Icon/BookSymbolIcon";
import ListIcon from "../Icon/ListIcon";
import AddIcon from "../Icon/AddIcon";
import TagIcon from "../Icon/TagIcon";
import CategoryIcon from "../Icon/CategoryIcon";

const tabs = [
  {
    icon: <PeopleIcon />,
    title: "Người dùng",
    active: false,
    path: "/user",
    subTabs: [
      {
        icon: <ChartIcon />,
        title: "Thống kê",
        active: false,
        path: "/user/statistic",
      },
      {
        icon: <ListIcon />,
        title: "Danh sách",
        active: false,
        path: "/user/list",
      },
      { icon: <AddIcon />, title: "Thêm", active: false, path: "/user/add" },
    ],
  },
  {
    icon: <BookIcon />,
    title: "Sách",
    active: false,
    subTabs: [
      {
        icon: <ChartIcon />,
        title: "Thống kê",
        active: false,
        path: "/book/statistic",
      },
      {
        icon: <ListIcon />,
        title: "Danh sách",
        active: false,
        path: "/book/list",
      },
      { icon: <AddIcon />, title: "Thêm", active: false, path: "/book/add" },
    ],
    path: "/book",
  },
  {
    icon: <BookSymbolIcon />,
    title: "Danh mục",
    active: false,
    subTabs: [
      {
        icon: <TagIcon />,
        title: "Thẻ Sách",
        active: false,
        path: "/categories-tags/tags-list",
      },
      {
        icon: <CategoryIcon />,
        title: "Danh mục Sách",
        active: false,
        path: "/categories-tags/categories-list",
      },
    ],
    path: "/categories-tags",
  },
];
export default tabs;
