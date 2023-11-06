import React from 'react';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faFile} from "@fortawesome/free-solid-svg-icons";

const FileMessageBack = styled.div`
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

const FileIcon = styled(FontAwesomeIcon)`
  height: 100%;
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

const FileDesc = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;

`

const FileName = styled.p`
  color: #ff00ea;
  font-weight: bold;
  cursor: pointer;
  
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 300px;
  
  &:hover {
    text-decoration: underline;
  }
`

const FileSize = styled.p`
  color: gray;
  font-size: 12px;
`

const FileMessage = () => {
    return (
        <FileMessageBack>
            <FileIcon icon={faFile}/>
            <FileDesc>
                <FileName>FileNameskjgbrdkjgnrdkjgnrdkjgndjkgrfnjkgndrkj</FileName>
                <FileSize>12.1k</FileSize>
            </FileDesc>
            <DownloadIcon icon={faDownload}/>
        </FileMessageBack>
    );
};

export default FileMessage;