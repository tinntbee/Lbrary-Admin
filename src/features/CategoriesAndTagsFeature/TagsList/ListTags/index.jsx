import React from "react";
import PropTypes from "prop-types";
import DataTable from "react-data-table-component";
import SearchInput from "../../../../components/SearchInput";
import UnlockIcon from "../../../../components/Icon/UnlockIcon";
import LockIcon from "../../../../components/Icon/LockIcon";
import BookIcon from "../../../../components/Icon/BookIcon";
import LoadingAnimationIcon from "../../../../components/Icon/Animation/LoadingAnimationIcon";

ListTags.propTypes = {};

function ListTags(props) {
  const columns = [
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
      width: "250px",
      center: true,
    },
    {
      name: "Tên",
      selector: (row) => row.name,
      sortable: true,
      width: "300px",
    },
    {
      name: "Mô tả",
      selector: (row) => row.description,
      sortable: true,
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
            onClick={() => handleViewTagDetail(row._id)}
          >
            <BookIcon />
          </button>
          {row.is_active === 1 ? (
            <button
              className="bee-btn red"
              style={{ padding: 0 }}
              onClick={() => handleBanTag(row._id, 1, row.name)}
            >
              <LockIcon />
            </button>
          ) : (
            <button
              className="bee-btn blue"
              style={{ padding: 0 }}
              onClick={() => handleBanTag(row._id, 0, row.name)}
            >
              <UnlockIcon />
            </button>
          )}
        </div>
      ),
      width: "200px",
      center: true
    },
  ];
  const { tags, pending, handleViewTagDetail } = props;
  const [filteredTags, setFilteredTags] = React.useState(tags);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  function handleBanTag(_id, is_active, name) {}

  React.useEffect(() => {
    setFilteredTags([...tags]);
  }, [tags]);

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);
  function handleFilter(str) {
    setFilter(str.toLowerCase());
  }
  const contextActions = React.useMemo(() => {
    function handleBanMultiTags(is_banned) {
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
    <div className="bee-card list-tags-container table-data-card">
      <div className="bee-card-body">
        <DataTable
          title="DANH SÁCH THẺ SÁCH"
          fixedHeader
          fixedHeaderScrollHeight="600px"
          columns={columns}
          selectableRows
          pagination
          data={filteredTags}
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

export default ListTags;
