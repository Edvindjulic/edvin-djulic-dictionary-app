import { VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { SearchContext } from "../SearchContext";
import FavoriteDrawer from "./FavoriteDrawer";
import RenderSearchResult from "./RenderSearchResult";

interface MainContentProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MainContent({ isOpen, onClose }: MainContentProps) {
  const { savedWords } = useContext(SearchContext);
  return (
    <VStack>
      <FavoriteDrawer
        isOpen={isOpen}
        onClose={onClose}
        savedWords={savedWords}
      />
      <RenderSearchResult />
    </VStack>
  );
}
