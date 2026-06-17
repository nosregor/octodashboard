import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Head,
  UserInfo,
  Charts,
  Repos,
  Footer,
  Corner,
  Error,
  RateLimit,
} from '../components';
import GhPolyglot from 'gh-polyglot';
// import { mockUserData, mockLangData, mockRepoData } from '../utils';

const User = () => {
  const router = useRouter();
  const username = router.query.id as string | undefined;
  const [userData, setUserData] = useState(null);
  const [langData, setLangData] = useState(null);
  const [repoData, setRepoData] = useState(null);
  const [error, setError] = useState({ active: false, type: 200 });
  const [rateLimit, setRateLimit] = useState(null);

  const getUserData = () => {
    fetch(`https://api.github.com/users/${username}`)
      .then(response => {
        if (response.status === 404) {
          return setError({ active: true, type: 404 });
        }
        if (response.status === 403) {
          return setError({ active: true, type: 403 });
        }
        return response.json();
      })
      .then(json => setUserData(json))
      .catch(err => {
        setError({ active: true, type: 400 });
        console.error('Error:', err);
      });
  };

  const getLangData = () => {
    const me = new GhPolyglot(`${username}`);
    me.userStats((err: Error, stats: unknown) => {
      if (err) {
        console.error('Error:', err);
        setError({ active: true, type: 400 });
      }
      setLangData(stats);
    });
  };

  const getRepoData = () => {
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
      .then(response => {
        if (response.status === 404) {
          return setError({ active: true, type: 404 });
        }
        if (response.status === 403) {
          return setError({ active: true, type: 403 });
        }
        return response.json();
      })
      .then(json => setRepoData(json))
      .catch(err => {
        setError({ active: true, type: 200 });
        console.error('Error:', err);
      });
  };

  useEffect(() => {
    if (!username) return;

    fetch(`https://api.github.com/rate_limit`)
      .then(response => response.json())
      .then(json => {
        setRateLimit(json.resources.core);
        if (json.resources.core.remaining < 1) {
          setError({ active: true, type: 403 });
        }
      });

    getUserData();
    getLangData();
    getRepoData();

    // setUserData(mockUserData);
    // setLangData(mockLangData);
    // setRepoData(mockRepoData);
  }, [username]);

  return (
    <main className="relative">
      {rateLimit && <RateLimit rateLimit={rateLimit} />}

      {error && error.active ? (
        <Error error={error} />
      ) : (
        <>
          <Head
            title={`${
              username ? `OctoDashboard | ${username}` : 'OctoDashboard'
            }`}
          />

          <Corner />

          {userData && <UserInfo userData={userData} />}

          {langData && repoData && (
            <Charts langData={langData} repoData={repoData} />
          )}

          {repoData && <Repos repoData={repoData} />}

          <Footer />
        </>
      )}
    </main>
  );
};

export default User;
