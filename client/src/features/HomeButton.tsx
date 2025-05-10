import { useNavigate } from "react-router-dom";
import { SmartRoadScanRoutes } from "shared/utils/const";

export const HomeButton = () => {
  const navigate = useNavigate();
  
  return (
    <button 
      onClick={() => navigate(SmartRoadScanRoutes.HOME)}
      style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        zIndex: 1000,
        padding: '10px 20px',
        borderRadius: '8px',
        border: 'none',
        background: '#007AFF',
        color: 'white',
        cursor: 'pointer'
      }}
    >
      Назад на карту
    </button>
  );
};