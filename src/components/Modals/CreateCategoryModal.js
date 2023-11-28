import React, {useState} from 'react';
import ModalComponent from "./ModalComponent";
import ContentContainer from "../ContentContainer";
import styled from "styled-components";
import CutButton from "../UIElements/CutButton";
import {useDispatch} from "react-redux";
import {ModalContent, ModalName, SectionName} from "./ModalParts";
import InputBox from "../UIElements/InputBox";

const StyledInputBox = styled(InputBox)`
  margin-bottom: 10px;
  font-size: 20px;
  width: 350px;
  padding: 2px;
`

const CreateCategoryModal = ({isOpen, onRequestClose}) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        categoryName: '',
    })

    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleCategoryCreate = () => {

    }

    return (
        <ModalComponent isOpen={isOpen} onRequestClose={onRequestClose}>
            <ContentContainer>
                <ModalContent>
                    <ModalName>Create category</ModalName>
                    <SectionName>Category name</SectionName>
                    <StyledInputBox name={'categoryName'} onChange={handleChange}/>
                    <CutButton onClick={handleCategoryCreate}>{'Create'}</CutButton>
                </ModalContent>
            </ContentContainer>
        </ModalComponent>
    );
};

export default CreateCategoryModal;