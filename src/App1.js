 import ServerButton from "./components/ServerButton";

function App() {
    const style = {
        container: {display: "flex", flexDirection: "column", height: "100%"},
        header: {height: '30px', width: "100%", backgroundColor: "#000"},
        main: {flex: "1", display: "flex"},
        servers: {
            height: "100%",
            width: "72px",
            paddingTop: "8px",
            boxSizing: "border-box",
            backgroundColor: "#0f2e69"
        },
        chat: {flex: 1, backgroundColor: "#0b1221"}
    }

    const servers = []
    for (let i = 1; i < 16; i++) {
        servers.push({
            img: "https://placewaifu.com/image/48",
            name: "Server" + i,
            isSelected: false,
            isNotificated: false,
        })
    }

    return (
        <div className="App" style={style.container}>
            <div style={style.header}></div>
            <div style={style.main}>
                <div style={style.servers}>
                    {servers.map(obj =>
                        <ServerButton image={obj.img} name={obj.name} isNotificated={obj.isNotificated} isSelected={obj.isSelected}/>
                    )}
                </div>
                <div style={style.chat}></div>
            </div>
        </div>
    );
}

export default App;
