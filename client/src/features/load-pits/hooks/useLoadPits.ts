import { useEffect } from "react";
import { useUnit } from "effector-react";
import { $pits, loadReportsFx, $filters } from "@features/ReportsFilter/model";

export const useLoadPits = () => {
  const [pits, loading] = useUnit([$pits, loadReportsFx.pending]);
  const filters = useUnit($filters);

  useEffect(() => {
    loadReportsFx(filters); // 🔥 без этого запрос не уходит
  }, [filters]);

  return [pits, loading] as const;
};
