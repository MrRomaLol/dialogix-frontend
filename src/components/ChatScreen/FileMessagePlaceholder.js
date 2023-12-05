import React, {useMemo} from 'react';
import fileSizeConverter from "../../utils/fileSizeConverter";
import {faFile} from "@fortawesome/free-solid-svg-icons";
import {FileDesc, FileIcon, FileMessageBack, FileName, FileSize} from "./FileMessage";
import styled from "styled-components";
import {useTranslation} from "react-i18next";

const FileMessagePlaceholderBack = styled(FileMessageBack)`
  background: linear-gradient(to right, rgba(188, 44, 201, 0.2) 0%, rgba(188, 44, 201, 0.2) ${({progress}) => progress || 0}%, rgba(0, 0, 0, 0.2) ${({progress}) => progress || 0}%, rgba(0, 0, 0, 0.2) 100%);
`

const FileMessagePlaceholder = ({files, progress}) => {
    const [ t, i18n ] = useTranslation();
    const fileSize = useMemo(() => {
        return files.reduce((accumulator, object) => {
            return accumulator + object.size;
        }, 0);
    }, [files])

    return (
        <FileMessagePlaceholderBack progress={progress}>
            <FileIcon icon={faFile}/>
            <FileDesc>
                <FileName>{t("fileMsgPH.uploadFiles")} {files.length}</FileName>
                <FileSize>{fileSizeConverter(fileSize)}</FileSize>
            </FileDesc>
        </FileMessagePlaceholderBack>
    );
};

export default FileMessagePlaceholder;