import styled, { createGlobalStyle, css } from 'styled-components';

const LABEL_FONT_SIZE = '15px';
const LABEL_COLOR = '#555';
const INPUT_FONT_SIZE = '12px';
const INPUT_FOCUS_COLOR = '#F6DDDF';
const TITLE_COLOR = '#CCF';
const BORDER_ON_HOVER = '3px';

export const GlobalStyle = createGlobalStyle`
  html{
    height: 100%;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: ${LABEL_FONT_SIZE};
    background: linear-gradient(to bottom, #D3CCE3, #E9E4F0);
    height: 50%;
    magin: 0;
    color: ${LABEL_COLOR};
  }
`;

const inputs = css`
  background-color: #EEE;
  font-size: ${INPUT_FONT_SIZE};
  height: 30px;
  border-radius: 10px;
  border: 1px solid #DDD;
  margin: 10px 0 20px 0;
  padding: 5px;
  box-sizing: border-box;
  &:focus {
    outline: none !important;
    border:1px solid ${INPUT_FOCUS_COLOR};
    box-shadow: 0 0 10px #A771FE};
  }
`;

export const STitle = styled.h2<{ color?: string }>`
  margin: auto 0;
  text-align: center;
  padding: 10px;
  color: ${TITLE_COLOR}; // Color DEFAULT
  color: ${(props) => props.color};
`;

export const SForm = styled.form`
  margin: 120px auto 120px;
  width: 100%;
  max-width: 700px;
  padding: 30px;
  background-color: #fff;
  border-radius: 20px;
  box-sizing: border-box;
  box-shadow: 10px 10px 20px 0px rgba(0, 0, 0, 0.3);
`;

export const SInput = styled.input`
  display: block;
  width: 100%;
  ${inputs}
`;

export const SInputRadio = styled.input`
  background-color: #eee;
  font-size: 10px;
`;

export const STextArea = styled.textarea`
  background-color: #eee;
  width: 100%;
  min-height: 100px;
  resize: none;
  ${inputs}
`;

// OBS: Omitindo "onHoverBorderColor", "fontColor" será utilizada também como cor da borda
export const SButton = styled.button<{
  fontColor?: string;
  backgroundColor?: string;
  onHoverBorderColor?: string;
  center?: boolean;
}>`
  text-align: center;
  margin: ${(props) => (props.center ? '0px auto' : '')};
  display: block;
  background-color: black; // Background Color DEFAULT
  background-color: ${(props) => props.backgroundColor};
  color: white; // Color DEFAULT
  color: ${(props) => props.fontColor};
  font-size: 14px;
  border: 1px solid;
  border-radius: 10px;
  height: 40px;
  padding: 0 20 px;
  cursor: pointer;
  text-decoration: none;
  box-sizing: border-box;
  &:hover {
    border: ${BORDER_ON_HOVER} solid ${(props) => props.onHoverBorderColor};
  }
`;

export const SFieldSet = styled.fieldset`
  border: 1px solid #ddd;
  border-radius: 9px;
  font-size: 10px;
  padding: 10px;
  margin: 20px 0;

  legend {
    padding: 0 10px;
    font-size: ${LABEL_FONT_SIZE};
  }

  label {
    padding-right: 20px;
    font-size: ${INPUT_FONT_SIZE};
  }

  input {
    margin-right: 10px;
  }
`;

export const SError = styled.div`
  margin: auto 0;
  padding: 10px;
  text-align: center;
  color: red;
  font-weight: 800;
`;
