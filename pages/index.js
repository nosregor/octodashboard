import React, { useState } from "react";
import Router from "next/router";
import Octicon, { MarkGithub } from "@primer/octicons-react";
import { Head } from "../components";

import styled from "styled-components";
import { theme, mixins } from "../style";

const { colors, fonts } = theme;

const StyledContainer = styled.div`
  ${mixins.flexCenter};
  background-color: ${colors.black};
  background-image: linear-gradient(
    ${colors.black} 0%,
    ${colors.darkGrey} 100%
  );
  color: ${colors.offWhite};
  height: 100vh;

  form {
    background-color: transparent;
    border-radius: 5px;
    // padding: 2rem;
    margin-bottom: 20vh;
    max-width: 600px;
    text-align: center;
    svg {
      color: ${colors.blue};
    }
    label {
      display: block;
      font-size: 2.5rem;
      font-weight: 500;
      margin: 2rem;
    }
    input {
      background-color: #26303c;
      outline: 0;
      border: 0;
      border-radius: 0.25rem;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      padding: 1rem;
      color: ${colors.lightblue};
      font-family: ${fonts.mono};
      font-size: 2rem;
      font-weight: 400;
      text-align: center;
    }
    p {
      color: ${colors.lightblue};
      font-family: ${fonts.mono};
      font-size: 1rem;
      font-weight: 400;
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
  const [username, setUsername] = useState("");
  const handleChange = event => setUsername(event.target.value);

  return (
    <main>
      <Head title="OctoDashboard" />

      <StyledContainer>
        <form
          onSubmit={event => {
            event.preventDefault();
            Router.push({
              pathname: "/user",
              query: { id: username }
            });
          }}
        >
          <Octicon icon={MarkGithub} size="large" />
          <label htmlFor="username">OctoDashboard</label>
          <p>Enter a GitHub username</p>
          <input
            name="username"
            type="text"
            onChange={handleChange}
            placeholder="ex. 'nosregor'"
          />
        </form>
      </StyledContainer>
    </main>
  );
};

export default Home;
