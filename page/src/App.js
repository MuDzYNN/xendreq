import { useState, useEffect } from "react";
import User from "./components/User";
import background from "./assets/background.png";
import watermark from "./assets/allmake.svg";
import "./App.sass";

function App() {
  const [fetchedData, setFetchedData] = useState(false);
  const [users, setUsers] = useState([]);

  const Sort = (mode, data) => {
    document.querySelectorAll(".sorting").forEach(element => element.classList.remove("active"));
    document.getElementById(mode).classList.add("active");
    data.sort((a, b) => a.nickname.localeCompare(b.nickname));
    data.sort((a, b) => {
      if (mode === "level") {
        return b.level - a.level
      } else if (mode === "messages") {
        return b.wia - a.wia;
      } else if (mode === "money") {
        return b.kasa - a.kasa;
      }
    });
    setUsers(data);
  }

  useEffect(() => {
    fetch("http://83.31.54.100/getData").then(res => res.json()).then(res => {
      Sort("level", res);
      setFetchedData(true)
    });
  }, []);

  return (
    <div className="App">
      <div className="background" style={{ backgroundImage: `url(${background})` }}></div>
      <div className="buttons">
        <div className="btn sort-by">Sortuj według</div>
        <div className="row">
          <div className="btn sorting clickable" id="level" onClick={() => Sort("level", [...users])}>Poziom</div>
          <div className="btn sorting clickable" id="messages" onClick={() => Sort("messages", [...users])}>Ilość wiadomości</div>
          <div className="btn sorting clickable" id="money" onClick={() => Sort("money", [...users])}>Ilość kasy</div>
        </div>
      </div>
      <div className="users">
        {users.length > 0 ? (
          users.map((user, key) => <User key={key} avatar={user.avatar} nickname={user.nickname} level={user.level} exp={user.xp} money={user.kasa} messages={user.wia} />)
        ) : null}
      </div>
      <a className="watermark" href="https://discord.com/invite/Ymd78XQW8U" target="_blank" rel="noreferrer">
        <img src={watermark} alt="makeall.pl" />
      </a>
      <div className={`loading ${fetchedData ? "fadeOut" : ""}`}><span></span> Ładowanie...</div>
    </div>
  );
}

export default App;
