import { useEffect, useState } from 'react';
import axios from 'axios';

interface ExchangeRatesResponse {
  rates: Record<string, number>;
}

const useExchangeRates = (base: string) => {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get<ExchangeRatesResponse>(
          `https://api.frankfurter.dev/v1/latest?base=${base}`
        );
        setRates(response.data.rates);
        setError(null);
      } catch (e) {
        setError('Error fetching exchange rates');
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [base]);

  return { rates, loading, error };
};

export default useExchangeRates;
