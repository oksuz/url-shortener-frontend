import { useMemo } from 'react';
import http from '../../provider/http';

export default function useHttp() {
  return useMemo(() => {
    return http;
  });
}
