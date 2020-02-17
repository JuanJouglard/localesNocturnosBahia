import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  assistance: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  assistanceButton: {
    alignSelf: 'center',
    borderRadius: 8,
    paddingBottom: 16,
    paddingLeft: 64,
    paddingRight: 64,
    paddingTop: 16,
  },
  assistanceButtonText: {
    color: 'white',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ff5454',
  },
  disabled: {
    opacity: 0.5,
  },
  marginBottom: {
    marginBottom: 5,
  },
  registerButton: {
    backgroundColor: '#3378e0',
  },
  robotoRegular: {
    fontFamily: 'Roboto-Regular',
  },
  timePicker: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  timeStamps: {
    alignItems: 'center',
    flex: 1,
  },
  titleText: {
    fontFamily: 'Roboto-Light',
    fontSize: 32,
    marginBottom: 15,
    textAlign: 'center',
  },
});
