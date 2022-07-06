import React from "react";
import PropTypes from "prop-types";
import DataTable from "react-data-table-component";
import "./style.scss";
import SearchInput from "../../../../components/SearchInput";
import LockIcon from "../../../../components/Icon/LockIcon";
import PersonInfoIcon from "../../../../components/Icon/PersonInfoIcon";
import UnlockIcon from "../../../../components/Icon/UnlockIcon";
import LoadingAnimationIcon from "../../../../components/Icon/Animation/LoadingAnimationIcon";
import FlowerIcon from "../../../../components/Icon/FlowerIcon";
import ThumbUpIcon from "../../../../components/Icon/ThumbUpIcon";
import ThumbDownIcon from "../../../../components/Icon/ThumbDownIcon";
import CartIcon from "../../../../components/Icon/CartIcon";
import CommentIcon from "../../../../components/Icon/CommentIcon";
import BookIcon from "../../../../components/Icon/BookIcon";

ListBooks.propTypes = {};

function ListBooks(props) {
  const columns = [
    {
      name: "",
      selector: (row) => (
        <div
          className="thumbnail"
          style={{ backgroundImage: `url("${row.image}")` }}
        />
      ),
      sortable: true,
      width: "70px",
      center: true,
    },
    {
      name: "Tên",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Thẻ",
      selector: (row) => {
        return (
          row.tags &&
          row.tags.map((tag, index) => {
            return (
              <div>
                <span class="badge m bg-green">{"#" + tag.name}</span>
              </div>
            );
          })
        );
      },
      sortable: true,
      width: "200px",
      sortFunction: (a, b) => a.tags.length - b.tags.length,
    },
    {
      name: "Giá",
      selector: (row) => (
        <span className="badge txt-yellow">
          {row.price}
          <FlowerIcon />
        </span>
      ),
      sortable: true,
      width: "100px",
      center: true,
      sortField: "price",
      sortFunction: (a, b) => a.price - b.price,
    },
    {
      name: "Thích",
      selector: (row) => (
        <span className="badge bg-blue">
          <ThumbUpIcon />
          {row.totalLike}
        </span>
      ),
      sortable: true,
      width: "100px",
      center: true,
      sortFunction: (a, b) => a.totalLike - b.totalLike,
    },
    {
      name: "Ghét",
      selector: (row) => (
        <span className="badge bg-red">
          <ThumbDownIcon />
          {row.totalDislike}
        </span>
      ),
      sortable: true,
      width: "100px",
      center: true,
      sortFunction: (a, b) => a.totalDislike - b.totalDislike,
    },
    {
      name: "Lượt mua",
      selector: (row) => (
        <span className="badge">
          <CartIcon />
          {row.totalRead}
        </span>
      ),
      sortable: true,
      width: "120px",
      center: true,
      sortFunction: (a, b) => a.totalRead - b.totalRead,
    },
    {
      name: "Bình luận",
      selector: (row) => (
        <span className="badge">
          <CommentIcon />
          {row.totalComments}
        </span>
      ),
      sortable: true,
      width: "120px",
      center: true,
      sortFunction: (a, b) => a.totalComments - b.totalComments,
    },
    {
      name: "Khóa",
      selector: (row) => (!row.is_active ? <LockIcon /> : ""),
      sortable: true,
      width: "100px",
      center: true,
    },
    {
      name: "Hành động",
      selector: (row) => (
        <div className="row">
          <button
            className="bee-btn yellow"
            style={{ padding: 0 }}
            onClick={() => handleViewBookDetail(row._id)}
          >
            <BookIcon />
          </button>
          {row.is_active === 1 ? (
            <button
              className="bee-btn red"
              style={{ padding: 0 }}
              onClick={() => handleBanBook(row._id, 1, row.name)}
            >
              <LockIcon />
            </button>
          ) : (
            <button
              className="bee-btn blue"
              style={{ padding: 0 }}
              onClick={() => handleBanBook(row._id, 0, row.name)}
            >
              <UnlockIcon />
            </button>
          )}
        </div>
      ),
      width: "120px",
    },
  ];
  const { books, pending, handleViewBookDetail} = props;
  const [filteredUsers, setFilteredUsers] = React.useState(books);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  function handleBanBook(_id, is_active, name) {}

  React.useEffect(() => {
    setFilteredUsers([...books]);
  }, [books]);

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);
  function handleFilter(str) {
    setFilter(str.toLowerCase());
  }
  const contextActions = React.useMemo(() => {
    function handleBanMultiBook(is_banned) {
      selectedRows.forEach((row) => {
        // handleBanUser(row._id, is_banned, row.name);
      });
    }

    return (
      <>
        <button className="bee-btn blue" onClick={() => {}}>
          Mở khóa
        </button>
        <button onClick={() => {}} className="bee-btn red">
          Khóa
        </button>
      </>
    );
  }, [selectedRows, toggleCleared]);
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {};

    return <SearchInput handleFilter={handleFilter} />;
  }, [resetPaginationToggle]);
  const ExpandedComponent = ({ data }) => {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  };
  return (
    <div className="bee-card list-books-container table-data-card">
      <div className="bee-card-body">
        <DataTable
          title="DANH SÁCH NGƯỜI DÙNG"
          fixedHeader
          fixedHeaderScrollHeight="600px"
          columns={columns}
          selectableRows
          pagination
          data={filteredUsers}
          defaultSortFieldId={2}
          contextActions={contextActions}
          paginationResetDefaultPage={resetPaginationToggle}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
          subHeaderComponent={subHeaderComponentMemo}
          progressPending={pending}
          progressComponent={<LoadingAnimationIcon />}
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          subHeader
        />
      </div>
    </div>
  );
}

export default ListBooks;
