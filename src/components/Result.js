import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getActualShortUrl } from '../utils/urlUtils';

function ErrorView({ errors }) {
  const errorList = [];
  if (errors?.message) {
    errorList.push({ msg: errors?.message });
  } else if (typeof errors === 'string') {
    errorList.push({ msg: errors });
  } else if (Array.isArray(errors)) {
    Array.prototype.push.apply(errorList, errors);
  }

  return (
    <div className="error">
      <ul>
        {errorList.map((err, i) => {
          return <li key={i}>{err.msg}</li>;
        })}
      </ul>
    </div>
  );
}

function SuccessView({ url }) {
  const urlWithDomain = getActualShortUrl(url);

  return (
    <div className="success">
      <a id="result-url" href={urlWithDomain}>
        {urlWithDomain}
      </a>
      <CopyToClipboard text={urlWithDomain}>
        <button type="button">Copy</button>
      </CopyToClipboard>
    </div>
  );
}

export default function Result({ url, errors }) {
  if (errors != null) {
    return <ErrorView errors={errors} />;
  }

  if (url != null) {
    return <SuccessView url={url} />;
  }

  return null;
}
