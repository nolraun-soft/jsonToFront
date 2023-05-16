import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

type Props = {
  props?: ButtonProps;
  text: string;
};
const ButtonComponent = ({ text, props }: Props) => {
  return <Button {...props}>{text}</Button>;
};

export default ButtonComponent;
