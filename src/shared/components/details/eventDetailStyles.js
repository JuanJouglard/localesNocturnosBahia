import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  alignCenter: {
    alignItems: 'center',
  },
  assistance: {
    flex: 2,
  },
  background: {
    height: '100%',
    paddingTop: 20,
  },
  border: {
    borderColor: 'black',
    borderWidth: 5,
  },
  container: {
    height: '100%',
  },
  dates: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  disabled: {
    opacity: 0.5,
  },
  greyBackground: {
    backgroundColor: '#e5e2e2',
    borderRadius: 5,
    padding: 8,
  },
  info: {
    flex: 1,
  },
  mediumFont: {
    fontSize: 14,
  },
  people: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  placeName: {
    textAlign: 'center',
  },
  quantity: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  quantityText: {
    fontFamily: 'Roboto-Thin',
    fontSize: 42,
  },
  registerButton: {
    alignSelf: 'center',
    backgroundColor: '#3378e0',
    borderRadius: 8,
    paddingBottom: 16,
    paddingLeft: 64,
    paddingRight: 64,
    paddingTop: 16,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
  },
  robotoRegular: {
    fontFamily: 'Roboto-Regular',
  },
  separator: {
    borderColor: 'black',
    borderWidth: 0.55,
    margin: 15,
    marginBottom: 0,
    marginTop: 0,
  },
  title: {
    fontFamily: 'Roboto-Light',
    fontSize: 32,
    marginBottom: 15,
    textAlign: 'center',
  },
  typeImage: {
    opacity: 0.1,
    resizeMode: 'contain',
  },
});
