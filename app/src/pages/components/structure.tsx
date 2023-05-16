import React from "react";
import { Box, Center, HStack, Icon, Text, VStack } from "@chakra-ui/react";

import { TbAtom2 } from "react-icons/tb";
import { VscGroupByRefType } from "react-icons/vsc";
import { HiOutlineTemplate } from "react-icons/hi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  id: string | number;
  depth: number;
  // type: "atom" | "module" | "template";
  item: any;
};
const StructureItem = ({ id, depth, item }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <VStack
      w={"full"}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <HStack pl={4 * depth} w={"full"} as={"button"}>
        <Center borderRadius={10} w={8} h={8} bg={"blue.50"}>
          {item.type === "atom" && <Icon as={TbAtom2} />}
          {item.type === "module" && <Icon as={VscGroupByRefType} />}
          {item.type === "template" && <Icon as={HiOutlineTemplate} />}
        </Center>
        <Box flex={1} textAlign={"left"}>
          <Text fontSize={14}>{item.name}</Text>
        </Box>
      </HStack>
      {item.blocks?.map((block, index) => (
        <StructureItem key={index} depth={depth + 1} item={block} />
      ))}
    </VStack>
  );
};

export default StructureItem;
