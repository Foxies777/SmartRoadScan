import { AnimatePresence, motion } from 'framer-motion';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ToggleView } from 'shared/ui/ToggleView';
import { useSwipeable } from 'react-swipeable';
import { SmartRoadScanRoutes } from 'shared/utils/const';

export const AnimatedLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (location.pathname === SmartRoadScanRoutes.HOME) {
        navigate(SmartRoadScanRoutes.POINTS);
      }
    },
    onSwipedRight: () => {
      if (location.pathname === SmartRoadScanRoutes.POINTS) {
        navigate(SmartRoadScanRoutes.HOME);
      }
    },
    trackMouse: false,
    swipeDuration: 500,
    delta: 50
  });

  return (
    <>
      <ToggleView />
      <div {...handlers} style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 1, x: location.pathname === SmartRoadScanRoutes.HOME ? 300 : -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ 
              opacity: 1, 
              x: location.pathname === SmartRoadScanRoutes.HOME ? -300 : 300,
              transition: { duration: 0.3 }
            }}
            transition={{ 
              type: 'spring',
              stiffness: 300,
              damping: 30
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};