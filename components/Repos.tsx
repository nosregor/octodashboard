import { useState, useEffect } from 'react';
import Octicon, { Repo, Star, RepoForked, TriangleDown, TriangleUp } from '@primer/octicons-react';
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
    <section className="relative py-12 px-20 max-[900px]:py-8 max-[900px]:px-8 max-[400px]:p-4">
      <div className="max-w-[1400px] mx-auto">

        <header className="relative z-30 flex flex-wrap items-center gap-y-2 mb-8">
          <h2 className="section-heading text-[1.75rem]">Top Repos</h2>

          <div className="flex items-center text-base text-[#6a737d] ml-4 print:hidden">
            <span className="mx-4">by</span>
            <div className="relative z-30 min-w-[100px] text-sm font-medium">
              <button
                type="button"
                aria-expanded={dropdownOpen}
                aria-haspopup="listbox"
                className={`flex justify-between items-center w-full text-sm font-medium leading-none text-left text-[#0070f3] border border-[rgba(0,118,255,0.25)] px-[7px] py-[10px] rounded-[5px] transition-all duration-200 hover:bg-[rgba(0,118,255,0.1)] ${dropdownOpen ? 'bg-[rgba(0,118,255,0.1)]' : 'bg-white'}`}
                onClick={toggleDropdown}
              >
                <span className="text-[#0070f3] transition-all duration-200">{sortType}</span>
                <span className="ml-2 inline-flex shrink-0 items-center text-[#0070f3]">
                  <Octicon
                    icon={dropdownOpen ? TriangleUp : TriangleDown}
                    size={16}
                    className="text-[#0070f3]"
                  />
                </span>
              </button>
              <ul
                role="listbox"
                className={`absolute top-full left-0 mt-1 w-full z-50 rounded-[5px] transition-all duration-200 shadow-[0_5px_30px_-15px_rgba(0,0,0,0.2)] bg-[#f6f8fa] ${dropdownOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}
              >
                {sortTypes.map((type, i) => (
                  <li key={type} className="transition-all duration-200 hover:bg-[#c8e1ff]">
                    <button
                      type="button"
                      role="option"
                      aria-selected={sortType === type}
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
                        <span className="mr-2 inline-flex min-w-[16px] items-center text-[#586069]">
                          <Octicon icon={Repo} size={16} className="text-[#586069]" />
                        </span>
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
                          <span className="mr-1 inline-flex items-center text-[#6a737d]">
                            <Octicon icon={Star} size={16} className="text-[#6a737d]" />
                          </span>
                          {repo.stargazers_count.toLocaleString()}
                        </span>
                        <span className="flex items-center mr-3">
                          <span className="mr-1 inline-flex items-center text-[#6a737d]">
                            <Octicon icon={RepoForked} size={16} className="text-[#6a737d]" />
                          </span>
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
