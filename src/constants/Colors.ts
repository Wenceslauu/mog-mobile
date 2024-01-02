const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
  },
};

// https://m3.material.io/styles/color/roles

const theme = {
  colors: {
    // Use primary roles for the most prominent components across the UI,
    // such as the FAB, high-emphasis buttons, and active states.
    primary: {
      // High-emphasis fills, texts, and icons against surface
      main: "#386A1F",
      on: "#F0F3E8",
      // Standout fill color against surface, for key components like FAB
      container: "#B8F397",
      onContainer: "#43483E",
    },
    // Use secondary roles for less prominent components in the UI such as filter chips.
    secondary: {
      // Less prominent fills, text, and icons against surface
      main: "#55624C",
      on: "#FFFFFF",
      //  Less prominent fill color against surface, for recessive components like tonal buttons
      container: "#F0F3E8",
      onContainer: "#131F0D",
    },
    // Use tertiary roles for contrasting accents that balance primary and secondary colors
    // or bring heightened attention to an element such as an input field.
    tertiary: {
      // Complementary fills, text, and icons against surface
      main: "#386667",
      on: "#FFFFFF",
      // Complementary container color against surface, for components like input fields
      container: "#BBEBEB",
      onContainer: "#002021",
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
      on: "#1A1C18",
      // The most common combination of surface roles uses surface for a background area and surface container
      // for a navigation area.
      container: "#EDEFE5",
      onSurfaceContainer: "#1A1C18",
    },
    outline: {
      // Important boundaries, such as a text field outline
      main: "#74796D",
      // Decorative elements, such as dividers
      variant: "#C3C8BB",
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
