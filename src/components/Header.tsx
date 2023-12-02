import { Button, HStack, useColorMode } from "@chakra-ui/react";
import { RefObject } from "react";
import SubmitSearch from "./SubmitSearch";

interface HeaderProps {
  onOpen: () => void;
  btnRef: RefObject<HTMLButtonElement>;
}

export default function Header({ onOpen, btnRef }: HeaderProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const buttonText = colorMode === "light" ? "Dark" : "Light";
  return (
    <HStack h={"80px"} m={5}>
      <SubmitSearch />
      <Button ref={btnRef} onClick={onOpen}>
        Show favorite words
      </Button>
      <Button variant={"solid"} onClick={toggleColorMode}>
        {buttonText} Mode
      </Button>
    </HStack>
  );
}
