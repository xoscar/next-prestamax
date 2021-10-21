import { Grid, InputBase } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Grid).attrs({
  boxShadow: 1,
  xs: 12,
  sm: 10,
  md: 6,
})`
  position: relative;
  background: ${({ theme }) => theme.whiteColor};
  margin: 0;
`;

export const InputText = styled(InputBase)`
  width: 100%;

  & .MuiInputBase-input {
    padding: 15px;
    padding-left: 40px;
    width: 100%;
  }
`;

export const IconWrapper = styled.div`
  padding: 0px 5px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;
