import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled, {css, keyframes} from "styled-components";
import {faExclamation} from "@fortawesome/free-solid-svg-icons";

const OnHover = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
`

const AlertIconStyle = styled(FontAwesomeIcon)`
  color: white;
  background-color: red;
  padding: 3px;
  border-radius: 50%;
  aspect-ratio: 1 / 1;

  ${({$isAnimated}) => $isAnimated && css`
    animation: ${OnHover} 2s ease-in-out infinite;
  `}
  
  transition-duration: 200ms;
  
  z-index: 1000;
  
  ${({onClick}) => onClick && css`
    &:hover {
      background-color: white;
      color: red
    }
  `}
  
`

const AlertIcon = ({className, onClick, isAnimated}) => {
    return <AlertIconStyle className={className} icon={faExclamation} onClick={onClick ? onClick : null} $isAnimated={isAnimated}/>
}

export default AlertIcon;