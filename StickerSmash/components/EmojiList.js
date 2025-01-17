import { useState } from "react";
import { StyleSheet, FlatList, Image, Platform, Pressable } from "react-native";

export default function EmojiList({ onSelect, onCloseModal }) {
    const [emoji] = useState ([
        require('../assets/emojis/emoji1.png'),
        require('../assets/emojis/emoji2.png'),
        require('../assets/emojis/emoji3.png'),
        require('../assets/emojis/emoji4.png'),
    ]);

    return(
        <FlatList
            horizontal
            showsHorizontalScrollIndicator = {Platform.OS === 'web'}
            data={emoji}
            contentContainerStyle = {StyleSheet.listContainer}
            renderItem={({item,index}) => (
                <Pressable
                    onPress={() =>{
                        onSelect(item);
                        onCloseModal();
                    }}>
                    <Image source={item} key={index} style={styles.image} />
                </Pressable>
            )}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    image: {
      width: 100,
      height: 100,
      marginRight: 20,
    },
  });