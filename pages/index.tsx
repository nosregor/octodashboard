import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Octicon, { MarkGithub } from "@primer/octicons-react";
import { Head } from "../components";

const Home = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/visits", { method: "POST" })
      .then(res => res.json())
      .then(({ count }) => setVisits(count))
      .catch(() => setVisits(null));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/user/${username}`);
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#1A1E22] to-[#24292e] text-[#f6f8fa]">
      <Head title="OctoDashboard" />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[600px] text-center rounded mb-[20vh] px-4"
      >
        <div className="text-[#0070f3]">
          <Octicon icon={MarkGithub} size="large" />
        </div>

        <label htmlFor="username" className="block text-[2.5rem] font-medium my-8">
          OctoDashboard
        </label>

        {visits !== null && (
          <p className="text-[#6a737d] text-sm mb-4">
            {visits.toLocaleString()} {visits === 1 ? "person has" : "people have"} visited OctoDashboard
          </p>
        )}

        <p className="text-[#79b8ff] font-sans text-base">
          Enter a GitHub username
        </p>

        <input
          id="username"
          name="username"
          type="text"
          onChange={handleChange}
          className="block w-full max-w-[500px] mx-auto p-4 mt-2 bg-[#26303c] border-0 rounded outline-none text-[#79b8ff] font-mono text-[2rem] text-center focus:outline-none"
        />
      </form>
    </main>
  );
};

export default Home;
