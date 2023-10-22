import React from 'react';

const TextWithLineBreaks = ({text}) => {
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
};

export default TextWithLineBreaks;