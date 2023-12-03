import styled from "styled-components";
import {useSelector} from "react-redux";
import {useMemo} from "react";

export const StyledAppBackground = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  display: block;
  width: 100%;
  height: 100%;

  background: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${({appBg}) => appBg}) no-repeat center center fixed;
  background-size: cover;
  filter: blur(5px);
  transform: scale(1.1);
`

export const AppBackground = () => {
    const {settings, isSettingsLoaded} = useSelector(state => state.fetchRoot);

    const bgUrl = useMemo(() => {
        if (!isSettingsLoaded) return "img/AppBG.webp"
        return settings['app_bg'].value || "img/AppBG.webp";
    }, [settings, isSettingsLoaded]);

    return <StyledAppBackground appBg={bgUrl}/>
}

export const AppContent = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`