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
} from '../../components';
import {
  UserInfoSkeleton,
  ChartsSkeleton,
  ReposSkeleton,
} from '../../components/Skeleton';
import GhPolyglot from 'gh-polyglot';
import type {
  GitHubUser,
  GitHubRepo,
  LangStat,
  RateLimitCore,
  AppError,
} from '../../types/github';
import { mockUserData, mockLangData, mockRepoData } from '../../utils';

const User = () => {
  const router = useRouter();
  const username = router.query.username as string | undefined;

  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [langData, setLangData] = useState<LangStat[] | null>(null);
  const [repoData, setRepoData] = useState<GitHubRepo[] | null>(null);
  const [error, setError] = useState<AppError>({ active: false, type: 200 });
  const [rateLimit, setRateLimit] = useState<RateLimitCore | null>(null);

  const getUserData = () => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (response.status === 404)
          return setError({ active: true, type: 404 });
        if (response.status === 403)
          return setError({ active: true, type: 403 });
        return response.json();
      })
      .then((json: GitHubUser) => setUserData(json))
      .catch((err) => {
        setError({ active: true, type: 400 });
        console.error('Error:', err);
      });
  };

  const getLangData = () => {
    const me = new GhPolyglot(`${username}`);
    me.userStats((err: Error, stats: LangStat[]) => {
      if (err) {
        console.error('Error:', err);
        setError({ active: true, type: 400 });
      }
      setLangData(stats);
    });
  };

  const getRepoData = () => {
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
      .then((response) => {
        if (response.status === 404)
          return setError({ active: true, type: 404 });
        if (response.status === 403)
          return setError({ active: true, type: 403 });
        return response.json();
      })
      .then((json: GitHubRepo[]) => setRepoData(json))
      .catch((err) => {
        setError({ active: true, type: 200 });
        console.error('Error:', err);
      });
  };

  useEffect(() => {
    if (!username) return;

    fetch('https://api.github.com/rate_limit')
      .then((response) => response.json())
      .then((json) => {
        const core: RateLimitCore = json.resources.core;
        setRateLimit(core);
        if (core.remaining < 1) setError({ active: true, type: 403 });
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
      {rateLimit && (!error.active || error.type === 403) && (
        <RateLimit rateLimit={rateLimit} />
      )}

      {error && error.active ? (
        <Error error={error} username={username} />
      ) : (
        <>
          <Head
            title={username ? `OctoDashboard | ${username}` : 'OctoDashboard'}
          />

          <Corner />

          {userData ? <UserInfo userData={userData} /> : <UserInfoSkeleton />}

          {langData && repoData ? (
            <Charts langData={langData} repoData={repoData} />
          ) : (
            <ChartsSkeleton />
          )}

          {repoData ? <Repos repoData={repoData} /> : <ReposSkeleton />}

          <Footer />
        </>
      )}
    </main>
  );
};

export default User;
