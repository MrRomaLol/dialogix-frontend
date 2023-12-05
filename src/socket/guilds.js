import store from "../store";
import {socket} from "./index";
import {loadGuild, removeGuild} from "../store/guildsSlice";
import {Store} from "react-notifications-component";

const showNotification = () => {
    Store.addNotification({
        title: "Hey!",
        type: "info",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeInDown"],
        dismiss: {
            duration: 5000,
            pauseOnHover: true,
        },
        message: "It seems you are no longer welcome here. Being a good program, I'll just redirect you to the main page."
    })
}

socket.on('guild-updates', (args) => {
    const guilds = store.getState().guilds.guilds;

    const myId = store.getState().auth.userInfo.id;
    if (args.eventType === 'userKick' && args.eventArgs.kickedUserId === myId) {
        return store.dispatch(removeGuild({guildId: args.guildId})).unwrap()
            .then(({isActiveGuildKicked}) => {
                if (isActiveGuildKicked) {
                    showNotification();
                }
            });
    }

    const guild = guilds.find((guild) => guild.id === args.guildId)
    if (guild && guild.isLoaded) {
        store.dispatch(loadGuild({guildId: args.guildId}));
    }
})

export const subToGuilds = () => {
    const guilds = store.getState().guilds.guilds;
    guilds.forEach((guild) => {
        socket.emit('join', `g-${guild.id}`);
    })
}