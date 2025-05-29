import { updateReportStatus } from '@shared/api/filterReports';
import { createEffect, createEvent, sample } from 'effector';
import { $pits } from '@features/ReportsFilter/model';
import { Reports } from '@entities/reports/types/model';

// EVENTS
export const reportStatusChanged = createEvent<{ reportId: string; status: string }>();

// EFFECT
export const updateReportStatusFx = createEffect<{ reportId: string; status: string }, Reports>(
  updateReportStatus
);

// Обновляем нужный отчёт в $pits
$pits.on(updateReportStatusFx.doneData, (reports, updatedReport) =>
  reports.map((r) => (r._id === updatedReport._id ? updatedReport : r))
);

// TRIGGER FX
sample({
  clock: reportStatusChanged,
  target: updateReportStatusFx,
});
