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

const PMessage = ({username = "username", content = "message", date}) => {
    const styles = {
        back: {
            display: "flex"
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
        },
        massageBack: {
            backgroundColor: "#452654",
            borderRadius: "20px",
            padding: "6px 16px 6px 16px",
            marginLeft: "20px",
            justifyContent: "center"
        },
        content: {
            color: "white",
        }
    }

    return (
        <div style={styles.back}>
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
            <div className={"d-flex flex-column"} style={styles.massageBack}>
                {/*<p className={"p-0 my-0"} style={styles.date}>{date}</p>*/}

                <div style={styles.content}>
                    <TextWithLineBreaks text={content}/>
                </div>
            </div>
        </div>
    );
};

export default PMessage;