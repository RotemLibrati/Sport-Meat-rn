import React, { useCallback, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SportMeetNavigator from '../navigation/SportMeetNavigator';
import EnterNavigator from '../navigation/EnterNavigator';
import SetTokenProvider from '../context/SetToken';
import { SetToken } from '../context/SetToken';

const SportMeet = () => {
    const { login, loginHandler } = useContext(SetToken);
//   const temp = useCallback(() => {
//       //loginHandler(true);
//   },[login]);
  return (
      login ? <SportMeetNavigator /> :
        <EnterNavigator />
  );
}

export default SportMeet
