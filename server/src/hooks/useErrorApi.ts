import { useMemo } from "react";
import { ErrorOptionsApi, errorApi } from "../utils/error";

export function useErrorApi(
  errorOptions: ErrorOptionsApi,
  deps?: React.DependencyList
) {
  return useMemo(() => {
    return errorApi(errorOptions)
  }, deps);
}