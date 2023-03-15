import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import theme from './theme';
import Signup from './Screens/Signup';
import Home from './Screens/Home';
import Login from './Screens/Login';
import HomePage from './Screens/Student/HomePage';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {getUserInfoAction} from './redux/user/actions';
import {useEffect} from 'react';
import Loading from './Screens/Loading';
import store from './redux/index';
import HomeScreen from './Screens/Teacher/HomeScreen';
import Course from './Screens/Teacher/Course';
import EditCourse from './Screens/Teacher/EditCourse';
import UserProfile from './Screens/Student/UserProfile';

const Stack = createNativeStackNavigator();

const noAuthComponents = [
  {name: 'Home', component: Home},
  {name: 'Signup', component: Signup},
  {name: 'Login', component: Login},
];

const teacherComponents = [
  {name: 'HomePage', component: HomeScreen},
  {name: 'Course', component: Course},
  {name: 'Edit Course', component: EditCourse},
];
const studentComponents = [
  {name: 'HomePage', component: HomePage},
  {name: 'UserProfile', component: UserProfile},
];

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <ComponentProvider />
      </Provider>
    </NativeBaseProvider>
  );
}

const ComponentProvider = () => {
  const dispatch = useDispatch();
  const {loading, user, role} = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getUserInfoAction());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user
          ? role === 'ROLE_TEACHER'
            ? teacherComponents.map((component, key) => (
                <Stack.Screen
                  key={key}
                  name={component.name}
                  component={component.component}
                  options={{headerShown: false}}
                />
              ))
            : studentComponents.map((component, key) => (
                <Stack.Screen
                  key={key}
                  name={component.name}
                  component={component.component}
                  options={{headerShown: false}}
                />
              ))
          : noAuthComponents.map((component, key) => (
              <Stack.Screen
                key={key}
                name={component.name}
                component={component.component}
                options={{headerShown: false}}
              />
            ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
