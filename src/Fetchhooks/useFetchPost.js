import { useState, useEffect } from 'react';

const useFetchPost = (url, values) => {
  const [data, setData] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // const abortConst = new AbortController();
    if (url !== '') {
      setIsLoading(true);
      fetch(url, {
        // signal: abortConst.signal,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          if ('parcel_id' in data || 'users_id' in data || 'admin_id' in data) {
            setFetchError(null);
            setData(data);
            setIsLoading(false);
          } else {
            setData(null);
            setFetchError(data);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setData(null);
          setFetchError(err);
          setIsLoading(false);
        });
    }

    return () => {
      // abortConst.abort();
    };
  }, [url, values]);
  return { data, fetchError, isLoading };
};

export default useFetchPost;