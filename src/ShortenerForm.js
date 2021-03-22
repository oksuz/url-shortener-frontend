import React from 'react';

function ShortenerForm({ handleSubmit, loading }) {
  return (
    <div className="shortener-form">
      <form onSubmit={handleSubmit}>
        <input type="text" name="url" placeholder="Enter a url" />
        <button type="submit" className={`${loading ? 'loading' : ''}`} disabled={loading}>
          Shorten!
        </button>
      </form>
    </div>
  );
}

export default React.memo(ShortenerForm);
