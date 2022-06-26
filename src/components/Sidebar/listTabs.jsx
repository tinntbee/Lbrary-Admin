import PeopleIcon from "../Icon/PeopleIcon";
import ChartIcon from "../Icon/ChartIcon";
import BookIcon from "../Icon/BookIcon";
import BookSymbolIcon from "../Icon/BookSymbolIcon";
import ListIcon from "../Icon/ListIcon";
import AddIcon from "../Icon/AddIcon";

const tabs = [
  {
    icon: <PeopleIcon />,
    title: "Người dùng",
    active: false,
    path: "/user",
    subTabs: [
      { icon: <ChartIcon />, title: "Thống kê", active: false, path: "/user/statistic" },
      { icon: <ListIcon />, title: "Danh sách", active: false, path: "/user/list" },
      { icon: <AddIcon />, title: "Thêm", active: false, path: "/user/add" },
    ],
  },
  {
    icon: <BookIcon />,
    title: "Sách",
    active: false,
    subTabs: [
      { icon: <ChartIcon />, title: "Thống kê", active: false, path: "/book" },
      { icon: <ListIcon />, title: "Danh sách", active: false, path: "/book" },
      { icon: <AddIcon />, title: "Thêm", active: false, path: "/book" },
    ],
    path: "/book",
  },
  {
    icon: <BookSymbolIcon />,
    title: "Danh mục",
    active: false,
    subTabs: [
      { icon: <ChartIcon />, title: "Thống kê", active: false, path: "/categories-tags" },
      { icon: <ListIcon />, title: "Danh sách", active: false, path: "/categories-tags" },
      { icon: <AddIcon />, title: "Thêm", active: false, path: "/categories-tags" },
    ],
    path: "/categories-tags",
  },
];
export default tabs;
