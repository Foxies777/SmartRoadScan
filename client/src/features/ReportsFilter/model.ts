// features/ReportsFilter/model.ts
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

export const filtersUpdated = createEvent<Filters>();

export const loadReportsFx = createEffect<Filters, Reports[]>(fetchReports);

// filters store
export const $filters = createStore<Filters>({
  type: null,
  status: [],
  minArea: null,
  maxArea: null,
  dateRange: null,
})
  .on(filtersUpdated, (_, payload) => payload)
  .on(statusChanged, (s, status) => ({ ...s, status }))
  .on(minAreaChanged, (s, minArea) => ({ ...s, minArea }))
  .on(maxAreaChanged, (s, maxArea) => ({ ...s, maxArea }))
  .on(dateRangeChanged, (s, dateRange) => ({ ...s, dateRange }))
  .reset(resetFilters);

// result store
export const $pits = createStore<Reports[]>([]).on(loadReportsFx.doneData, (_, pits) => pits);

// trigger fetch on filter update
sample({
    source: $filters,
    clock: filtersUpdated,
    fn: (filters) => {
      console.log('⚡ filtersUpdated TRIGGERED:', filters); // <= ЛОГ
      return filters;
    },
    target: loadReportsFx,
  });
  

sample({
  source: $filters,
  clock: typeChanged,
  fn: (filters, type) => ({ ...filters, type }),
  target: filtersUpdated,
});
