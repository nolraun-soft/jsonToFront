import ButtonComponent from "@/common/components/atoms/Button";
import Header from "@/common/components/modules/header";
import { Box, Stack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type ParserProps = {
  type: "atom" | "module" | "template";
  name: string;
  props: object;
  text?: string;
  blocks: ParserProps[];
};
const componentParser = (props: ParserProps) => {
  if (props.type === "atom") {
    if (props.name === "Stack") {
      return (
        <Stack {...props.props}>
          {props.blocks.map((block) => componentParser(block))}
        </Stack>
      );
    } else if (props.name === "Button") {
      return (
        <ButtonComponent
          text={props.text || "텍스트를 입력해주세요."}
          props={props.props}
        />
      );
    }
  }
};

export default function Home() {
  const [msg, setMsg] = useState({});
  useEffect(() => {
    window.addEventListener("message", (e: MessageEvent) => {
      setMsg(e.data);
    });
  }, []);

  return (
    <>
      <VStack spacing={0} minH={"100vh"}>
        <Header />
        {msg.blocks?.map((block) => componentParser(block))}
        <div>123</div>
        <Stack
          h={3000}
          w={"full"}
          mt={"auto"}
          direction={"row"}
          _hover={{
            bg: "gray.100",
          }}
        >
          <ButtonComponent text="123" />
          <ButtonComponent text="123" />
        </Stack>
      </VStack>
    </>
  );
}
