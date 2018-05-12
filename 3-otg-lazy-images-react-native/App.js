import React from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import Modal from "react-native-modal";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: null, 
      modalVisible: false, 
      itemTitle: "Default Title", 
      itemUrl: "http://placehold.it/150/92c952" 
    };
  }

  componentDidMount = () => this.getDataFromApi();

  onPress = item => this.setState({ modalVisible: true, itemTitle: item.title, itemUrl: item.url });

  getDataFromApi = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/photos");
    const json = await res.json();
    this.setState({ data: json });
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal 
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.setState({ modalVisible: false })}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{this.state.itemTitle}</Text>
            <TouchableHighlight onPress={() => this.setState({modalVisible: false})}>
              <Image
                style={styles.fullScreenImage}
                source={{ uri: this.state.itemUrl}}
              />
            </TouchableHighlight>
          </View>
        </Modal>
        <FlatList
          data={this.state.data}
          keyExtractor={item => item.id.toString()}
          initialNumToRender={5}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableHighlight onPress={() => this.onPress(item)}>
                <Image
                  style={styles.image}
                  source={{ uri: item.thumbnailUrl }}
                />
              </TouchableHighlight>
            </View>
          )}
        />
      </View>
    );
  }
}

const white = "#fff";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    backgroundColor: white,
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    margin: 40,
    fontWeight: "900",
    fontSize: 18
  },
  image: {
    width: 300, 
    height: 300
  },
  modalContainer: {
    flex: 1
  },
  modalTitle: {
    color: white,
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20
  },
  fullScreenImage: {
    width: 700, 
    height: 700
  }
});
