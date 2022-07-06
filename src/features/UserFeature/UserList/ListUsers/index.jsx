import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import DataTable from "react-data-table-component";
import SearchInput from "../../../../components/SearchInput";
import LoadingAnimationIcon from "../../../../components/Icon/Animation/LoadingAnimationIcon";
import adminAPI from "../../../../api/adminAPI";
import LockIcon from "../../../../components/Icon/LockIcon";
import PersonInfoIcon from "../../../../components/Icon/PersonInfoIcon";
import UnlockIcon from "../../../../components/Icon/UnlockIcon";
import { useSnackbar } from "notistack";

ListUsers.propTypes = {};

function ListUsers(props) {
  const { handleViewUserDetail, users, handleBanUser, pending } = props;
  const [filteredUsers, setFilteredUsers] = React.useState(users);
  const [filter, setFilter] = React.useState("");
  const columns = [
    {
      name: "",
      selector: (row) => (
        <div
          className="avatar"
          style={{ backgroundImage: `url("${row.avatar}")` }}
        />
      ),
      sortable: true,
      width: "70px",
      center: true,
    },
    {
      name: "Họ và tên",
      selector: (row) => {
        var name = row.name.split(" ");
        var lastName = name.pop();
        name.unshift(lastName);
        return name.join(" ");
      },
      sortable: true,
      width: "200px",
    },
    {
      name: "Tên hiển thị",
      selector: (row) => row.nickname,
      sortable: true,
      width: "200px",
    },
    {
      name: "Bị Khóa",
      selector: (row) => (row.is_banned !== 0 ? <LockIcon /> : ""),
      sortable: true,
      width: "100px",
    },
    {
      name: "Địa chỉ Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Khoa",
      selector: (row) => row.faculty,
      sortable: true,
      width: "100px",
      center: true,
    },
    {
      name: "Ngày Sinh",
      selector: (row) => row.dob.substring(0, 10),
      sortable: true,
      width: "150px",
    },
    {
      name: "Hành động",
      selector: (row) => (
        <div className="row">
          <button
            className="bee-btn yellow"
            style={{ padding: 0 }}
            onClick={() => handleViewUserDetail(row._id)}
          >
            <PersonInfoIcon />
          </button>
          {row.is_banned === 0 ? (
            <button
              className="bee-btn red"
              style={{ padding: 0 }}
              onClick={() => handleBanUser(row._id, 1, row.name)}
            >
              <LockIcon />
            </button>
          ) : (
            <button
              className="bee-btn blue"
              style={{ padding: 0 }}
              onClick={() => handleBanUser(row._id, 0, row.name)}
            >
              <UnlockIcon />
            </button>
          )}
        </div>
      ),
      width: "150px",
    },
  ];
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  function handleFilter(str) {
    setFilter(str.toLowerCase());
  }

  React.useEffect(() => {
    setFilteredUsers([...users]);
  }, [users]);

  React.useEffect(() => {
    var newFilteredUsers = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(filter) ||
        user.nickname.toLowerCase().includes(filter) ||
        user.email.toLowerCase().includes(filter) ||
        user.faculty.toLowerCase() === filter
      );
    });
    setFilteredUsers([...newFilteredUsers]);
  }, [users, filter]);

  const ExpandedComponent = ({ data }) => {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  };

  const contextActions = React.useMemo(() => {
    function handleBanMultiUser(is_banned) {
      selectedRows.forEach((row) => {
        handleBanUser(row._id, is_banned, row.name);
      });
    }

    return (
      <>
        <button className="bee-btn blue" onClick={() => handleBanMultiUser(0)}>
          Mở khóa
        </button>
        <button onClick={() => handleBanMultiUser(1)} className="bee-btn red">
          Khóa
        </button>
      </>
    );
  }, [selectedRows, toggleCleared]);
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {};

    return <SearchInput handleFilter={handleFilter} />;
  }, [resetPaginationToggle]);
  return (
    <div className="bee-card list-users-container table-data-card">
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

export default ListUsers;
