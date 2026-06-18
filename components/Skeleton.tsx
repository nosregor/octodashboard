export const UserInfoSkeleton = () => (
  <section className="py-12 px-20 pb-40 bg-[#1A1E22] max-[900px]:py-8 max-[900px]:px-8 max-[900px]:pb-40 max-[400px]:p-4 max-[400px]:pb-40">
    <div className="max-w-[1400px] mx-auto">
      <div className="flex flex-col items-center text-center max-[600px]:pt-16 animate-pulse">
        <div className="mb-6 rounded-full w-[150px] h-[150px] bg-[#24292e]" />
        <div className="h-10 w-56 bg-[#24292e] rounded mb-3" />
        <div className="h-6 w-36 bg-[#24292e] rounded mb-6" />
        <div className="flex gap-8">
          <div className="h-4 w-20 bg-[#24292e] rounded" />
          <div className="h-4 w-20 bg-[#24292e] rounded" />
          <div className="h-4 w-28 bg-[#24292e] rounded" />
        </div>
        <div className="grid grid-cols-[repeat(3,150px)] gap-2 mt-8">
          {[0, 1, 2].map(i => <div key={i} className="bg-[#24292e] p-4 rounded h-[76px]" />)}
        </div>
      </div>
    </div>
  </section>
);

export const ChartsSkeleton = () => (
  <section className="py-12 px-20 max-[900px]:py-8 max-[900px]:px-8 max-[400px]:p-4">
    <div className="max-w-[1400px] mx-auto">
      <div className="max-w-[1200px] -mt-32 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 max-[900px]:justify-items-center animate-pulse">
        {[0, 1, 2].map(i => (
          <div key={i} className="bg-white max-w-[500px] p-8 rounded shadow-[0_5px_30px_-15px_rgba(0,0,0,0.2)]">
            <div className="h-7 w-40 bg-gray-200 rounded mb-8" />
            <div className="w-[300px] h-[300px] bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ReposSkeleton = () => (
  <section className="py-12 px-20 max-[900px]:py-8 max-[900px]:px-8 max-[400px]:p-4">
    <div className="max-w-[1400px] mx-auto animate-pulse">
      <div className="flex items-center mb-8">
        <div className="h-7 w-32 bg-gray-200 rounded" />
        <div className="ml-8 h-8 w-24 bg-gray-200 rounded" />
      </div>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
          <li key={i} className="bg-white rounded shadow-[0_10px_30px_-15px_rgba(0,0,0,0.2)] p-8 h-[180px]" />
        ))}
      </ul>
    </div>
  </section>
);
