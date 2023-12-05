import React, {useState} from 'react';
import ModalComponent from "./ModalComponent";
import ContentContainer from "../ContentContainer";
import styled from "styled-components";
import CutButton from "../UIElements/CutButton";
import {useDispatch, useSelector} from "react-redux";
import {ModalContent, ModalName, SectionName} from "./ModalParts";
import InputBox from "../UIElements/InputBox";
import {Store} from "react-notifications-component";
import {createCategory} from "../../store/guildsSlice";
import DXSpinner from "../DXSpinner";
import {useTranslation} from "react-i18next";
import {cT} from "../../localization/funcs";

const StyledInputBox = styled(InputBox)`
  margin-bottom: 10px;
  font-size: 20px;
  width: 350px;
  padding: 2px;
`

const CreateCategoryModal = ({isOpen, onRequestClose}) => {
    const dispatch = useDispatch();
    const [ t, i18n ] = useTranslation();
    const {loading} = useSelector(state => state.guilds);
    const [formData, setFormData] = useState({
        categoryName: '',
    })

    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const notification = {
        title: t("misc.error"),
        type: "danger",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeInDown"],
        dismiss: {
            duration: 5000,
            pauseOnHover: true,
        }
    }

    const handleCategoryCreate = () => {
        if (loading) return;
        if (formData.categoryName.length < 3) {
            return Store.addNotification({
                ...notification,
                message: t("categModal.shortCategName")
            })
        }

        if (formData.categoryName.length > 16) {
            return Store.addNotification({
                ...notification,
                message: "Category name is too long"
            })
        }

        dispatch(createCategory({categoryName: formData.categoryName})).unwrap()
            .then(() => {
                onRequestClose();
            })
            .catch((error) => {
                Store.addNotification({
                    ...notification,
                    message: cT(t("misc.msgErr"), error)
                })
            })
    }

    return (
        <ModalComponent isOpen={isOpen} onRequestClose={onRequestClose}>
            <ContentContainer>
                <ModalContent>
                    <ModalName>{t("categModal.createCateg")}</ModalName>
                    <SectionName>{t("categModal.categName")}</SectionName>
                    <StyledInputBox autoFocus name={'categoryName'} onChange={handleChange}/>
                    <CutButton style={{marginTop: "15px"}} onClick={handleCategoryCreate}>{loading ? <DXSpinner/> : t("misc.create")}</CutButton>
                </ModalContent>
            </ContentContainer>
        </ModalComponent>
    );
};

export default CreateCategoryModal;