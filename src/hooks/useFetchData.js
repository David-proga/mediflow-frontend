import { useState, useEffect } from 'react';
import axios from 'axios'; // Usamos axios directo para URLs completas

export const useFetchData = (urlCompleta) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Petición directa a la URL absoluta sin interferencias
        const response = await axios.get(urlCompleta);
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error capturado en el hook: ", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (urlCompleta) {
      fetchData();
    }
  }, [urlCompleta]);

  return { data, loading, error };
};