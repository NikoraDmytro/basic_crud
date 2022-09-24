import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export const useAxios = <TReturn>(request: () => Promise<TReturn>) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TReturn>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const executeRequest = async () => {
      try {
        setLoading(true);

        const response = await request();

        setError(undefined);
        setData(response);
      } catch (e) {
        const error = e as AxiosError<string>;

        if (error.response) {
          setError(error.response.data);
        } else {
          setError(error.message ?? "Внутрішня помилка сервера!");
        }
      } finally {
        setLoading(false);
      }
    };

    executeRequest();
  }, [request]);

  return { loading, data, setData, error };
};
