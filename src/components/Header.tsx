import { Button, HStack, useColorMode } from "@chakra-ui/react";
import SubmitSearch from "./SubmitSearch";

export default function Header() {
  const { toggleColorMode } = useColorMode();
  return (
    <HStack h={"80px"} m={5}>
      <SubmitSearch />
      <Button onClick={toggleColorMode}>Toggle theme</Button>
    </HStack>
  );
}
