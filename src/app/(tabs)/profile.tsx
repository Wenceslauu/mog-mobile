import { Pressable } from "react-native";
import { useEffect, useRef } from "react";
import { Link, useNavigation } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Box from "@/components/Box";
import Text from "@/components/Text";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";
import Avatar from "@/components/Avatar";
import { FlashList } from "@shopify/flash-list";
import RoutineCard from "@/components/routines/RoutineCard";
import PostCard from "@/components/posts/PostCard";
import { useScrollToTop } from "@react-navigation/native";
import useCommentSection from "@/hooks/useCommentSection";
import CommentsBottomSheetModal from "@/components/posts/CommentsBottomSheetModal";
import { createRandomProfile } from "@/helpers/mocks/User";

const mockedProfile = createRandomProfile();

export default function ProfileTab() {
  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

  const postsListRef = useRef(null);

  // Scroll to top when the active tab is tapped
  useScrollToTop(postsListRef);

  const {
    commentSectionId,
    bottomSheetModalRef,
    bottomSheetTextInputRef,
    openCommentSection,
    onCloseCommentSection,
    focusCommentSectionTextInput,
  } = useCommentSection();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Link href="/settings" asChild>
          <Pressable>
            {({ pressed }) => (
              <Ionicons
                name="settings"
                size={25}
                color={colors.onSurfaceContainer}
                style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      ),
      headerRight: () => (
        <Box flexDirection="row">
          <Link href="/edit-profile" asChild>
            <Pressable>
              {({ pressed }) => (
                <MaterialCommunityIcons
                  name="account-edit-outline"
                  size={29}
                  color={colors.onSurfaceContainer}
                  style={{ marginRight: 11, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
          <Link href="/share-profile" asChild>
            <Pressable>
              {({ pressed }) => (
                <Ionicons
                  name="share-social"
                  size={25}
                  color={colors.onSurfaceContainer}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        </Box>
      ),
    });
  }, [navigation, colors]);

  return (
    <>
      <Box flex={1} gap="m" backgroundColor="surface">
        <FlashList
          ref={postsListRef}
          keyboardDismissMode="on-drag"
          data={mockedProfile.posts}
          estimatedItemSize={100}
          ListHeaderComponent={() => (
            <Box gap="m">
              <Box
                flexDirection="row"
                gap="l"
                paddingHorizontal="m"
                alignItems="center"
              >
                <Avatar size="l" source={mockedProfile.picture} />
                <Box gap="s">
                  <Text variant="headline" color="onSurface">
                    {mockedProfile.name}
                  </Text>
                  <Box flexDirection="row" justifyContent="space-around">
                    <Box alignItems="center">
                      <Text variant="label" color="onSurface">
                        workouts
                      </Text>
                      <Text variant="body" color="onSurface">
                        {mockedProfile.workouts}
                      </Text>
                    </Box>
                    <Box alignItems="center">
                      <Text variant="label" color="onSurface">
                        followers
                      </Text>
                      <Text variant="body" color="onSurface">
                        {mockedProfile.followers}
                      </Text>
                    </Box>
                    <Box alignItems="center">
                      <Text variant="label" color="onSurface">
                        following
                      </Text>
                      <Text variant="body" color="onSurface">
                        {mockedProfile.following}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box gap="s">
                <Text
                  variant="headline"
                  color="onSurface"
                  paddingHorizontal="m"
                >
                  Rotinas
                </Text>
                <FlashList
                  horizontal={true}
                  keyboardDismissMode="on-drag"
                  data={mockedProfile.routines}
                  estimatedItemSize={300}
                  renderItem={({ item }) => (
                    <RoutineCard routine={item} isListedHorizontally />
                  )}
                  contentContainerStyle={{ paddingHorizontal: 16 }}
                  ItemSeparatorComponent={() => <Box width={20} />}
                  showsHorizontalScrollIndicator={false}
                />
              </Box>
              <Text variant="headline" color="onSurface" paddingHorizontal="m">
                Posts
              </Text>
            </Box>
          )}
          ListHeaderComponentStyle={{ paddingBottom: 8 }}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              openCommentSection={() => openCommentSection(item.id)}
              focusCommentSectionTextInput={() =>
                focusCommentSectionTextInput(item.id)
              }
            />
          )}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 40 }}
          ItemSeparatorComponent={() => <Box height={20} />}
          showsVerticalScrollIndicator={false}
        />
      </Box>
      <CommentsBottomSheetModal
        commentSectionId={commentSectionId}
        onCloseCommentSection={onCloseCommentSection}
        ref={{ bottomSheetModalRef, bottomSheetTextInputRef } as any}
      />
    </>
  );
}
