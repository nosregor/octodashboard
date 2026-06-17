import Octicon, { Briefcase, Calendar, Location } from '@primer/octicons-react';
import type { GitHubUser } from '../types/github';

interface UserInfoProps {
  userData: GitHubUser;
}

const UserInfo = ({ userData }: UserInfoProps) => (
  <section className="py-12 px-20 pb-40 bg-[#1A1E22] text-[#c8e1ff] max-[900px]:py-8 max-[900px]:px-8 max-[900px]:pb-40 max-[400px]:p-4 max-[400px]:pb-40 print:pb-4">
    <div className="max-w-[1400px] mx-auto">
      {userData && (
        <div className="flex flex-col items-center mb-[30px] text-center max-[600px]:pt-16">
          {userData.avatar_url && (
            <div className="flex justify-center items-center mb-6 border-[8px] border-[#0070f3] rounded-full w-[150px] h-[150px]">
              <img src={userData.avatar_url} alt="avatar" className="rounded-full" />
            </div>
          )}

          {userData.name && (
            <h1 className="text-[2.5rem] font-medium mb-[10px] text-[#f6f8fa] max-[400px]:text-[2rem]">
              {userData.name}
            </h1>
          )}

          {userData.login && (
            <h2 className="font-mono font-medium text-2xl mb-6">
              <a
                href={userData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0070f3] hover:underline focus:underline"
              >
                @{userData.login}
              </a>
            </h2>
          )}

          <div className="flex justify-center items-center flex-wrap max-[600px]:block">
            {userData.company && (
              <span className="flex items-center mx-4 mb-2 whitespace-nowrap">
                <span className="mr-[10px]"><Octicon icon={Briefcase} size="small" /></span>
                {userData.company}
              </span>
            )}
            {userData.location && (
              <span className="flex items-center mx-4 mb-2 whitespace-nowrap">
                <span className="mr-[10px]"><Octicon icon={Location} size="small" /></span>
                {userData.location}
              </span>
            )}
            {userData.created_at && (
              <span className="flex items-center mx-4 mb-2 whitespace-nowrap">
                <span className="mr-[10px]"><Octicon icon={Calendar} size="small" /></span>
                Joined{' '}
                {new Date(userData.created_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            )}
          </div>

          <div className="grid grid-cols-[repeat(3,150px)] gap-2 mt-8">
            <div className="flex flex-col items-center bg-[#24292e] p-4 rounded text-center max-[400px]:px-2">
              <span className="text-[#f6f8fa] text-2xl max-[400px]:text-base">
                {userData.public_repos.toLocaleString()}
              </span>
              <span className="uppercase text-[0.75rem] tracking-[1px] mt-3 text-[rgba(200,225,255,0.7)] max-[400px]:text-[0.5rem]">
                Repositories
              </span>
            </div>
            <div className="flex flex-col items-center bg-[#24292e] p-4 rounded text-center max-[400px]:px-2">
              <span className="text-[#f6f8fa] text-2xl max-[400px]:text-base">
                {userData.followers.toLocaleString()}
              </span>
              <span className="uppercase text-[0.75rem] tracking-[1px] mt-3 text-[rgba(200,225,255,0.7)] max-[400px]:text-[0.5rem]">
                Followers
              </span>
            </div>
            <div className="flex flex-col items-center bg-[#24292e] p-4 rounded text-center max-[400px]:px-2">
              <span className="text-[#f6f8fa] text-2xl max-[400px]:text-base">
                {userData.following.toLocaleString()}
              </span>
              <span className="uppercase text-[0.75rem] tracking-[1px] mt-3 text-[rgba(200,225,255,0.7)] max-[400px]:text-[0.5rem]">
                Following
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  </section>
);

export default UserInfo;
