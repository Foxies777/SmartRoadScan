import { $isAuth } from "@entities/user/model";
import { SmartRoadScanRoutes } from "@shared/utils/const";
import { useUnit } from "effector-react";
import {  useNavigate } from "react-router-dom";
import styles from '../style/style.module.css'
const UserHeader = () => {
  const isAuth = useUnit($isAuth);
  const navigate = useNavigate();

  const onProvide = () => {
    if (isAuth) {
      navigate(SmartRoadScanRoutes.PROFILE);
    } else {
      navigate(SmartRoadScanRoutes.LOGIN);
    }
  };

  const defaultImage = "https://www.saqa.org.za/wp-content/uploads/2023/02/new-Vacant.png";

  return <div className={styles.userHeader} onClick={onProvide}>
     <img
        src={isAuth && userProfile?.photoUrl ? userProfile.photoUrl : defaultImage}
        alt="User Avatar"
      />
  </div>;
};

export default UserHeader;
