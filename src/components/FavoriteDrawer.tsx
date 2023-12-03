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

// This component, using the Chakra UI Drawer component, displays the list of saved words.
// isOpen, onClose, savedWords and removeWord are props passed from the App component (the parent).
// isOpen and onClose are used to open and close the drawer.
// The List component is used to display the list of saved words by mapping over the savedWords (an array of SearchResult objects).
// For each SearchResult object, a ListItem is created with the word and a Button to remove the word from the list.
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
                      description: "You will no longer see it here",
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
