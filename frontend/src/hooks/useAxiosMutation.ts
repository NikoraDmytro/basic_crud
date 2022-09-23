import { AxiosError } from "axios";
import { useState } from "react";

type HookReturn = [
  (...args: any) => Promise<any>,
  {
    loading: boolean;
    error: string | undefined;
  }
];

export const useAxiosMutation = (
  request: (...args: any) => Promise<any>
): HookReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const executeRequest = async (
    ...args: Parameters<typeof request>
  ): Promise<ReturnType<typeof request>> => {
    try {
      setLoading(true);

      const res = await request(...args);

      setError(undefined);
      return res;
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

  return [executeRequest, { loading, error }];
};
