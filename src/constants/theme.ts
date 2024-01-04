// https://m3.material.io/styles/color/roles

export default {
  colors: {
    light: {
      // Use primary roles for the most prominent components across the UI,
      // such as the FAB, high-emphasis buttons, and active states.
      primary: {
        // High-emphasis fills, texts, and icons against surface
        main: "#446732",
        on: "#FFFFFF",
        // Standout fill color against surface, for key components like FAB
        container: "#C5EFAB",
        onContainer: "#072100",
      },
      // Use secondary roles for less prominent components in the UI such as filter chips.
      secondary: {
        // Less prominent fills, text, and icons against surface
        main: "#55624C",
        on: "#FFFFFF",
        //  Less prominent fill color against surface, for recessive components like tonal buttons
        container: "#D9E7CB",
        onContainer: "#131F0D",
      },
      // Use tertiary roles for contrasting accents that balance primary and secondary colors
      // or bring heightened attention to an element such as an input field.
      tertiary: {
        // Complementary fills, text, and icons against surface
        main: "#386666",
        on: "#FFFFFF",
        // Complementary container color against surface, for components like input fields
        container: "#BBEBEC",
        onContainer: "#002020",
      },
      // Use error roles to communicate error states, such as an incorrect password entered into a text field.
      error: {
        // Attention-grabbing color against surface for fills, icons, and text, indicating urgency
        main: "#BA1A1A",
        on: "#FFFFFF",
        // Attention-grabbing fill color against surface
        container: "#FFDAD6",
        onContainer: "#410002",
      },
      // Use surface roles for more neutral backgrounds, and container colors for components like
      // cards, sheets, and dialogs.
      surface: {
        //  Default color for backgrounds
        main: "#F8FAF0",
        on: "#191D16",
        // The most common combination of surface roles uses surface for a background area and surface container
        // for a navigation area.
        container: "#EDEFE5",
        onContainer: "#191D16",
      },
      outline: {
        // Important boundaries, such as a text field outline
        main: "#74796D",
        // Decorative elements, such as dividers
        variant: "#C3C8BB",
      },
    },
    dark: {
      primary: {
        main: "#AAD291",
        on: "#173807",
        container: "#2D4F1C",
        onContainer: "#C5EFAB",
      },
      secondary: {
        main: "#BDCBB0",
        on: "#283420",
        container: "#3E4A35",
        onContainer: "#D9E7CB",
      },
      tertiary: {
        main: "#A0CFCF",
        on: "#003738",
        container: "#1E4E4E",
        onContainer: "#BBEBEC",
      },
      error: {
        main: "#FFB4AB",
        on: "#690005",
        container: "#93000A",
        onContainer: "#FFDAD6",
      },
      surface: {
        main: "#11140E",
        on: "#E1E4D9",
        container: "#1D211A",
        onContainer: "#E1E4D9",
      },
      outline: {
        main: "#8D9286",
        variant: "#43483E",
      },
    },
  },
  typography: {
    display: {},
    headline: {},
    // Titles are smaller than headline styles, and should be used for medium-emphasis text
    // that remains relatively short. For example, consider using title styles to divide
    // secondary passages of text or secondary regions of content.
    // For titles, use caution when using expressive fonts, including display, handwritten, and script styles.
    title: {
      fontSize: null,
      lineHeight: 1.2,
      letterSpacing: null,
      fontWeight: null,
    },
    // Body styles are used for longer passages of text in your app.
    // Use typefaces intended for body styles, which are readable at smaller sizes
    // and can be comfortably read in longer passages.
    // Avoid expressive or decorative fonts for body text because these can be harder to read at small sizes.
    body: {
      fontSize: null,
      lineHeight: 1.5,
    },
    // Label styles are smaller, utilitarian styles, used for things like the text
    // inside components or for very small text in the content body, such as captions.
    // Buttons, for example, use the label large style.
    label: {
      fontSize: null,
      lineHeight: 1.5,
    },
  },
};

export const reactNavigationTheme = {
  light: {
    dark: false,
    colors: {
      primary: "#446732",
      background: "#F8FAF0",
      card: "#EDEFE5",
      text: "#191D16",
      border: "#74796D",
      notification: "#BA1A1A",
    },
  },
  dark: {
    dark: true,
    colors: {
      primary: "#AAD291",
      background: "#11140E",
      card: "#1D211A",
      text: "#E1E4D9",
      border: "#8D9286",
      notification: "#FFB4AB",
    },
  },
};
