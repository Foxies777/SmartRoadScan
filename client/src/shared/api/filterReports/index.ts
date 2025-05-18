// shared/api/filterReports.ts
import { api } from '../api';
import { Reports } from '@entities/reports/types/model';
type Filters = {
    type: string | null;
    status: string[];
    minArea: number | null;
    maxArea: number | null;
    dateRange: [string, string] | null;
};
export const fetchReports = async (filters: Filters) => {
    try {
      console.log('📦 fetchReports CALLED with:', filters);
  
      const params = new URLSearchParams();
  
      if (filters.type) params.set("type", filters.type);
      if (filters.status?.length) filters.status.forEach(s => params.append("status", s));
      if (filters.minArea !== null) params.set("minArea", String(filters.minArea));
      if (filters.maxArea !== null) params.set("maxArea", String(filters.maxArea));
      if (filters.dateRange) {
        params.set("from", filters.dateRange[0]);
        params.set("to", filters.dateRange[1]);
      }
  
      const url = `api/reports/reports?${params.toString()}`;
      console.log('🌐 FETCH URL:', url);
  
      const res = await api.get(url).json<Reports[]>();
      console.log('✅ FETCH RESULT:', res);
      return res;
    } catch (err) {
      console.error('❌ FETCH ERROR:', err);
      throw err;
    }
  };
  