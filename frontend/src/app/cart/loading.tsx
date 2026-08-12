export default function CartLoading() {
  return (
    <div className="container-page animate-pulse py-10">
      <div className="mb-8 h-8 w-40 rounded bg-sandstone-dark" />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-4 rounded-card border border-sage/10 bg-white p-4">
              <div className="h-20 w-20 shrink-0 rounded-lg bg-sandstone-dark" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-2/3 rounded bg-sandstone-dark" />
                <div className="h-3 w-1/4 rounded bg-sandstone-dark" />
              </div>
            </div>
          ))}
        </div>
        <div className="h-48 rounded-card border border-sage/10 bg-white p-6">
          <div className="h-4 w-1/2 rounded bg-sandstone-dark" />
        </div>
      </div>
    </div>
  );
}
