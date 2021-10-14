import React from "react";
import { View, Image, Dimensions, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTodo } from "../../hooks/useTodo";
import { BASE_URL } from "../../services/api";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";

const { width, height } = Dimensions.get("screen");

const FullImage = () => {
  const safeArea = useSafeAreaInsets();
  const context = useTodo();

  const handleCloseImage = () => {
    context.setCurrentImage("");
    context.setFullImageIsOpen(false);
  };

  return context.fullImageisOpen ? (
    <View
      style={{
        width,
        height,
        position: "absolute",
        zIndex: context.fullImageisOpen ? 1000 : -30,
        paddingTop: safeArea.top,
        backgroundColor: "#13131A",
      }}
    >
      <TouchableOpacity
        onPress={() => handleCloseImage()}
        style={{
          marginLeft: ms(15),
        }}
      >
        <AntDesign name="close" size={ms(24)} color="#fff" />
      </TouchableOpacity>
      {Boolean(context.currentImage) && (
        <Image
          style={{
            width,
            height: height * 0.8,
          }}
          resizeMode="contain"
          resizeMethod="resize"
          source={{ uri: `${BASE_URL}/uploads/${context.currentImage}` }}
        />
      )}
    </View>
  ) : null;
};

export { FullImage };
