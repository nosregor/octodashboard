import Octicon, { MarkGithub } from '@primer/octicons-react';
import { Head, Corner } from '../components';
import type { AppError } from '../types/github';

interface ErrorProps {
  error: AppError;
}

const Error = ({ error }: ErrorProps) => (
  <div className="flex flex-col justify-center items-center bg-white text-[#3a416f] min-h-screen pb-[20vh] text-2xl">
    <Head title="OctoDashboard" />
    <Corner />
    <div className="text-[#5468ff] mb-12">
      <Octicon icon={MarkGithub} size="large" />
    </div>
    <h1>OctoDashboard</h1>

    {error && (
      <div>
        {error.type === 403 ? (
          <p className="text-base">
            Oh no, you hit the{' '}
            <a
              href="https://developer.github.com/v3/rate_limit/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#79b8ff] hover:underline focus:underline"
            >
              rate limit
            </a>
            ! Try again later.
          </p>
        ) : error.type === 404 ? (
          <p className="text-base">User not found!</p>
        ) : (
          <p className="text-base">Oh no! Something went wrong. Try again later!</p>
        )}
      </div>
    )}
  </div>
);

export default Error;
