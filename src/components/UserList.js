import React from 'react';
import UserBox from "./UserBox";

const UserList = () => {

    const users = [
        {username: "123123", activity: "away"},
        {username: "123123", activity: "away"},
        {username: "123123", activity: "away"},
        {username: "123123", activity: "away"},
        {username: "123123", activity: "away"},
        {username: "123123", activity: "online"},
        {username: "123123", activity: "online"},
        {username: "123123", activity: "online"},
        {username: "123123", activity: "away"},
    ]

    return (
        <div>
            {users.map((obj, index) => (
                <UserBox name={obj.username} key={index} activity={obj.activity}/>
            ))}
        </div>
    );
};

export default UserList;