import React from "react";
import LoadingAnimationIcon from "../../../../components/Icon/Animation/LoadingAnimationIcon";
import UploadIcon from "../../../../components/Icon/UploadIcon";
import sleep from "../../../../utils/sleep";
import "./style.scss";
import { useSnackbar } from "notistack";
import adminAPI from "../../../../api/adminAPI";
import { imageAvatarList } from "../../../../utils/fakeData";

function AddMultiUser(props) {
  const images = imageAvatarList;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const importFileRef = React.useRef();
  const { className } = props;
  const [pending, setPending] = React.useState(false);
  const [file, setFile] = React.useState({});
  const [users, setUsers] = React.useState([]);
  const [message, setMessage] = React.useState();
  async function importFileOnChange(e) {
    setPending(true);
    setFile(e.target.files[0]);
    const reader = new FileReader();
    var result = [];
    reader.onload = function (e) {
      var csv = reader.result;
      var lines = csv.replaceAll("\r", "").split("\n");
      var headers;
      headers = lines[0].split(",");
      for (var i = 1; i < lines.length; i++) {
        var obj = {};
        if (lines[i] === undefined || lines[i].trim() === "") {
          continue;
        }
        var words = lines[i].split(",");
        for (var j = 0; j < words.length; j++) {
          obj[headers[j].trim()] = words[j];
        }
        result.push({ ...obj, status: "wait", avatar: images[0]?.url });
      }
    };
    reader.readAsText(e.target.files[0]);
    await sleep(1000);
    setPending(false);
    setUsers(result);
  }
  function handleReset() {
    importFileRef.current.value = null;
    setFile({});
    setUsers([]);
  }
  async function createUser(user) {
    return new Promise((resolve, reject) => {
      adminAPI
        .createUser(user)
        .then((res) => {
          resolve(200);
        })
        .catch((err) => {
          resolve(err.response.status);
        });
    });
  }
  async function handleCreateMultiUser() {
    setMessage(
      <p>
        Đang upload... <b>50%</b> (<b>20</b> thành công, <b>30</b> thất bại,{" "}
        <b>50</b> đang chờ){" "}
      </p>
    );
    if (users.length === 0) {
      enqueueSnackbar(`Chưa có trường dữ liệu nào!`, {
        variant: "warning",
      });
    } else {
      let uploadUsers = [...users];
      let waiting = uploadUsers.length;
      let success = 0;
      let fail = 0;
      for (let index = 0; index < uploadUsers.length; index++) {
        uploadUsers[index].status = "wait";
      }
      setUsers([...uploadUsers]);
      for (let index = 0; index < uploadUsers.length; index++) {
        uploadUsers[index].status = "uploading";
        setUsers([...uploadUsers]);
        setMessage(
          <p>
            Đang upload...{" "}
            <b>{Math.round(((success + fail) * 100) / uploadUsers.length)}%</b>{" "}
            (<b>{success}</b> thành công, <b>{fail}</b> thất bại,
            <b> {waiting}</b> đang chờ)
          </p>
        );
        await sleep(2000);
        const status = await createUser(uploadUsers[index]);
        switch (status) {
          case 200:
            uploadUsers[index].status = "Success\n";
            success++;
            break;
          case 403:
            uploadUsers[index].status =
              "Fail - [403] Trường dữ liệu không hợp lệ\n";
            fail++;
            break;
          case 406:
            uploadUsers[index].status = "Fail - [406] Email đã tồn tại\n";
            fail++;
            break;
          default:
            uploadUsers[index].status = "Fail - [500]\n";
            fail++;
            break;
        }
        setUsers([...uploadUsers]);
      }
      setMessage(
        <p>
          Hoàn tất{" "}
          <b>{Math.round(((success + fail) * 100) / uploadUsers.length)}%</b> (
          <b>{success}</b> thành công, <b>{fail}</b> thất bại,
          <b> {waiting}</b> đang chờ)
        </p>
      );
      enqueueSnackbar(`Nhập danh sách hoàn tất!`, {
        variant: "success",
      });
    }
  }
  return (
    <div className={"bee-card add-multi-user-container " + className}>
      <div className="bee-card-header bg-green-50">
        <h3 className="bee-card-title">NHẬP DANH SÁCH TÀI KHOẢN</h3>
        <div className="bee-card-actions">
          <button className="bee-btn yellow">
            <input
              ref={importFileRef}
              type={"file"}
              accept=".csv"
              onChange={importFileOnChange}
            />
            {file.name ? file.name : "Tải lên (.CSV)"}
            <UploadIcon />
          </button>
        </div>
      </div>
      <div className="bee-card-body">
        <div className="list-users-section">
          <div className="grid-table-header">
            <div></div>
            <div>name</div>
            <div>faculty</div>
            <div>dob</div>
            <div>email</div>
            <div>gender</div>
            <div>status</div>
          </div>
          <div className="grid-table-body bee-scroll">
            {users.map((item, index) => {
              return (
                <>
                  <div className={index % 2 !== 1 ? "center fill" : "center"}>
                    {index + 1}
                  </div>
                  <div className={index % 2 !== 1 ? "fill" : ""}>
                    {item.name}
                  </div>
                  <div className={index % 2 !== 1 ? "fill" : ""}>
                    {item.faculty}
                  </div>
                  <div className={index % 2 !== 1 ? "fill" : ""}>
                    {item.dob}
                  </div>
                  <div className={index % 2 !== 1 ? "fill" : ""}>
                    {item.email}
                  </div>
                  <div className={index % 2 !== 1 ? "fill" : ""}>
                    {item.gender}
                  </div>
                  <div className={index % 2 !== 1 ? "fill" : ""}>
                    {item.status}
                  </div>
                </>
              );
            })}
          </div>
        </div>
        {pending && <LoadingAnimationIcon className="absolute" />}
      </div>
      <div className="bee-card-footer border-line-top">
        <div className="left">{message}</div>
        <div className="right">
          <button className="bee-btn no-fill" onClick={handleReset}>
            DỌN DẸP
          </button>
          <button
            className="bee-btn blue"
            onClick={handleCreateMultiUser}
            disabled={users.length === 0}
          >
            TẠO MỚI
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMultiUser;
