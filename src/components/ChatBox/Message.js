import React from 'react';

function TextWithLineBreaks({text}) {
    const lines = text.split('\n');

    const textElements = lines.map((line, index) => {
        const isEmptyLine = /^\s*$/.test(line);

        const extraSpace = index > 0 && isEmptyLine ? <div key={`space-${index}`}>&nbsp;</div> : null;

        return (
            <React.Fragment key={index}>
                {extraSpace}
                <div>{line}</div>
            </React.Fragment>
        );
    });

    return <div>{textElements}</div>;
}

const Message = ({content, username = "username", date = "no_date"}) => {
    const style = {
        box: {
            display: "flex",
        },
        username: {
            color: "white",
            fontSize: "18px",
            marginLeft: "10px",
            fontWeight: 500,
        },
        date: {
            color: "lightgray",
            fontSize: "14px",
            marginLeft: "10px",
            alignSelf: "center",
        }
    }

    return (
        <div className={"mt-3 mx-3"} style={{...style.box}}>
            <div style={{width: "48px", height: "100%", position: "relative"}}>
                <div className={"rounded-circle"}
                     style={{width: "48px", height: "48px", backgroundColor: "rgba(0,0,0,0.4)"}}>
                    <div style={{
                        color: "white",
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>{username.substring(0, 1)}</div>
                </div>
            </div>

            <div className={"d-flex flex-column"}>
                <div className={"d-flex"} style={{whiteSpace: "nowrap",}}>
                    <p className={"p-0 my-0"} style={{...style.username}}>{username}</p>
                    <p className={"p-0 my-0"} style={{...style.date}}>{date}</p>
                </div>


                <div style={{marginLeft: "10px", color: "white"}}>
                    <TextWithLineBreaks text={content}/>
                </div>
            </div>
        </div>
    );
};

export default Message;