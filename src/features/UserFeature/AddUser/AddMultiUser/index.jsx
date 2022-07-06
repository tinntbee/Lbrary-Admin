import React from "react";
import LoadingAnimationIcon from "../../../../components/Icon/Animation/LoadingAnimationIcon";
import UploadIcon from "../../../../components/Icon/UploadIcon";
import sleep from "../../../../utils/sleep";
import "./style.scss";

function AddMultiUser(props) {
  const importFileRef = React.useRef();
  const { className } = props;
  const [pending, setPending] = React.useState(false);
  const [file, setFile] = React.useState({});
  const [users, setUsers] = React.useState([]);
  const [message, setMessage] = React.useState(
    <p>
      Đang upload... <b>50%</b> (<b>20</b> thành công, <b>30</b> thất bại,{" "}
      <b>50</b> đang chờ){" "}
    </p>
  );
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
        result.push({ ...obj, status: "wait" });
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
  return (
    <div className={"bee-card add-multi-user-container " + className}>
      {" "}
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
          <button className="bee-btn blue" onClick={() => {}}>
            TẠO MỚI
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMultiUser;
