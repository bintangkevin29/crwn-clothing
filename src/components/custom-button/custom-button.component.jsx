import React from "react";

// import "./custom-button.style.scss";
import { CustomButtonContainer } from "./custom-button.styles";

const CustomButton = ({ children, ...props }) => (
  <CustomButtonContainer className {...props}>
    {children}
  </CustomButtonContainer>
);

export default CustomButton;
