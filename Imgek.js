import React from 'react';
import {View, Text, Image, ScrollView, TextInput} from 'react-native';

const Imgek = () => {
  return (
    <ScrollView>
      <Text>Hello Kitty!!</Text>
      <View>
        <Text>How are you?</Text>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzEFyX49dQ5ZHcFb6nUtoYLqYAcJs7LZdDSxcO4JS7sikCHAHXSi3_wxs&s',
          }}
          style={{width: 150, height: 200}}
        />
      </View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue="You can type in me"
      />
    </ScrollView>
  );
};

export default Imgek;