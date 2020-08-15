import React from 'react';

import { Container, LoginContent, LogoArea, FormArea } from './styles';

import * as formik from 'formik'
import * as yup from 'yup'

import lg_logo from '../../assets/lg_logo.png'
import { useHistory } from 'react-router-dom';

const Login = () => {

  const { Formik } = formik;
  const history = useHistory()

  const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
  })

  return (
    <Container>
      <LoginContent>
        <LogoArea>
          <img src={lg_logo} alt='LG Logo' />
        </LogoArea>
        <FormArea>
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={schema}
            onSubmit={(values) => {
              console.log(values)
              history.push('/dashboard')
            }}
            initialValues={{}}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <div>
                    <input
                      type='text'
                      name='username'
                      placeholder='username'
                      value={values.username}
                      onChange={handleChange}
                      className={errors && errors.username? 'input-error' : ''}
                    />
                    <p>{errors && errors.username}</p>
                  </div>
                  <div>
                    <input
                      type='password'
                      name='password'
                      placeholder='password'
                      value={values.password}
                      onChange={handleChange}
                      className={errors && errors.password? 'input-error' : ''}
                    />
                    <p>{errors && errors.password}</p>
                  </div>
                  <button type='submit'>
                    ENTRAR
                  </button>
                </form>
              )}
          </Formik>

        </FormArea>
      </LoginContent>
    </Container>
  );
}

export default Login;