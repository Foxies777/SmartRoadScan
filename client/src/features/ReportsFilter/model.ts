import { fetchReports } from '@shared/api/filterReports';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { Reports } from '@entities/reports/types/model';

type Filters = {
  type: string | null;
  status: string[];
  minArea: number | null;
  maxArea: number | null;
  dateRange: [string, string] | null;
};

export const typeChanged = createEvent<string | null>();
export const statusChanged = createEvent<string[]>();
export const minAreaChanged = createEvent<number | null>();
export const maxAreaChanged = createEvent<number | null>();
export const dateRangeChanged = createEvent<[string, string] | null>();
export const resetFilters = createEvent();

export const loadReportsFx = createEffect<Filters, Reports[]>(async (filters) => {
  console.log('🚀 loadReportsFx RUN with filters:', filters);
  return fetchReports(filters);
});

export const $filters = createStore<Filters>({
  type: null,
  status: [],
  minArea: null,
  maxArea: null,
  dateRange: null,
})
  .on(typeChanged, (s, type) => ({ ...s, type }))
  .on(statusChanged, (s, status) => ({ ...s, status }))
  .on(minAreaChanged, (s, minArea) => ({ ...s, minArea }))
  .on(maxAreaChanged, (s, maxArea) => ({ ...s, maxArea }))
  .on(dateRangeChanged, (s, dateRange) => ({ ...s, dateRange }))
  .reset(resetFilters);

export const $pits = createStore<Reports[]>([]).on(loadReportsFx.doneData, (_, pits) => pits);

// ⏩ Тригерим fetch при любых изменениях
sample({
  source: $filters,
  clock: [typeChanged, statusChanged, minAreaChanged, maxAreaChanged, dateRangeChanged, resetFilters],
  fn: (filters) => filters,
  target: loadReportsFx,
});