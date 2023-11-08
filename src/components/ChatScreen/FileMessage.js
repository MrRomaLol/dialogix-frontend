import React, {useMemo} from 'react';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faDownload,
    faFile, faFileExcel,
    faFileLines,
    faFilePdf, faFilePowerpoint,
    faFileWord, faFileZipper, faFilm,
    faImage,
    faMusic
} from "@fortawesome/free-solid-svg-icons";
import getFileTypeByExtension from "../../utils/fileTypes";
import fileSizeConverter from "../../utils/fileSizeConverter";

export const FileMessageBack = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  border: solid 2px #BC2CC9;
  height: 80px;
  max-width: 500px;
  box-sizing: border-box;
  padding: 20px;
  user-select: none;
`

export const FileIcon = styled(FontAwesomeIcon)`
  height: 100%;
  width: 36px;
  color: #BC2CC9;
`

const DownloadIcon = styled(FileIcon)`
  transition-duration: 200ms;
  cursor: pointer;
  margin-left: 20px;

  &:hover {
    color: #f380ff;
  }
`

export const FileDesc = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
`


export const FileName = styled.p`
  color: #ff00ea;
  font-weight: bold;
  cursor: pointer;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  min-width: 10px;
  max-width: 300px;
  width: calc(70vw - 575px);

  &:hover {
    text-decoration: underline;
  }
`


export const FileSize = styled.p`
  color: gray;
  font-size: 12px;
`


const FileMessage = ({sender, folder, file}) => {
    const fileTypeIcon = useMemo(() => {
        const type = getFileTypeByExtension(file.name);
        return {
            "image": faImage,
            "pdf": faFilePdf,
            "word": faFileWord,
            "text": faFileLines,
            "audio": faMusic,
            "video": faFilm,
            "archive": faFileZipper,
            "excel": faFileExcel,
            "presentation": faFilePowerpoint,
            "unknown": faFile
        }[type];
    }, [file]);

    const handleDownloadFile = () => {
        window.location.href = `/api/v1/cdn/${sender}/${folder}/${file.name}`
    }

    return (
        <FileMessageBack>
            <FileIcon icon={fileTypeIcon}/>
            <FileDesc>
                <FileName onClick={handleDownloadFile}>{file.name}</FileName>
                <FileSize>{fileSizeConverter(file.size)}</FileSize>
            </FileDesc>
            <DownloadIcon icon={faDownload} onClick={handleDownloadFile}/>
        </FileMessageBack>
    );
};

export default FileMessage;