import {playNotificationSound} from "../components/AudioPlayer";

const NOTIFICATION_TITLE = '9lruk';
const NOTIFICATION_BODY = 'Я підараз';

export const notificationPM = (message) => {
    window.electron.ipcRenderer.receiveMessage('get-app-minimized-status', result => {
        console.log("awdwda");
        console.log(result);
    })
    playNotificationSound();
    new Notification(NOTIFICATION_TITLE, {
        body: NOTIFICATION_BODY, silent: true, icon: "https://cdn.discordapp.com/avatars/481447602425036800/eed0ad6c8e29168190b2d036609cd625.webp"
    })
}
