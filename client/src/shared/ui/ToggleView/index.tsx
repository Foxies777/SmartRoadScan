import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { SmartRoadScanRoutes } from "shared/utils/const";
import styles from "./ToggleView.module.css";

export const ToggleView = () => {
  const location = useLocation();
  const isMapView = location.pathname === SmartRoadScanRoutes.HOME;

  return (
    <div className={styles.toggleContainer}>
      <Link to={SmartRoadScanRoutes.HOME} className={styles.toggleOption}>
        Карта
      </Link>
      <Link to={SmartRoadScanRoutes.POINTS} className={styles.toggleOption}>
        Список
      </Link>

      <motion.div
        className={styles.activeIndicator}
        layoutId="activeIndicator"
        initial={false}
        animate={{
          left: isMapView ? "0%" : "50%",
          backgroundColor: isMapView ? "#3b82f6" : "#10b981",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
};
