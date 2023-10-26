import styled, {css} from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const StyledIcon = styled(FontAwesomeIcon)`
  color: #CA71D1;
  width: 40px;
  height: 40px;

  transition-duration: inherit;
`

export const IconBackground = styled.div`
  width: 70px;
  height: 70px;

  border-radius: 50%;

  filter: drop-shadow(black 0 0 20px);

  border: solid transparent 0;

  ${({isSelected}) => isSelected && css`
    border: solid white 3px;
  `}

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  transition-duration: 200ms;

  &:hover ${StyledIcon} {
    color: white;
  }

  &:active {
    margin-bottom: -4px;
  }
`

const SeparatorContainer = styled.div`
  height: 3px;
  width: 100%;

  margin-top: 5px;
  margin-bottom: 5px;

  filter: drop-shadow(#FC03F2 0px 0px 3px);
`

export const Separator = styled.div`
  height: 3px;

  box-sizing: border-box;

  margin-left: 20px;
  margin-right: 20px;

  background-color: #8723D6;

  align-self: center;
`

export const IconSeparator = () => {
    return (
        <SeparatorContainer>
            <Separator/>
        </SeparatorContainer>
    )
}