import React, { useState, useEffect } from 'react';

import { Container, LoginContent, LogoArea, FormArea, Language } from './styles';

import * as formik from 'formik'
import * as yup from 'yup'

import lg_logo from '../../assets/lg_logo.png'
import Flag from 'react-flagkit' 
import { useHistory } from 'react-router-dom';

const Login = () => {

  const { Formik } = formik;
  const history = useHistory()

  /* LANGUAGE CONTROL */
  const languageStorage = localStorage.getItem('@lg/language') || 'en'
  const [language, setLanguage] = useState(languageStorage)
  const [english, setEnglish] = useState(language === 'en')

  useEffect(() => {
    localStorage.setItem('@lg/language', language)
    setEnglish(language === 'en')
  }, [language])

  /* FORM SCHEMA */
  const schema = yup.object({
    username: yup.string().required(`${english? 'username is a required field' : 'usuário é obrigatório'}`),
    password: yup.string().required(`${english? 'password is a required field' : 'senha é obrigatória'}`)
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
              history.push('/devices')
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
                      placeholder={english? 'username' : 'usuário'}
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
                      placeholder={english? 'password' : 'senha'}
                      value={values.password}
                      onChange={handleChange}
                      className={errors && errors.password? 'input-error' : ''}
                    />
                    <p>{errors && errors.password}</p>
                  </div>
                  <button type='submit'>
                    {english? 'LOGIN' : 'ENTRAR'}
                  </button>
                </form>
              )}
          </Formik>

        </FormArea>

        <Language language={language}>
          <button onClick={() => setLanguage('en')}>
            <Flag country="US" />
          </button>
          <button onClick={() => setLanguage('pt')}>
            <Flag country="BR" />
          </button>
        </Language>
      </LoginContent>
    </Container>
  );
}

export default Login;