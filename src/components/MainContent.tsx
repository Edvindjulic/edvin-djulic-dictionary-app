import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  List,
  ListItem,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { SearchContext } from "../SearchContext";
import RenderSearchResult from "./RenderSearchResult";

export default function MainContent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { savedWords } = useContext(SearchContext);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  return (
    <VStack>
      <>
        <Button ref={btnRef} onClick={onOpen}>
          Show favorite words
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
          size={"sm"}
        >
          <DrawerOverlay />
          <DrawerContent alignItems={"center"}>
            <DrawerCloseButton />
            <DrawerHeader>Favorite words</DrawerHeader>

            <DrawerBody>
              <List>
                {savedWords.map((word, index) => (
                  <ListItem key={index}>{word}</ListItem>
                ))}
              </List>
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
      <RenderSearchResult />
    </VStack>
  );
}
