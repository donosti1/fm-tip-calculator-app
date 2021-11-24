import {extendTheme, theme} from "@chakra-ui/react";

export default extendTheme({
  styles: {
    global: {
      body: {
        color: "blackAlpha.900",
        fontWeight: "400",
      },
    },
  },
  colors: {
    primary: {
      300: `#9fe8df`,
      400: `hsl(183, 100%, 15%)`,
      500: `hsl(186, 14%, 43%)`,
      600: `hsl(184, 14%, 56%)`,
      700: `hsl(185, 41%, 84%)`,
      800: `hsl(189, 41%, 97%)`,
    },
    secondary: {
      ...theme.colors.messenger,
      50: `hsl(185, 41%, 84%)`,
      100: `hsl(172, 67%, 45%)`,
      200: `hsl(0, 0%, 100%)`,
    },
    success: theme.colors.whatsapp,
    error: theme.colors.red,
    warning: theme.colors.orange,
  },
  sizes: {
    container: {
      xl: "1440px",
    },
  },
  fonts: {
    body: "Space Mono",
    heading: "Space Mono",
  },
  components: {
    Link: {
      variants: {
        unstyled: ({colorScheme = "blackAlpha"}) => ({
          color: `${colorScheme}.700`,
          _hover: {
            color: `${colorScheme}.800`,
            textDecoration: "none",
          },
        }),
        color: ({colorScheme = "secondary"}) => ({
          color: `${colorScheme}.500`,
          _hover: {
            color: `${colorScheme}.600`,
            textDecoration: "none",
          },
        }),
      },
      defaultProps: {
        variant: "color",
      },
    },
    Button: {
      baseStyle: {
        _disabled: {
          color: "primary.400",
        },
        color: "primary.400",
      },
      sizes: {
        lg: {
          fontSize: "md",
        },
      },
      variants: {
        ghost: ({colorScheme = "secondary"}) => ({
          backgroundColor: `${colorScheme}.50`,
          ":hover, :focus": {
            backgroundColor: `${colorScheme}.100`,
          },
        }),
      },
    },
    Input: {
      parts: ["field"],
      defaultProps: {
        focusBorderColor: "secondary.500",
      },
      variants: {
        filled: {
          field: {
            borderRadius: "sm",
            color: "blackAlpha.800",
            backgroundColor: "secondary.50",
            ":hover, :focus": {
              borderColor: "secondary.100",
            },
          },
        },
        outline: {
          field: {
            borderColor: "gray.300",
          },
        },
      },
    },
  },
});
