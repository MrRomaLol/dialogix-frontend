import React from 'react';

const TextWithLineBreaks = ({text}) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const lines = text.split('\n');

    const openLink = (event) => {
        const linkText = event.target.textContent;
        window.electron.ipcRenderer.sendMessage('openLink', [linkText]);
    }

    const textElements = lines.map((line, index) => {
        const isEmptyLine = /^\s*$/.test(line);

        const extraSpace = index > 0 && isEmptyLine ? <div key={`space-${index}`}>&nbsp;</div> : null;

        const lineContent = line.split(urlRegex).map((part, partIndex) => {
            if (part.match(urlRegex)) {
                return (
                    <a style={{color: "#B915D2"}} onClick={openLink} key={partIndex} href={part} target="_blank" rel="noopener noreferrer">
                        {part}
                    </a>
                );
            } else {
                return <span key={partIndex}>{part}</span>;
            }
        });

        return (
            <React.Fragment key={index}>
                {extraSpace}
                <div style={{ cursor: "text" }}>{lineContent}</div>
            </React.Fragment>
        );
    });

    return <div>{textElements}</div>;
};

export default TextWithLineBreaks;