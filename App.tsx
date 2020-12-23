import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import AppHeader from './components/appbar';
import CustomButton from './components/button';
import dictionary from './databases/dictionary';

export interface State {
  textEntered: string,
  dictionaryWordJson: any,
  dictionaryResultRenderingDetailList: any[][],
  wordPresentInDictionary: boolean
}

export interface Props {

}

export default class App extends React.Component<Props, State> {

  constructor(state: State) {
    super(state);

    this.state = {
      textEntered: '',
      dictionaryWordJson: {},
      dictionaryResultRenderingDetailList: [['Word: ', 'word'], ['Lexical Category: ', 'lexicalCategory'], ['Meaning: ', 'definition']],
      wordPresentInDictionary: false
    }
  }

  onTextInputFieldChanged = (text: string) => {
    this.setState({
      textEntered: text,
    });
  }

  fetchResponse = async () => {
    let textEntered: string = this.state.textEntered;

    if (textEntered == null || textEntered.length == 0) {
      alert('Please Enter a word to be search');
      return null;
    }

    let text: string = this.state.textEntered.toLowerCase().trim().replaceAll(" ", "");

    let dictionaryResult: object = dictionary[text];

    if (dictionaryResult == null) {
      alert('This word doesn\'t exist in our dictionary yet');
      this.setState({
        wordPresentInDictionary: false
      })
      return null;
    } else {
      this.setState({
        dictionaryWordJson: dictionaryResult,
        wordPresentInDictionary: true
      });

      return dictionaryResult;
    }

  }

  render() {
    return (
      <View>
        <AppHeader title='Dictionary App' />
        <View style={styles.textInputContainer}>
          <TextInput style={styles.textInput} onChangeText={this.onTextInputFieldChanged} value={this.state.textEntered} />
        </View>
        <View>
          <CustomButton onPress={() => this.fetchResponse} color="red" title="Search" marginTop={20} marginLeft={Dimensions.get('window').width / 2 - (100 / 2)} width={100} />
        </View>
        <View style={styles.dictionaryResultSurrounding}>
          <View >
            {this.state.wordPresentInDictionary ? this.state.dictionaryResultRenderingDetailList.map((renderDetails: Array<string>) => (
              <Text style={styles.dictionaryResultText}><Text style={styles.dictionaryResultCategories}>{renderDetails[0]} </Text><Text>{this.state.dictionaryWordJson[renderDetails[1]]}</Text></Text>
            )):<View></View>}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    paddingLeft: 10,
    backgroundColor: "#ededed",
    borderWidth: 4,
    borderColor: 'black',
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 12,
    borderRadius: Dimensions.get('window').height / 12,
    fontSize: 20
  },
  textInputContainer: {
    paddingLeft: (Dimensions.get('window').width - Dimensions.get('window').width / 2) / 2,
    paddingTop: (Dimensions.get('window').height - Dimensions.get('window').height / 12) / 10
  },
  dictionaryResultSurrounding: {
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 60
  },
  dictionaryResultCategories: {
    color: "orange",
    fontSize: 20,
    fontWeight: "bold"
  },
  dictionaryResultText: {
    fontSize: 20,
  }
});
