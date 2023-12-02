import { Stack, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import Header from "./components/Header";
import MainContent from "./components/MainContent";

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  return (
    <Stack>
      <Header onOpen={onOpen} btnRef={btnRef} />
      <MainContent isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
}
