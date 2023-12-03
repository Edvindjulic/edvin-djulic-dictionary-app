import { Button, HStack, useColorMode } from "@chakra-ui/react";
import { RefObject } from "react";
import SubmitSearch from "./SubmitSearch";

interface HeaderProps {
  onOpen: () => void;
  btnRef: RefObject<HTMLButtonElement>;
}

export default function Header({ onOpen, btnRef }: HeaderProps) {
  // Using the useColorMode from Chakra UI to toggle between light and dark mode.
  const { colorMode, toggleColorMode } = useColorMode();
  // Depending on the color mode, the button text will change.
  const buttonText = colorMode === "light" ? "Dark" : "Light";
  // The Header component contains the SubmitSearch component, the button to open the drawer with favorite words
  // and the button to toggle between light and dark mode.
  return (
    <HStack p={5} justify={"center"} alignItems={"center"}>
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
