import "./User.sass";

const User = ({ avatar, nickname, level, exp, money, messages }) => {
    return (
        <div className="user">
            <div className="user-avatar">
                <img src={avatar} alt="avatar" />
                <p>{nickname}</p>
            </div>
            <div className="user-data">
                <p>Poziom: {level ? level : 0}</p>
                <p>Exp: {exp ? exp : 0}</p>
                <p>Ilość kasy: {money ? money : 0}</p>
                <p>Wiadomości: {messages ? messages : 0}</p>
            </div>
        </div>
    );
}

export default User;