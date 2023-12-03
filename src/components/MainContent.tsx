import { VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { SearchContext } from "../SearchContext";
import FavoriteDrawer from "./FavoriteDrawer";
import RenderSearchResult from "./RenderSearchResult";

interface MainContentProps {
  isOpen: boolean;
  onClose: () => void;
}

// This component contains the FavoriteDrawer component and the RenderSearchResult component.
// isOpen and onClose are props passed from the App component (the parent).
export default function MainContent({ isOpen, onClose }: MainContentProps) {
  // Using the useContext hook to access the savedWords and removeWord from the SearchContext.
  const { savedWords, removeWord } = useContext(SearchContext);
  // FavoriteDrawer's isOpen, onClose, savedWords and removeWord are passed as props.
  return (
    <VStack>
      <FavoriteDrawer
        isOpen={isOpen}
        onClose={onClose}
        savedWords={savedWords}
        removeWord={removeWord}
      />
      <RenderSearchResult />
    </VStack>
  );
}
