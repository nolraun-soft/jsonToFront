import {
  Box,
  ButtonProps,
  Center,
  HStack,
  StackProps,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import StructureItem from "./components/structure";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

export default function Home() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [stack, setStack] = React.useState([
    {
      id: "1",
      type: "atom",
      name: "Stack",
      props: {
        w: "full",
        spacing: 1,
        p: 4,
      } as StackProps,
      blocks: [
        {
          type: "atom",
          name: "Button",
          props: {
            w: "full",
            colorScheme: "blue",
            fontSize: 16,
          } as ButtonProps,
          text: "홍길동2",
        },
        {
          type: "atom",
          name: "Button",
          props: {
            w: "full",
            colorScheme: "blue",
            fontSize: 16,
          } as ButtonProps,
          text: "홍길동3",
        },
        {
          type: "atom",
          name: "Button",
          props: {
            w: "full",
            colorScheme: "blue",
          } as ButtonProps,
          text: "홍길동4",
        },
      ],
    },
    {
      id: "2",
      type: "atom",
      name: "Stack",
      props: {
        w: "full",
        spacing: 1,
        p: 4,
      } as StackProps,
      blocks: [
        {
          type: "module",
          name: "Header",
          props: {} as ButtonProps,
          text: "홍길동",
        },
        {
          type: "atom",
          name: "Button",
          props: {
            w: "full",
            colorScheme: "blue",
            fontSize: 16,
          } as ButtonProps,
          text: "홍길동",
        },
        {
          type: "atom",
          name: "Button",
          props: {
            w: "full",
            colorScheme: "blue",
            fontSize: 16,
          } as ButtonProps,
          text: "홍길동",
        },
        {
          type: "atom",
          name: "Button",
          props: {
            w: "full",
            colorScheme: "blue",
          } as ButtonProps,
          text: "홍길동",
        },
      ],
    },
  ]);

  const [items, setItems] = React.useState(
    stack?.map((block) => {
      return block.id;
    })
  );

  useEffect(() => {
    console.log("stack", stack);
    setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage(
        {
          blocks: stack,
        },
        "*"
      );
    }, 0);
  }, [iframeRef, stack]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });

      // setStack((stack) => {
      //   const result = [];
      //   items.map((id) => {
      //     result.push(stack.find((block) => block.id === id));
      //   });
      //   return result;
      // });
    }
  }

  return (
    <Box>
      <Box
        bg={"white"}
        w={"full"}
        h={"70px"}
        borderBottom={"1px solid"}
        borderColor={"gray.200"}
      >
        header...
      </Box>
      <HStack minH={"100vh"} bg={"gray.100"} spacing={0}>
        <Box
          w={200}
          h={"100vh"}
          bg={"white"}
          borderRight={"1px solid"}
          borderColor={"gray.200"}
        >
          pages...
        </Box>
        <Box
          w={300}
          h={"100vh"}
          bg={"white"}
          borderRight={"1px solid"}
          borderColor={"gray.200"}
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              <VStack w={"full"} p={2} minH={"100vh"}>
                {stack.map((block, index) => (
                  <StructureItem
                    id={block.id}
                    key={index}
                    depth={0}
                    item={block}
                  />
                ))}
              </VStack>
            </SortableContext>
          </DndContext>
        </Box>
        <Center flex={1}>
          <Box w={"400px"} h={"700px"}>
            <iframe
              ref={iframeRef}
              width={"100%"}
              height={"100%"}
              src="http://localhost:3000"
            />
          </Box>
        </Center>
        <Box w={500} h={"100vh"} bg={"white"}></Box>
      </HStack>
    </Box>
  );
}
