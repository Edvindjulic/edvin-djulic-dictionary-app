import { Stack } from "@chakra-ui/react";
import Header from "./components/Header";
import MainContent from "./components/MainContent";

export default function App() {
  return (
    <Stack>
      <Header />
      <MainContent />
    </Stack>
  );
}
