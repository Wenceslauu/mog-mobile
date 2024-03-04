import { ANIMATION_DURATION, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useState, useCallback, useRef } from "react";
import { TextInput } from "react-native";

export default function useCommentSection() {
  const [commentSectionId, setCommentSectionId] = useState<number | null>(null);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const bottomSheetTextInputRef = useRef<TextInput>(null);

  const openCommentSection = useCallback((postId: number) => {
    setCommentSectionId(postId);

    bottomSheetModalRef.current?.present();
  }, []);

  const onCloseCommentSection = useCallback(() => {
    setCommentSectionId(null);
  }, []);

  const focusCommentSectionTextInput = useCallback((postId: number) => {
    openCommentSection(postId);

    setTimeout(() => {
      bottomSheetTextInputRef.current?.focus();
    }, ANIMATION_DURATION);
  }, []);

  return {
    commentSectionId,
    bottomSheetModalRef,
    bottomSheetTextInputRef,
    openCommentSection,
    onCloseCommentSection,
    focusCommentSectionTextInput,
  };
}
