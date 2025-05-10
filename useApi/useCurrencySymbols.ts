// src/useApi/useCurrencySymbols.ts
import useApi from '../useApi/useApi';

interface ApiSymbolsResponse {
  [code: string]: string; 
}

const useCurrencySymbols = () => {
  const { data, loading, error } = useApi<ApiSymbolsResponse>('https://api.frankfurter.app/currencies');

  
  const symbols = data
    ? Object.entries(data).reduce((acc, [code, name]) => {
        acc[code] = { code, description: name };
        return acc;
      }, {} as Record<string, { code: string; description: string }>)
    : {};

  return {
    symbols,
    loading,
    error,
  };
};

export default useCurrencySymbols;
