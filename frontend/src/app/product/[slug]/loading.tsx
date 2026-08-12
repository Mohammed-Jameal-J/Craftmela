export default function ProductLoading() {
  return (
    <div className="container-page animate-pulse py-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <div className="aspect-square rounded-card bg-sandstone-dark" />
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-card bg-sandstone-dark" />
            ))}
          </div>
        </div>
        <div>
          <div className="h-8 w-3/4 rounded bg-sandstone-dark" />
          <div className="mt-3 h-4 w-1/2 rounded bg-sandstone-dark" />
          <div className="mt-5 h-7 w-1/3 rounded bg-sandstone-dark" />
          <div className="mt-6 space-y-2">
            <div className="h-3 w-full rounded bg-sandstone-dark" />
            <div className="h-3 w-5/6 rounded bg-sandstone-dark" />
          </div>
          <div className="mt-8 flex gap-3">
            <div className="h-12 flex-1 rounded-full bg-sandstone-dark" />
            <div className="h-12 w-12 rounded-full bg-sandstone-dark" />
          </div>
        </div>
      </div>
    </div>
  );
}
