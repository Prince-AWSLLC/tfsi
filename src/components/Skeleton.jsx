export function Spinner({ label = "Loading" }) {
  return (
    <span className="spinner" role="status" aria-live="polite">
      <span className="spinner-ring" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
}

export function PageSkeleton() {
  return (
    <div className="skeleton-page" aria-busy="true" aria-live="polite">
      <div className="skeleton-hero">
        <div className="wrap skeleton-hero-copy">
          <span className="skeleton-line w-20" />
          <span className="skeleton-line h-xl w-70" />
          <span className="skeleton-line w-90" />
          <span className="skeleton-line w-60" />
          <Spinner label="Loading site content" />
        </div>
        <div className="skeleton-hero-photo" />
      </div>
      <div className="wrap skeleton-body">
        <span className="skeleton-line w-30" />
        <span className="skeleton-line h-lg w-50" />
        <span className="skeleton-line w-100" />
        <span className="skeleton-line w-90" />
        <span className="skeleton-line w-80" />
      </div>
    </div>
  );
}

export function LoadError({ error, onRetry }) {
  return (
    <div className="wrap load-error" role="alert">
      <h1>Site content did not load</h1>
      <p>
        The content file could not be read{error?.message ? ` (${error.message})` : ""}. Check the
        connection and try again.
      </p>
      <button type="button" className="btn" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}
