import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {toggleSearch} from '../Services/Authentication/action';
import {FlatList} from 'react-native-gesture-handler';
import config from '../config/env';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ' ',
      input: ' ',
      data: [],
      searchURL: '',
      finalApiUrl: '',
      localSearchData: '',
    };
  }
  onChangeText(input) {}
  render() {
    const array = [this.props.searchData.data];
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../Assets/back.png')}
              style={styles.backbutton}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="|Search..."
            style={styles.TextInputView}
            autoCapitalize="none"
            onChangeText={txt => this.setState({searchURL: txt})}
          />
        </View>
        <View style={styles.lowerView}>
          {this.props.isSearching === true ? (
            <View style={styles.ModalView}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                data={array}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity activeOpacity={0.5}>
                      <View style={styles.FlatItemsVIew}>
                        <Text style={styles.FlatTextView}>{item.id}</Text>
                        <Text style={styles.FlatTextView}>
                          {item.employee_name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={item => item.id}
              />
            </View>
          ) : null}
        </View>
      </View>
    );
  }
  componentDidMount() {}
  static getDerivedStateFromProps(props, state) {
    let apiConfig = 'http://dummy.restapiexample.com/api/v1/employee/';
    var lengthOfInput = state.searchURL.length;
    if (lengthOfInput > 0) {
      var newApi = apiConfig.concat(state.searchURL);
      props.toggleSearch(newApi);
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  lowerView: {
    flex: 0.87,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  FlatItemsVIew: {
    height: 100,
    justifyContent: 'center',
    borderBottomColor: '#d2d2d2',
    borderBottomWidth: 1,
  },
  FlatTextView: {
    fontSize: 17,
    fontWeight: '500',
    marginLeft: 40,
  },
  backbutton: {
    height: 35,
    width: 35,
    marginLeft: 18,
    marginBottom: 20,
  },
  headerView: {
    flex: 0.15,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.7,
    },
    shadowOpacity: 0.38,
    shadowRadius: 5.0,

    elevation: 1,
  },
  TextInputView: {
    height: 40,
    width: 300,
    fontSize: 25,
    marginLeft: 20,
    marginBottom: 20,
  },
});

const mapStateToProps = state => ({
  searchData: state.homeReducer.searchData,
  isSearching: state.homeReducer.isSearching,
});

const mapDispatchToProps = {
  toggleSearch: toggleSearch,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
