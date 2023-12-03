import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {FriendsInputField} from "./StyledParts";
import {useDispatch, useSelector} from "react-redux";
import {sendFriendRequest} from "../../store/friendsSlice";
import {Store} from "react-notifications-component";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px
`

const SearchField = styled.div`
  width: 100%;
  height: 70px;
  padding: 16px;
  border: 2px solid rgba(188, 44, 201, 0.62);
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
`

const Button = styled.button`
  min-width: 200px;

  color: white;
  font-family: JetBrains Mono, serif;;

  background-color: rgb(188, 44, 201);

  &:hover {
    background-color: rgb(162, 35, 173);
  }

  &:active {
    background-color: rgb(118, 10, 126);
  }

  transition-duration: 200ms;

  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 20px) 100%, 0 100%);
  border: none;
`

const Message = styled.p`
  align-self: center;
  font-family: "JetBrains Mono", serif;
  margin-top: 20px;
  font-size: 26px;
  color: ${({success}) => success ? '#6F2DA8' : '#B13470'};
  text-align: center;
`

const FriendAddTab = () => {
    const [friendName, setFriendName] = useState('');
    const [isTryAdded, setIsTryAdded] = useState(false);
    const [notificationId, setNotificationId] = useState('');
    const dispatch = useDispatch();
    const {error, status} = useSelector((state) => state.friends);

    const handleAddChange = e => {
        setFriendName(e.target.value);
    }

    const addFriend = () => {
        setIsTryAdded(false);
        if (!friendName) return;
        const data = {
            nickname: friendName,
        }
        dispatch(sendFriendRequest(data));
        setIsTryAdded(true);
    }

    const notification = {
        title: "Error!",
        type: "danger",
        insert: "top",
        container: "bottom-full",
        animationIn: ["animate__animated", "animate__fadeInUp"],
        dismiss: {
            duration: 5000,
            pauseOnHover: true,
            onScreen: true
        }
    }

    useEffect(() => {
        const notificate = () => {
            if (!isTryAdded) return;
            Store.removeNotification(notificationId);
            if (error) {
                return Store.addNotification({
                    ...notification,
                    message: `Something went wrong: ${error}`,
                })
            }
            if (status === 'requested') {
                return Store.addNotification({
                    ...notification,
                    title: "Success!",
                    type: "success",
                    message: `Great news! Your friend request to ${friendName} was successfully sent.`,
                })
            }
            if (status === 'nochange') {
                return setNotificationId(Store.addNotification({
                    ...notification,
                    message: `Hmm... That didn't work. Try checking the username again or maybe you've already sent a friend request to this user. Double-check your friend requests to see if they've accepted your invitation.`,
                }))
            }
        }

        notificate()
    }, [isTryAdded, error, status])

    return (
        <Container>
            <SearchField>
                <FriendsInputField autoFocus onChange={handleAddChange}/>
                <Button onClick={addFriend}>Send friend request</Button>
            </SearchField>
        </Container>
    );
};

export default FriendAddTab;