const LazyLoader = () => (
  <div className="preloader">
    {[...Array(3)].map((_, i) => <div key={`dot-${i + 1}`} className="dot" />)}
  </div>
);

export default LazyLoader;
