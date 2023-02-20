import {useEffect, useState} from "react";

export default function <T> (url: string) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setData(result);
        },
      )
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsLoaded(true))
  }, [])

  return {error, isLoaded, data}
}