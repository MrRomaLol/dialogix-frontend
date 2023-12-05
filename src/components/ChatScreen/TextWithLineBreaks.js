import React from 'react';
import {useNavigate} from "react-router-dom";

const TextWithLineBreaks = ({text}) => {
    const navigate = useNavigate();
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const lines = text.split('\n');

    const isSameDomain = (initialLink, otherLink) => {
        const initialUrl = new URL(initialLink);
        const otherUrl = new URL(otherLink);

        return initialUrl.hostname === otherUrl.hostname;
    }

    const openLink = (event) => {
        const linkText = event.target.textContent;

        const isSame = isSameDomain(window.location.href, linkText);

        if (!isSame) {
            if (window.IS_USING_DIALOGIX_APP) {
                event.preventDefault();
                window.electron.ipcRenderer.sendMessage('openLink', [linkText]);
            } else {
                window.open(linkText, '_blank').focus();
            }
        } else {
            const initialUrl = new URL(linkText);
            navigate({
                pathname: initialUrl.pathname,
                search: initialUrl.search,
            })
        }
    }

    const textElements = lines.map((line, index) => {
        const isEmptyLine = /^\s*$/.test(line);

        const extraSpace = index > 0 && isEmptyLine ? <div key={`space-${index}`}>&nbsp;</div> : null;

        const lineContent = line.split(urlRegex).map((part, partIndex) => {
            if (part.match(urlRegex)) {
                return (
                    <a style={{color: "#B915D2"}} onClick={openLink} key={partIndex} href={part} target="_blank"
                       rel="noopener noreferrer">
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
                <div style={{cursor: "text"}}>{lineContent}</div>
            </React.Fragment>
        );
    });

    return <div>{textElements}</div>;
};

export default TextWithLineBreaks;