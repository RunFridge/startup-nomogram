import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  gap: 2em;

  padding: 2em 4em;
`;

export const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2em;
`;

export const RangeInput = styled.input`
  /* 
    Custom styled range input from https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/ 
  */

  & {
    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
    width: 100%; /* Specific width is required for Firefox. */
    background: transparent; /* Otherwise white in Chrome */
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }
  &::-ms-track {
    width: 100%;
    cursor: pointer;

    /* Hides the slider so custom styles can be added */
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  /* Special styling for WebKit/Blink */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
    margin-top: -14px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; /* Add cool effects to your sliders! */
  }

  /* All the same stuff for Firefox */
  &::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }

  /* All the same stuff for IE */
  &::-ms-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #2980b9;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }

  &:focus::-webkit-slider-runnable-track {
    background: #367ebd;
  }

  &::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #2980b9;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }

  &::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: #2a6495;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  &:focus::-ms-fill-lower {
    background: #3071a9;
  }
  &::-ms-fill-upper {
    background: #3071a9;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  &:focus::-ms-fill-upper {
    background: #367ebd;
  }
`;

export const NumberInputWrapper = styled.div``;
export const NumberLabel = styled.label``;
export const NumberInput = styled.input`
  /* Reset default input["number"] */
  background: transparent;
  border: none;
  &:focus {
    outline: none;
  }

  color: #fff;
  border-bottom: 2px solid #fff;
  font-size: 1.25em;
  text-align: center;

  &:focus {
    border-bottom: 2px solid #2980b9;
  }
`;
