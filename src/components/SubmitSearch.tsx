import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useContext } from "react";
import * as Yup from "yup";
import { SearchContext } from "../SearchContext";

interface SearchValues {
  word: string;
}

// This component contains the form to submit a search.
export default function SubmitSearch() {
  // Using the useContext hook to access the fetchSearchResult function from the SearchContext.
  const { fetchSearchResult } = useContext(SearchContext);
  //Validation schema for the form
  // Requires a word to be entered in the input
  const validationSchema = Yup.object({
    word: Yup.string().required("Required"),
  });

  //Formik hook to handle form state and validation
  const formik = useFormik<SearchValues>({
    initialValues: {
      word: "",
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      fetchSearchResult(values.word);
    },
  });
  return (
    <VStack>
      <HStack>
        <FormControl isInvalid={!!formik.errors.word}>
          <VStack position={'relative'}>
            <Input
              variant={"outline"}
              placeholder={"Search for a word"}
              size={"md"}
              w={"40vw"}
              name="word"
              value={formik.values.word}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.word && <Text position="absolute" bottom="-25px">{formik.errors.word}</Text>}
          </VStack>
        </FormControl>
        <Box>
          <Button onClick={() => formik.handleSubmit()}>Search</Button>
        </Box>
      </HStack>
    </VStack>
  );
}