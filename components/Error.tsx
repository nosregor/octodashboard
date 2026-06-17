import Octicon, { MarkGithub } from '@primer/octicons-react';
import { Head, Corner } from '../components';
import type { AppError } from '../types/github';

interface ErrorProps {
  error: AppError;
}

const Error = ({ error }: ErrorProps) => (
  <div className="flex flex-col justify-center items-center min-h-screen pb-[20vh] bg-gradient-to-b from-[#1A1E22] to-[#24292e] text-[#f6f8fa] text-2xl text-center px-4">
    <Head title="OctoDashboard" />
    <Corner />
    <div className="text-[#0070f3] mb-12">
      <Octicon icon={MarkGithub} size="large" />
    </div>
    <h1 className="text-[2.5rem] font-medium mb-8">OctoDashboard</h1>

    {error && (
      <div className="text-[#79b8ff] font-mono text-base">
        {error.type === 403 ? (
          <p>
            Oh no, you hit the{' '}
            <a
              href="https://developer.github.com/v3/rate_limit/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0070f3] hover:underline focus:underline"
            >
              rate limit
            </a>
            ! Try again later.
          </p>
        ) : error.type === 404 ? (
          <p>User not found!</p>
        ) : (
          <p>Oh no! Something went wrong. Try again later!</p>
        )}
      </div>
    )}
  </div>
);

export default Error;
