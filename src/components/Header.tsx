import { Button, HStack, useColorMode } from "@chakra-ui/react";
import SubmitSearch from "./SubmitSearch";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const buttonText = colorMode === "light" ? "Dark" : "Light";
  return (
    <HStack h={"80px"} m={5}>
      <SubmitSearch />
      <Button variant={"solid"} onClick={toggleColorMode}>
        {buttonText} Mode
      </Button>
    </HStack>
  );
}
