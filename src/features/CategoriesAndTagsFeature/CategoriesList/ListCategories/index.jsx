import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import DataTable from "react-data-table-component";
import SearchInput from "../../../../components/SearchInput";
import BookIcon from "../../../../components/Icon/BookIcon";
import LockIcon from "../../../../components/Icon/LockIcon";
import UnlockIcon from "../../../../components/Icon/UnlockIcon";
import LoadingAnimationIcon from "../../../../components/Icon/Animation/LoadingAnimationIcon";
import CategoryIcon from "../../../../components/Icon/CategoryIcon";
import AddIcon from "../../../../components/Icon/AddIcon";

ListCategories.propTypes = {};

function ListCategories(props) {
  const columns = [
    {
      name: "",
      selector: (row) => (
        <div
          className="thumbnail-square"
          style={{ backgroundImage: `url("${row.thumbnail}")` }}
        />
      ),
      width: "150px",
      center: true,
    },
    {
      name: "Tên",
      selector: (row) => row.name,
      sortable: true,
      width: "250px",
    },
    {
      name: "Lời Bình",
      selector: (row) => row.quote,
      sortable: true,
    },
    {
      name: "Màu chủ đề",
      selector: (row) => (
        <div>
          <span class="badge m" style={{ background: row.color }}>
            {row.color}
          </span>
        </div>
      ),
      width: "150px",
      center: true,
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
            onClick={() => handleViewCategory(row._id)}
          >
            <CategoryIcon />
          </button>
          {row.is_active === 1 ? (
            <button
              className="bee-btn red"
              style={{ padding: 0 }}
              onClick={() => handleBanCategory(row._id, 0, row.name)}
            >
              <LockIcon />
            </button>
          ) : (
            <button
              className="bee-btn blue"
              style={{ padding: 0 }}
              onClick={() => handleBanCategory(row._id, 1, row.name)}
            >
              <UnlockIcon />
            </button>
          )}
        </div>
      ),
      width: "120px",
    },
  ];
  const {
    categories,
    pending,
    handleViewCategory,
    handleShowNewCategory,
    handleBanCategory,
  } = props;
  const [filteredCategories, setFilteredCategories] =
    React.useState(categories);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  React.useEffect(() => {
    setFilteredCategories([...categories]);
  }, [categories]);
  React.useEffect(() => {
    var newFilteredCategories = categories.filter((category) => {
      return (
        category.name.toLowerCase().includes(filter) ||
        category.quote.toLowerCase().includes(filter) ||
        category.tags.filter((c) => c.name.toLowerCase().includes(filter))
          .length > 0 ||
        category.color.toLowerCase().includes(filter)
      );
    });
    setFilteredCategories([...newFilteredCategories]);
  }, [categories, filter]);

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);
  function handleFilter(str) {
    setFilter(str.toLowerCase());
  }
  const contextActions = React.useMemo(() => {
    function handleBanMultiCategories(is_active) {
      selectedRows.forEach((row) => {
        handleBanCategory(row._id, is_active, row.name);
      });
    }

    return (
      <>
        <button
          className="bee-btn blue"
          onClick={() => {
            handleBanMultiCategories(1);
          }}
        >
          Mở khóa
        </button>
        <button
          onClick={() => {
            handleBanMultiCategories(0);
          }}
          className="bee-btn red"
        >
          Khóa
        </button>
      </>
    );
  }, [selectedRows, toggleCleared]);
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {};

    return (
      <div className="row">
        <button className="bee-btn yellow" onClick={handleShowNewCategory}>
          <AddIcon /> Thêm danh mục mới
        </button>
        <SearchInput handleFilter={handleFilter} />
      </div>
    );
  }, [resetPaginationToggle]);
  const ExpandedComponent = ({ data }) => {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  };
  return (
    <div className="bee-card list-categories-container table-data-card">
      <div className="bee-card-body">
        <DataTable
          title="DANH SÁCH DANH MỤC"
          fixedHeader
          fixedHeaderScrollHeight="600px"
          columns={columns}
          selectableRows
          pagination
          data={filteredCategories}
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

export default ListCategories;
