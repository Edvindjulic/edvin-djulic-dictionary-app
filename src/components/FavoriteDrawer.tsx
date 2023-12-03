import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  List,
  ListItem,
} from "@chakra-ui/react";
import { SearchResult } from "../SearchContext";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedWords: SearchResult[];
  children?: React.ReactNode;
}

export default function FavoriteDrawer({
  isOpen,
  onClose,
  savedWords,
}: DrawerProps) {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={"sm"}>
      <DrawerOverlay />
      <DrawerContent alignItems={"center"}>
        <DrawerCloseButton />
        <DrawerHeader>Favorite words</DrawerHeader>

        <DrawerBody>
          <List>
            {savedWords.map((word, index) => (
              <ListItem key={index}>{word.word}</ListItem>
            ))}
          </List>
        </DrawerBody>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
