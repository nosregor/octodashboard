import React, { useState } from 'react';
import Router from 'next/router';
import Octicon, { MarkGithub, Search } from '@primer/octicons-react';
import { Head, Footer } from '../components';

import styled from 'styled-components';
import { theme, mixins } from '../style';

const { colors, fonts } = theme;

const StyledContainer = styled.div`
  ${mixins.flexCenter};
  background-color: ${colors.white};
  // background-image: linear-gradient(${colors.black} 0%, ${colors.darkGrey} 100%);
  color: ${colors.solstice};
  height: 100vh;

  form {
    background-color: transparent;
    border-radius: 5px;
    padding: 2rem;
    margin-bottom: 20vh;
    max-width: 600px;
    text-align: center;
    svg {
      color: ${colors.nebula};
    }
    label {
      display: block;
      font-size: 2.5rem;
      font-weight: 500;
      margin: 2rem;
    }
    input {
      background-color: ${colors.moon};
      outline: 0;
      border: 0;
      border-radius: 0.25rem;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      padding: 1.4rem;
      // color: ${colors.lightblue};
      color: ${colors.solstice};
      font-family: ${fonts.mono};
      font-size: 1.4rem;
      font-weight: 400;
      text-align: left;
    }

    .submit {
      ${mixins.blueButton};
      margin-top: 3rem;
      filter: none;
    }
  }
`;

// using react hooks, refer to: https://flaviocopes.com/react-hooks/
const Home = () => {
  const [username, setUsername] = useState('');
  const handleChange = event => setUsername(event.target.value);

  return (
    <main>
      <Head title="OctoDashboard" />

      <StyledContainer>
        <form
          onSubmit={event => {
            event.preventDefault();
            Router.push({
              pathname: '/user',
              query: { id: username }
            });
          }}
        >
          <Octicon icon={MarkGithub} size="large" />
          <label htmlFor="username">OctoDashboard</label>
          <input name="username" type="text" onChange={handleChange} placeholder="Enter a github user..." />
        </form>
      </StyledContainer>
    </main>
  );
};

export default Home;
