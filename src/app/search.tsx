import Box from "@/components/Box";
import SearchResultCard from "@/components/search/SearchResultCard";
import { SearchResult } from "@/types/SearchResult";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "expo-router";
import { useEffect, useRef } from "react";
import { SearchBarCommands } from "react-native-screens";

const mockedResults: SearchResult[] = [
  {
    type: "profile",
    name: "Lui",
    image: "https://unavatar.io/github/pedroandrade03",
  },
  {
    type: "profile",
    name: "Wenceslau",
    image: "https://unavatar.io/github/Wenceslauu",
  },
  {
    type: "profile",
    name: "Alencar",
    // image: "https://unavatar.io/github/Wenceslauu",
  },
  {
    type: "profile",
    name: "Pedroca",
    // image: "https://unavatar.io/github/Wenceslauu",
  },
  {
    type: "profile",
    name: "Thigas",
    // image: "https://unavatar.io/github/Wenceslauu",
  },
  {
    type: "profile",
    name: "Henry",
    // image: "https://unavatar.io/github/Wenceslauu",
  },
];

export default function SearchScreen() {
  const navigation = useNavigation();

  const searchBarRef = useRef<SearchBarCommands>(null);

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        ref: searchBarRef,
        placeholder: "Search users",
        hideNavigationBar: false,
        onFocus: () => searchBarRef.current?.toggleCancelButton(true),
        onBlur: () => searchBarRef.current?.toggleCancelButton(false),
      },
    });
  }, [navigation]);

  useEffect(() => {
    const autoFocus = setTimeout(() => {
      searchBarRef.current?.focus();
    }, 600);

    return () => {
      clearTimeout(autoFocus);
    };
  }, []);

  // TODO: Add new categories in a pager format (like the home screen), try to reuse this same flashlist
  return (
    <Box flex={1}>
      <FlashList
        keyboardDismissMode="on-drag"
        data={mockedResults}
        estimatedItemSize={106}
        renderItem={({ item }) => <SearchResultCard searchResult={item} />}
        ItemSeparatorComponent={() => <Box height={4} />}
        contentContainerStyle={{ paddingBottom: 30, paddingTop: 8 }}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={() =>
          searchBarRef.current?.toggleCancelButton(false)
        }
      />
    </Box>
  );
}
