import React, {useEffect, useMemo, useState} from 'react';
import ModalComponent from "./ModalComponent";
import ContentContainer from "../ContentContainer";
import {ModalContent, ModalName} from "./ModalParts";

const YesNoModal = ({isOpen, onRequestClose}) => {
    const [fileContent, setFileContent] = useState('');

    useEffect(() => {
        const fetchFile = async () => {
            try {
                const response = await fetch('ToSText.txt');
                const content = await response.text();
                setFileContent(content);
            } catch (error) {
                console.error('Error reading the file:', error);
            }
        };

        fetchFile();
    }, []);

    return (
        <ModalComponent isOpen={isOpen} onRequestClose={onRequestClose}>
            <ContentContainer backgroundColor={'white'}>
                <ModalContent>
                    <ModalName style={{color: 'black', marginBottom: "20px"}}>Terms of Services</ModalName>
                    <div style={{whiteSpace: 'pre-line'}}>
                        {fileContent}
                    </div>
                </ModalContent>
            </ContentContainer>
        </ModalComponent>
    );
};

export default YesNoModal;