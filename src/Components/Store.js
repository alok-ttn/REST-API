import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {toggleFlag, toggleStore} from '../Services/Authentication/action';

class Store extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ' ',
      input: ' ',
      flag: false,
      isModalVisible: false,
    };
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <View style={styles.headerInnerView}>
            <TouchableOpacity onPress={() => navigation.navigate('Concept')}>
              <Image
                source={require('../Assets/backArrow.png')}
                style={styles.backbutton}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.selectStoreText}>Select Store</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Image
              source={require('../Assets/search.png')}
              style={styles.searchIconImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.FlatListMainView}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            data={this.props.storeData}
            renderItem={({item}) => {
              return (
                <TouchableOpacity activeOpacity={0.5}>
                  <View style={styles.FlatListView}>
                    <Text style={styles.StoreNameView}>{item.storeName}</Text>
                    <Text style={styles.storeAddressView}>
                      {item.storeAddress} , {item.city}{' '}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.productId}
          />
        </View>
      </View>
    );
  }
  componentDidMount() {
    this.props.toggleStore(this.props.token);
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  FlatListMainView: {flex: 0.85, backgroundColor: '#fff'},
  headerView: {
    flex: 0.13,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  StoreNameView: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 15,
    fontWeight: 'bold',
  },
  storeAddressView: {
    fontSize: 16,
    fontWeight: '300',
    marginLeft: 20,
    marginTop: 10,
  },
  FlatListView: {
    height: 115,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6.32,

    elevation: 1,
    backgroundColor: '#fff',
  },
  selectStoreText: {
    fontSize: 34,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerInnerView: {flexDirection: 'row'},
  backbutton: {
    height: 40,
    width: 40,
    marginLeft: 17,
  },
  searchIconImage: {height: 30, width: 30, marginRight: 20},
});

const mapStateToProps = state => ({
  token: state.homeReducer.token,
  isStore: state.homeReducer.isStore,
  storeData: state.homeReducer.storeAcess,
});

const mapDispatchToProps = {
  toggleHomeFlag: toggleFlag,
  toggleStore: toggleStore,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Store);
