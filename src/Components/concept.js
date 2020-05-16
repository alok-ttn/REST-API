/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {
  toggleConcept,
  toggleCreate,
  toggleUpdate,
  toggleDelete,
  resetAll,
} from '../Services/Authentication/action';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

class Concept extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ' ',
      record: '',
      data: [],
      phone: '',
      name: '',
      nameValidate: false,
      username: '',
      usernameValidate: false,
      email: '',
      isModalVisible: false,
    };
  }
  validate(text, type) {
    var userNameRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    var nameRegex = /^[a-zA-Z0-9!@#$%^&*]{3,15}$/;
    if (type === 'name') {
      if (nameRegex.test(text)) {
        this.setState({nameValidate: true});
        this.setState({name: text});
      } else {
        this.setState({nameValidate: false});
      }
    } else if (type === 'username') {
      if (userNameRegex.test(text)) {
        this.setState({usernameValidate: true});
        this.setState({username: text});
      } else {
        this.setState({usernameValidate: false});
      }
    }
  }
  toggleModal = value => {
    this.setState({isModalVisible: !this.state.isModalVisible});
    this.props.toggleConcept();
    this.setState({record: value});
    // console.warn(value);
  };
  render() {
    // console.warn(this.state.record);
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <View>
            <Text style={styles.selectConceptText}>Select Concept</Text>
          </View>
          <TouchableOpacity onPress={() => this.toggleModal('1')}>
            <Text style={{fontSize: 15, color: 'blue', alignSelf: 'center'}}>
              ADD{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Search')}
            // onPress={() => this._logout()}
          >
            <Image
              source={require('../Assets/search.png')}
              style={styles.searchIconImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.FlatListMainView}>
          {this.props.isFailed === 0 ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              scrollEnabled={true}
              data={this.props.conceptData}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity activeOpacity={1}>
                    <View
                      style={{
                        height: 50,
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={
                          (styles.FlatListView,
                          {flex: 0.7, justifyContent: 'center', marginLeft: 20})
                        }>
                        <Text style={styles.FlatListTextView}>
                          {item.username && item.username}{' '}
                        </Text>
                        <Text style={styles.FlatListTextView}>
                          {item.phone_number && item.phone_number}
                        </Text>
                      </View>
                      <View style={styles.FlatListView}>
                        <TouchableOpacity
                          onPress={() => this.toggleModal(item)}>
                          <Text
                            style={{
                              fontSize: 20,
                              color: 'green',
                              fontWeight: '500',
                              marginRight: 10,
                            }}>
                            Edit{' '}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.props.toggleDelete(item._id)}>
                          <View style={{justifyContent: 'flex-end'}}>
                            <Text
                              style={{
                                fontSize: 20,
                                color: 'red',
                                fontWeight: '500',
                              }}>
                              {' '}
                              Delete
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View />
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item._id}
            />
          ) : (
            Alert.alert('Error', 'API NOT RESPONDING', [
              {
                text: 'Try Again',
                onPress: () => this.props.resetAll(),
              },
            ])
          )}
        </View>
        <Modal
          isVisible={this.state.isModalVisible}
          hasBackdrop={true}
          onBackdropPress={() => this.toggleModal()}>
          <View style={{flex: 0.4, backgroundColor: 'white'}}>
            <View style={styles.TextInputView}>
              <Text>username: </Text>
              <TextInput
                style={
                  this.state.usernameValidate
                    ? styles.textInputBox
                    : styles.textInputBoxErorr
                }
                defaultValue={
                  this.state.record ? this.state.record.username : ''
                }
                onChangeText={text => {
                  this.validate(text, 'username');
                }}
              />
            </View>
            <View style={styles.TextInputView}>
              <Text>email: </Text>
              <TextInput
                style={styles.textInputBox}
                defaultValue={this.state.record ? this.state.record.email : ''}
                onChangeText={text => {
                  this.setState({email: text});
                }}
              />
            </View>
            <View style={styles.TextInputView}>
              <Text>name: </Text>
              <TextInput
                style={
                  this.state.nameValidate
                    ? styles.textInputBox
                    : styles.textInputBoxErorr
                }
                defaultValue={this.state.record ? this.state.record.name : ''}
                onChangeText={text => {
                  this.validate(text, 'name');
                }}
              />
            </View>
            <View style={styles.TextInputView}>
              <Text>phone number: </Text>
              <TextInput
                style={styles.textInputBox}
                defaultValue={
                  this.state.record ? this.state.record.phone_number : ''
                }
                onChangeText={text => {
                  this.setState({phone: text});
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                marginTop: 10,
                marginLeft: 10,
                justifyContent: 'center',
                marginRight: 10,
              }}>
              <TouchableOpacity onPress={() => this.submit()}>
                <Text style={{fontSize: 30, fontWeight: '600', color: 'green'}}>
                  SUBMIT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  submit() {
    const {record} = this.state;
    if (this.state.record === '1') {
      this.props.toggleCreate(
        this.state.username,
        this.state.email,
        this.state.name,
        this.state.phone,
      );
    } else {
      this.props.toggleUpdate(
        this.state.username,
        this.state.email,
        this.state.name,
        this.state.phone,
        record._id,
      );
    }
  }
  componentDidMount() {
    this.props.toggleConcept();
    // this._storeData();
  }
  // static getDerivedStateFromProps(props, state) {
  //   props.toggleConcept();
  // }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  headerView: {
    flex: 0.13,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  selectConceptText: {
    fontSize: 34,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 27,
  },
  FlatListTextView: {
    fontSize: 14,
    fontWeight: '600',
  },
  FlatListView: {
    marginTop: 10,
    marginLeft: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TextInputView: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    justifyContent: 'space-between',
    marginRight: 10,
  },
  textInputBox: {
    width: 200,
    height: 30,
    borderWidth: 1,
    borderColor: '#0f0',
  },
  textInputBoxErorr: {
    width: 200,
    height: 30,
    borderWidth: 1,
    borderColor: '#f00',
  },
  FlatListMainView: {flex: 0.85, backgroundColor: '#fff'},
  searchIconImage: {height: 30, width: 30, marginRight: 20},
});
const mapStateToProps = state => ({
  conceptData: state.homeReducer.conceptData,
  isCreated: state.homeReducer.isCreated,
  isUpdated: state.homeReducer.isUpdated,
  isDeleted: state.homeReducer.isDeleted,
  isFailed: state.homeReducer.isFailed,
});

const mapDispatchToProps = {
  toggleConcept: toggleConcept,
  toggleCreate: toggleCreate,
  toggleUpdate: toggleUpdate,
  toggleDelete: toggleDelete,
  resetAll: resetAll,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Concept);
