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

export default function SubmitSearch() {
  const { fetchSearchResult } = useContext(SearchContext);
  //Validation schema
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
          <Box h={15}>
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
            {formik.errors.word && <Text>{formik.errors.word}</Text>}
          </Box>
        </FormControl>
        <Box h={15}>
          <Button onClick={() => formik.handleSubmit()}>Search</Button>
        </Box>
      </HStack>
    </VStack>
  );
}
