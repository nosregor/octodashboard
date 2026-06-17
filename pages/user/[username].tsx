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
import { UserInfoSkeleton, ChartsSkeleton, ReposSkeleton } from '../../components/Skeleton';
import GhPolyglot from 'gh-polyglot';
import type { GitHubUser, GitHubRepo, LangStat, RateLimitCore, AppError } from '../../types/github';
import {mockUserData, mockLangData, mockRepoData} from '../../utils';

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
      .then(response => {
        if (response.status === 404) return setError({ active: true, type: 404 });
        if (response.status === 403) return setError({ active: true, type: 403 });
        return response.json();
      })
      .then((json: GitHubUser) => setUserData(json))
      .catch(err => {
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
      .then(response => {
        if (response.status === 404) return setError({ active: true, type: 404 });
        if (response.status === 403) return setError({ active: true, type: 403 });
        return response.json();
      })
      .then((json: GitHubRepo[]) => setRepoData(json))
      .catch(err => {
        setError({ active: true, type: 200 });
        console.error('Error:', err);
      });
  };

  useEffect(() => {
    if (!username) return;

    fetch('https://api.github.com/rate_limit')
      .then(response => response.json())
      .then(json => {
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
      {rateLimit && !error.active && <RateLimit rateLimit={rateLimit} />}

      {error && error.active ? (
        <Error error={error} username={username} />
      ) : (
        <>
          <Head title={username ? `OctoDashboard | ${username}` : 'OctoDashboard'} />

          <Corner />

          {userData ? (
            <UserInfo userData={userData} />
          ) : (
            <UserInfoSkeleton />
          )}

          {langData && repoData ? (
            <Charts langData={langData} repoData={repoData} />
          ) : (
            <ChartsSkeleton />
          )}

          <div className="print:hidden">
            {repoData ? (
              <Repos repoData={repoData} />
            ) : (
              <ReposSkeleton />
            )}
          </div>

          <Footer />

          {userData && (
            <button
              onClick={() => window.print()}
              className="print:hidden fixed bottom-6 right-6 flex items-center gap-2 bg-[#0070f3] hover:bg-[#0058d0] text-white text-sm font-medium px-4 py-3 rounded-lg shadow-lg transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3h8v-3a1 1 0 0 0-1-1z"/>
                <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
              </svg>
              Print Portfolio
            </button>
          )}
        </>
      )}
    </main>
  );
};

export default User;
