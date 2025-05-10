import { ToggleView } from '@shared/ui/ToggleView';
import { AnimatePresence, motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import { SmartRoadScanRoutes } from 'shared/utils/const';

export const AnimatedLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === SmartRoadScanRoutes.HOME;
  
  return (
    <>
      <ToggleView />
      <div style={{ position: 'relative', height: '100svh', width: '100vw', overflowX: 'hidden' }}>
        <AnimatePresence>
          <motion.div
            key={location.pathname}
            initial={{ x: isHomePage ? '100%' : '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ 
              x: isHomePage ? '-100%' : '100%', 
              opacity: 0,
              transition: { duration: 0.3 } 
            }}
            transition={{ 
              type: 'spring',
              stiffness: 500,
              damping: 30,
              duration: 0.3,
              mass: 1,
              
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%'
            }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};