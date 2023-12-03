import {
  Button,
  HStack,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { SearchContext } from "../SearchContext";
import AudioPlayer from "./AudioPlayer";

export default function RenderSearchResult() {
  const { searchResult, saveWord } = useContext(SearchContext);
  const { colorMode } = useColorMode();
  const toast = useToast();
  const audioSource = searchResult?.[0]?.phonetics.find(
    (phonetic) => phonetic.audio
  );
  const bgColor = colorMode === "light" ? "black" : "white";

  return (
    <VStack w={"100%"} mt={10} mb={10}>
      {searchResult?.length === 0 ? (
        <Text>Sorry, your word doesn't exist in the English language.</Text>
      ) : (
        searchResult &&
        audioSource && (
          <VStack w={"100%"}>
            <VStack h={"100%"} w={"60%"} p={5} border={`1px solid ${bgColor}`}>
              <HStack>
                <Heading as="h2">{searchResult[0].word}</Heading>
                <Text fontSize="xl">
                  {" "}
                  {"[ "}
                  {searchResult[0].phonetics[0].text ||
                    searchResult[0].phonetics[1]?.text}
                  {" ]"}
                </Text>
              </HStack>
              <HStack spacing={5}>
                {audioSource && <AudioPlayer src={audioSource.audio} />}
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    saveWord(searchResult[0]);
                    toast({
                      title: "Word saved",
                      description: "You can find it by clicking Show favorite words",
                      status: "success",
                      duration: 9000,
                      isClosable: true,
                    });
                  }}
                >
                  Save
                </Button>
              </HStack>
            </VStack>
            <VStack h={"100%"} w={"60%"} border={`1px solid ${bgColor}`}>
              <Tabs variant={"enclosed"} w={"100%"} align="center">
                <TabList w={"100%"}>
                  {searchResult[0].meanings.map((meaning, index) => (
                    <Tab key={index} w={"50%"}>
                      {meaning.partOfSpeech}
                    </Tab>
                  ))}
                </TabList>
                <TabPanels>
                  {searchResult[0].meanings.map((meaning, index) => (
                    <TabPanel key={index}>
                      {meaning.definitions.map(
                        (definition, definitionIndex) => (
                          <VStack
                            align="start"
                            key={definitionIndex}
                            borderBottom={`1px solid ${bgColor}`}
                            p={1}
                          >
                            <Text>Definition: {definition.definition}</Text>
                            {definition.synonyms.length > 0 && (
                              <Text>
                                Synonyms: {definition.synonyms.join(", ")}
                              </Text>
                            )}
                            {definition.antonyms.length > 0 && (
                              <Text>
                                Antonyms: {definition.antonyms.join(", ")}
                              </Text>
                            )}
                          </VStack>
                        )
                      )}
                      <VStack align="start">
                        {meaning.synonyms.length > 0 && (
                          <Text> Synonyms: {meaning.synonyms.join(", ")}</Text>
                        )}
                        {meaning.antonyms.length > 0 && (
                          <Text>Antonmys: {meaning.antonyms.join(", ")}</Text>
                        )}
                      </VStack>
                    </TabPanel>
                  ))}
                </TabPanels>
              </Tabs>
            </VStack>
          </VStack>
        )
      )}
    </VStack>
  );
}
