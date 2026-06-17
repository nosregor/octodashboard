import { useState, useEffect } from 'react';
import Octicon, { Repo, Star, RepoForked, TriangleDown } from '@primer/octicons-react';
import FlipMove from 'react-flip-move';
import { langColors } from '../utils';
import type { GitHubRepo } from '../types/github';

interface ReposProps {
  repoData: GitHubRepo[];
}

type SortType = 'stars' | 'forks' | 'size';

const Repos = ({ repoData }: ReposProps) => {
  const [topRepos, setTopRepos] = useState<GitHubRepo[]>([]);
  const [sortType, setSortType] = useState<SortType>('stars');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getTopRepos = (type: SortType = 'stars') => {
    const LIMIT = 8;
    const map: Record<SortType, keyof GitHubRepo> = { stars: 'stargazers_count', forks: 'forks_count', size: 'size' };
    const sortProperty = map[type];
    const sorted = repoData
      .filter(repo => !repo.fork)
      .sort((a, b) => (b[sortProperty] as number) - (a[sortProperty] as number))
      .slice(0, LIMIT);
    setTopRepos(sorted);
  };

  useEffect(() => {
    if (repoData.length) getTopRepos();
  }, []);

  useEffect(() => getTopRepos(sortType), [sortType]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const changeRepoSort = (type: SortType) => { setSortType(type); toggleDropdown(); };
  const sortTypes: SortType[] = ['stars', 'forks', 'size'];

  return (
    <section className="py-12 px-20 max-[900px]:py-8 max-[900px]:px-8 max-[400px]:p-4">
      <div className="max-w-[1400px] mx-auto">

        <header className="flex items-center mb-8">
          <h2 className="section-heading text-[1.75rem]">Top Repos</h2>

          <div className="flex items-center text-base text-[#6a737d] ml-4 print:hidden">
            <span className="mx-4">by</span>
            <div className="relative w-[100px] text-sm font-medium">
              <button
                className={`flex justify-between items-center w-full text-sm font-medium leading-none text-left text-[#0070f3] border border-[rgba(0,118,255,0.1)] px-[7px] py-[10px] rounded-[5px] transition-all duration-200 hover:bg-[rgba(0,118,255,0.1)] ${dropdownOpen ? 'bg-[rgba(0,118,255,0.1)]' : 'bg-transparent'}`}
                onClick={toggleDropdown}
              >
                <label className="transition-all duration-200 cursor-pointer">{sortType}</label>
                <span className={`ml-2 transition-all duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}>
                  <Octicon icon={TriangleDown} />
                </span>
              </button>
              <ul
                className={`absolute overflow-hidden w-full z-[2] transition-all duration-200 shadow-[0_5px_30px_-15px_rgba(0,0,0,0.2)] bg-[#f6f8fa] ${dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
              >
                {sortTypes.map((type, i) => (
                  <li key={i} className="transition-all duration-200 hover:bg-[#c8e1ff]">
                    <button
                      onClick={() => changeRepoSort(type)}
                      className={`text-[#0070f3] bg-[rgba(0,118,255,0.1)] px-[7px] py-[10px] w-full text-sm font-medium leading-none text-left ${i === 0 ? 'rounded-t-[5px]' : ''} ${i === sortTypes.length - 1 ? 'rounded-b-[5px]' : ''}`}
                    >
                      {type}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </header>

        <div>
          {topRepos.length > 0 ? (
            <FlipMove
              typeName="ul"
              className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4"
            >
              {topRepos.map(repo => (
                <li key={repo.id} className="repo-card">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col justify-between p-8 h-full text-[#586069] bg-white rounded shadow-[0_10px_30px_-15px_rgba(0,0,0,0.2)] transition-all duration-200 hover:shadow-[0_8px_20px_-15px_rgba(0,0,0,0.2)] max-[600px]:p-6"
                  >
                    <div className="mb-8">
                      <div className="flex items-center mb-3">
                        <span className="mr-2 min-w-[16px]"><Octicon icon={Repo} /></span>
                        <h3 className="overflow-hidden whitespace-nowrap text-ellipsis text-[#24292e] text-[20px] font-mono font-bold tracking-[-0.5px] m-0">
                          {repo.name}
                        </h3>
                      </div>
                      <p className="text-sm">{repo.description}</p>
                    </div>

                    <div className="flex justify-between text-[13px] text-[#6a737d]">
                      <div className="flex-grow flex">
                        <span className="flex items-center mr-3">
                          <div
                            className="rounded-full w-[10px] h-[10px] mr-1"
                            style={{ backgroundColor: langColors[repo.language as string] }}
                          />
                          {repo.language}
                        </span>
                        <span className="flex items-center mr-3">
                          <span className="mr-1"><Octicon icon={Star} /></span>
                          {repo.stargazers_count.toLocaleString()}
                        </span>
                        <span className="flex items-center mr-3">
                          <span className="mr-1"><Octicon icon={RepoForked} /></span>
                          {repo.forks.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span>{repo.size.toLocaleString()} KB</span>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </FlipMove>
          ) : (
            <p>No available repositories!</p>
          )}
        </div>

      </div>
    </section>
  );
};

export default Repos;
