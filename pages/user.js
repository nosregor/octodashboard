import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Head, Footer, Corner, Error, RateLimit } from '../components';
import GhPolyglot from 'gh-polyglot';
import { mockUserData, mockLangData, mockRepoData } from '../utils';

const User = props => {
  const username = props.query.id;
  const [userData, setUserData] = useState(null);
  const [langData, setLangData] = useState(null);
  const [repoData, setRepoData] = useState(null);
  const [error, setError] = useState({ active: false, type: 200 });
  const [rateLimit, setRateLimit] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/rate_limit`)
      .then(response => response.json())
      .then(json => {
        setRateLimit(json.resources.core);
        if (json.resources.core.remaining < 1) {
          setError({ active: true, type: 403 });
        }
      });

    setUserData(mockUserData);
    setLangData(mockLangData);
    setRepoData(mockRepoData);
  }, []);

  return (
    <main>
      {rateLimit && <RateLimit rateLimit={rateLimit} />}

      {error && error.active ? (
        <Error error={error} />
      ) : (
        <>
          <Head title={`${username ? `OctoDashboard | ${username}` : 'OctoDashboard'}`} />

          <Corner />

          <Footer />
        </>
      )}
    </main>
  );
};

User.propTypes = {
  query: PropTypes.object
};

export default User;
