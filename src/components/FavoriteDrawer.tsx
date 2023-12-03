import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  List,
  ListItem,
  useToast,
} from "@chakra-ui/react";
import { SearchResult } from "../SearchContext";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedWords: SearchResult[];
  removeWord: (word: SearchResult) => void;
  children?: React.ReactNode;
}

export default function FavoriteDrawer({
  isOpen,
  onClose,
  savedWords,
  removeWord,
}: DrawerProps) {
  const toast = useToast();
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={"sm"}>
      <DrawerOverlay />
      <DrawerContent alignItems={"center"}>
        <DrawerCloseButton />
        <DrawerHeader>Favorite words</DrawerHeader>
        <DrawerBody>
          <List>
            {savedWords.map((word, index) => (
              <HStack key={index}>
                <ListItem>{word.word}</ListItem>
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    removeWord(word);
                    toast({
                      title: "Word removed",
                      description:
                        "You will no longer see it here",
                      status: "success",
                      duration: 9000,
                      isClosable: true,
                    });
                  }}
                >
                  Remove
                </Button>
              </HStack>
            ))}
          </List>
        </DrawerBody>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
