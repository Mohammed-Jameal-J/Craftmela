export default function CategoryLoading() {
  return (
    <div className="container-page animate-pulse py-10">
      <div className="h-3 w-32 rounded bg-sandstone-dark" />
      <div className="mt-3 mb-8 h-8 w-48 rounded bg-sandstone-dark" />
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i}>
            <div className="aspect-square rounded-card bg-sandstone-dark" />
            <div className="mt-3 h-3 w-3/4 rounded bg-sandstone-dark" />
            <div className="mt-2 h-3 w-1/3 rounded bg-sandstone-dark" />
          </div>
        ))}
      </div>
    </div>
  );
}
