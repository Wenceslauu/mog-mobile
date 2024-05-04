import { useRef, useState } from "react";
import { Animated, Keyboard } from "react-native";

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenAnimated = useRef(new Animated.Value(0)).current;

  const toggleModal = () => {
    if (isOpen) {
      Keyboard.dismiss();
      Animated.timing(isOpenAnimated, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setIsOpen(false);
      });
    } else {
      setIsOpen(true);

      Animated.timing(isOpenAnimated, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  return { isOpen, isOpenAnimated, toggleModal };
}
