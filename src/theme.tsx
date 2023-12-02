import { extendTheme } from "@chakra-ui/react";

const tokens = {
  colors: {
    light: {
      bg: "#fff",
      "btn-bg": "#e5e5e5",
      "btn-hover-bg": "#adb5bd",
      "inp-bg": "#fff", //Bakgrundsfärgen på inputfältet
      "inp-border": "darkgrey", //Färgen på bordern på inputfältet
      "inp-hover-border": "#000", //Färgen på bordern vid hover på inputfältet
      "inp-active-border": "#000", //Färgen på bordern vid active på inputfältet
      "inp-focus-border": "#000", //Färgen på bordern vid focus på inputfältet
    },
    dark: {
      bg: "#000814",
      "btn-bg": "#e5e5e5",
      "btn-hover-bg": "#adb5bd",
      "inp-bg": "#fff", //Bakgrundsfärgen på inputfältet
      "inp-border": "#grey", //Färgen på bordern på inputfältet
      "inp-hover-border": "#fff", //Färgen på bordern vid hover på inputfältet
      "inp-active-border": "#fff", //Färgen på bordern vid active på inputfältet
      "inp-focus-border": "#fff", //Färgen på bordern vid focus på inputfältet
    },
  },
};

const semanticTokens = {
  colors: {
    bg: {
      default: tokens.colors.light["bg"],
      _dark: tokens.colors.dark["bg"],
    },
    "btn-bg": {
      default: tokens.colors.light["btn-bg"],
      _dark: tokens.colors.dark["btn-bg"],
    },
    "btn-hover-bg": {
      default: tokens.colors.light["btn-hover-bg"],
      _dark: tokens.colors.dark["btn-hover-bg"],
    },
    "inp-bg": {
      default: tokens.colors.light["inp-bg"],
      _dark: tokens.colors.dark["inp-bg"],
    },
    "inp-border": {
      default: tokens.colors.light["inp-border"],
      _dark: tokens.colors.dark["inp-border"],
    },
    "inp-hover-border": {
      default: tokens.colors.light["inp-hover-border"],
      _dark: tokens.colors.dark["inp-hover-border"],
    },
    "inp-active-border": {
      default: tokens.colors.light["inp-active-border"],
      _dark: tokens.colors.dark["inp-active-border"],
    },
    "inp-focus-border": {
      default: tokens.colors.light["inp-focus-border"],
      _dark: tokens.colors.dark["inp-focus-border"],
    },
  },
};

const styles = {
  global: {
    body: {
      background: "bg",
    },
  },
};

const components = {
  Button: {
    baseStyle: {
      borderRadius: "md",
      color: "#000",
      _focus: {
        ring: "0px",
      },
    },
    variants: {
      solid: {
        backgroundColor: "btn-bg",
        color: "#000",
        _hover: {
          backgroundColor: "btn-hover-bg",
          color: "#000",
        },
        _active: {
          backgroundColor: "btn-hover-bg",
        },
      },
    },
    sizes: {
      md: {
        fontSize: "md",
        px: 4,
        py: 2,
      },
    },
  },
  Input: {
    baseStyle: {
      borderRadius: "md",
    },
    variants: {
      outline: {
        field: {
          borderColor: "inp-border",
          borderWidth: "2px",
          _hover: {
            borderColor: "inp-hover-border",
          },
          _active: {
            borderColor: "inp-active-border",
          },
          _focus: {
            borderColor: "inp-focus-border",
            borderWidth: "2px",
            shadow: "none",
          },
        },
      },
    },
    sizes: {
      md: {
        fontSize: "md",
        px: 4,
        py: 2,
      },
    },
  },
};

const theme = extendTheme({
  tokens,
  semanticTokens,
  styles,
  components,
});

export default theme;
