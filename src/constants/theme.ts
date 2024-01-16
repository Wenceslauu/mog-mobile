import { createTheme } from "@shopify/restyle";

const themeWithoutColors = {
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  /* TYPOGRAPHY ROLES FROM MATERIAL DESIGN 3
    https://m3.material.io/styles/typography/applying-type

    textVariants: {
      display: {},
      headline: {},

      Titles are smaller than headline styles, and should be used for medium-emphasis text
      that remains relatively short. For example, consider using title styles to divide
      secondary passages of text or secondary regions of content.
      For titles, use caution when using expressive fonts, including display, handwritten, and script styles.
      title: {},

      Body styles are used for longer passages of text in your app.
      Use typefaces intended for body styles, which are readable at smaller sizes
      and can be comfortably read in longer passages.
      Avoid expressive or decorative fonts for body text because these can be harder to read at small sizes.
      body: {},

      Label styles are smaller, utilitarian styles, used for things like the text
      inside components or for very small text in the content body, such as captions.
      Buttons, for example, use the label large style.
      label: {},
  */
  textVariants: {
    display: {},
    headline: {
      fontSize: 24,
      fontWeight: "bold",
    },
    title: {
      fontSize: 20,
      // lineHeight: 1.2,
      fontWeight: "bold",
    },
    body: {
      fontSize: 16,
      // lineHeight: 1.5,
    },
    label: {
      fontSize: 12,
      // lineHeight: 1.5,
    },
  },
  breakpoints: {},
};

/* COLOR ROLES FROM MATERIAL DESIGN 3
  https://m3.material.io/styles/color/roles
  
  colors: {
    Use primary roles for the most prominent components across the UI,
    such as the FAB, high-emphasis buttons, and active states.

    High-emphasis fills, texts, and icons against surface
    primary: "#446732",
    onPrimary: "#FFFFFF",
    Standout fill color against surface, for key components like FAB
    primaryContainer: "#C5EFAB",
    onPrimaryContainer: "#072100",
    
    Use secondary roles for less prominent components in the UI such as filter chips.

    Less prominent fills, text, and icons against surface
    secondary: "#55624C",
    onSecondary: "#FFFFFF",
     Less prominent fill color against surface, for recessive components like tonal buttons
    secondaryContainer: "#D9E7CB",
    onSecondaryContainer: "#131F0D",
    
    Use tertiary roles for contrasting accents that balance primary and secondary colors
    or bring heightened attention to an element such as an input field.

    Complementary fills, text, and icons against surface
    tertiary: "#386666",
    onTertiary: "#FFFFFF",
    Complementary container color against surface, for components like input fields
    tertiaryContainer: "#BBEBEC",
    onTertiaryContainer: "#002020",

    Use error roles to communicate error states, such as an incorrect password entered into a text field.

    Attention-grabbing color against surface for fills, icons, and text, indicating urgency
    error: "#BA1A1A",
    onError: "#FFFFFF",
    Attention-grabbing fill color against surface
    errorContainer: "#FFDAD6",
    onErrorContainer: "#410002",

    Use surface roles for more neutral backgrounds, and container colors for components like
    cards, sheets, and dialogs.

    Default color for backgrounds
    surface: "#F8FAF0",
    onSurface: "#191D16",
    The most common combination of surface roles uses surface for a background area and surface container
    for a navigation area.
    surfaceContainer: "#EDEFE5",
    onSurfaceContainer: "#191D16",

    Important boundaries, such as a text field outline
    outline: "#74796D",
    Decorative elements, such as dividers
    outlineVariant: "#C3C8BB",
  },
*/
export const lightTheme = createTheme({
  ...themeWithoutColors,
  colors: {
    primary: "#446732",
    onPrimary: "#FFFFFF",
    primaryContainer: "#C5EFAB",
    onPrimaryContainer: "#072100",

    secondary: "#55624C",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#D9E7CB",
    onSecondaryContainer: "#131F0D",

    tertiary: "#386666",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#BBEBEC",
    onTertiaryContainer: "#002020",

    error: "#BA1A1A",
    onError: "#FFFFFF",
    errorContainer: "#FFDAD6",
    onErrorContainer: "#410002",

    surface: "#F8FAF0",
    onSurface: "#191D16",
    surfaceContainer: "#EDEFE5",
    onSurfaceContainer: "#191D16",

    outline: "#74796D",
    outlineVariant: "#C3C8BB",
  },
});

export const darkTheme = createTheme({
  ...themeWithoutColors,
  colors: {
    primary: "#AAD291",
    onPrimary: "#173807",
    primaryContainer: "#2D4F1C",
    onPrimaryContainer: "#C5EFAB",

    secondary: "#BDCBB0",
    onSecondary: "#283420",
    secondaryContainer: "#3E4A35",
    onSecondaryContainer: "#D9E7CB",

    tertiary: "#A0CFCF",
    onTertiary: "#003738",
    tertiaryContainer: "#1E4E4E",
    onTertiaryContainer: "#BBEBEC",

    error: "#FFB4AB",
    onError: "#690005",
    errorContainer: "#93000A",
    onErrorContainer: "#FFDAD6",

    surface: "#11140E",
    onSurface: "#E1E4D9",
    surfaceContainer: "#1D211A",
    onSurfaceContainer: "#E1E4D9",

    outline: "#8D9286",
    outlineVariant: "#43483E",
  },
});

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
      teste: "#AAFFAA",
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
      teste: "#AAFFAA",
    },
  },
};

export type Theme = typeof lightTheme;
