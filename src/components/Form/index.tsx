import { ArrowLeft } from "phosphor-react-native";
import React, { useState } from "react";
import { View, TextInput, Image, Text, TouchableOpacity } from "react-native";
import { theme } from "../../theme";
import { FeedbackType } from "../../components/Widget";

import { styles } from "./styles";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { ScreenshotButton } from "../ScreenshotButton";
import { Button } from "../Button";
import { Copyright } from "../Copyright";
import { captureScreen } from "react-native-view-shot";

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled(): void;
  onFeedbackSent(): void;
}

export function Form({
  feedbackType,
  onFeedbackCanceled,
  onFeedbackSent,
}: Props) {
  const [screenShot, setScreenShot] = useState<string | null>(null);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const handleScreenshot = () => {
    captureScreen({
      format: "jpg",
      quality: 0.8,
    })
      .then((uri) => setScreenShot(uri))
      .catch((err) => console.error("Oops, something went wron: ", err));
  };

  const handleScreenshotRemove = () => setScreenShot(null);

  const handleSendFeedback = () => {
    onFeedbackSent();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>

      <TextInput
        style={styles.input}
        multiline
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          screenshot={screenShot}
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
        />
        <Button onPress={handleSendFeedback} isLoading={false} />
      </View>

      <Copyright />
    </View>
  );
}
