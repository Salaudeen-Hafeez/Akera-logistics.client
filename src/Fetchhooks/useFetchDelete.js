import { useState, useEffect } from 'react';

const useFetchDelete = (url, values) => {
  const [data, setData] = useState({});
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const abortConst = new AbortController();
    if (Object.keys(url).length !== 0) {
      setIsLoading(true);
      fetch(url, {
        signal: abortConst.signal,
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          if (Object.keys(data).length === 0 || data.message) {
            setData({});
            setFetchError(data);
          } else {
            setFetchError(null);
            setIsLoading(false);
            setData(data);
          }
        })
        .catch((err) => {
          setData({});
          setFetchError(err);
        });
    }

    return () => {
      abortConst.abort();
    };
  }, [url, values]);
  return { data, fetchError, isLoading };
};

export default useFetchDelete;