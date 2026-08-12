export default function HomeLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-[420px] w-full bg-sandstone-dark" />
      <div className="container-page py-12">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-card bg-sandstone-dark" />
          ))}
        </div>
      </div>
      <div className="container-page py-12">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-28 rounded-card bg-sandstone-dark" />
          ))}
        </div>
      </div>
    </div>
  );
}
