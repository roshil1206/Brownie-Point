import React, {useState} from 'react';
import Wrapper from '../wrapper/Wrapper';
import {InputType1} from '../components/Commons/Input';
import {
  Stack,
  Heading,
  Button,
  Center,
  Spinner,
  FormControl,
  WarningOutlineIcon,
} from 'native-base';
import {validateEmail} from '../helpers/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from '../config/Axios';
import {useDispatch} from 'react-redux';
import {getUserInfoAction} from '../redux/user/actions';

const inputFields = [
  {placeholder: 'Email ID', type: 'text', name: 'emailId'},
  {
    placeholder: 'Password',
    type: 'password',
    secureTextEntry: true,
    name: 'password',
  },
];

const Login = ({navigation}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    emailId: '',
    password: '',
  });
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({
    emailId: '',
    password: '',
  });
  const [alert, setAlert] = useState('');

  const isValidated = () => {
    const errorObj = {
      emailId: '',
      password: '',
    };
    let isValid = true;

    if (!validateEmail(formData.emailId)) {
      isValid = false;
      errorObj.emailId = 'Please enter valid email address';
    }

    if (formData.password.length < 6) {
      isValid = false;
      errorObj.password = 'Please enter valid password';
    }

    setErrors(errorObj);
    return isValid;
  };
  const handleTextChange = (name, value) => {
    setFormData(current => ({...current, [name]: value}));
  };
  const handleSubmit = () => {
    if (isValidated()) {
      setLoader(true);
      Axios.post('/auth/authenticate', {
        email: formData.emailId,
        password: formData.password,
      })
        .then(async res => {
          if (res.data) {
            await AsyncStorage.setItem('token', res.data.token);
            dispatch(getUserInfoAction());
            // navigation.navigate('HomePage');
          }
        })
        .catch(e => {
          setAlert('Unable to Login the user.');
          console.log(JSON.stringify(e), e);
        })
        .finally(() => {
          setLoader(false);
        });
    }
  };
  return (
    <Wrapper>
      <Center height="100%">
        <Heading
          size="lg"
          fontSize="36"
          color="secondary.300"
          textAlign="center"
          mt="5"
          mb="5">
          Login
        </Heading>

        <Stack p="4" space={3} width="100%">
          {inputFields.map((inputField, key) => (
            <Stack space={2} key={key}>
              <FormControl isInvalid={errors[inputField.name]}>
                <InputType1
                  {...inputField}
                  onChangeText={value =>
                    handleTextChange(inputField.name, value)
                  }
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {errors[inputField.name]}
                </FormControl.ErrorMessage>
              </FormControl>
            </Stack>
          ))}

          <Stack space={2}>
            {loader ? (
              <Spinner color="secondary.500" size="lg" />
            ) : (
              <Button
                size="lg"
                background="secondary.400"
                onPress={() => handleSubmit()}
                _pressed={{backgroundColor: 'secondary.500'}}>
                login
              </Button>
            )}
          </Stack>
        </Stack>
      </Center>
    </Wrapper>
  );
};
export default Login;
