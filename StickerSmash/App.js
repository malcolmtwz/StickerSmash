import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import Button from './components/Button';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import ImageViewer from './components/ImageViewer';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';

const bgImage = require('./assets/background-image.png');

export default function App() {

  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  }

  const onSaveImageAsync = async() => {
    
  };

  const pickImageAsync = async () => {
    //get the image from launchImageLibraryAsync() which returns an object that contains info about the image.
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if(!result.canceled){
      setSelectedImage(result.assets[0].uri); //gets the specific uri of the image from the object.
      setShowAppOptions(true);
      // console.log(result);
    } else {
      alert('You did not select any image.');
    };

  }
  return (
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <ImageViewer 
          imageSource={bgImage} 
          selectedImage= {selectedImage}
        />
        {pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> : null}

      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon='refresh' label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : ( 
        <View style={styles.footerContainer}>
          <Button theme = 'primary' label="Choose a photo" onPress={pickImageAsync}/>
          <Button label="Use this photo" onPress = { () => setShowAppOptions(true)}/>
        </View>
      )}

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer:{
    flex: 1,
    paddingTop: 58,
  },
  footerContainer:{
    flex: 1/3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  }

});
