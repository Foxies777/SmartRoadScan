
import { $isAuth, $user } from "@entities/user/model";
import { FilterWidget } from "@widgets/FilterWidget";
import { Map } from "@widgets/MapWidget"
import { Upload } from "@widgets/Upload";
import { UserHeader } from "@widgets/UserHeader";
import { useUnit } from "effector-react";
import { Suspense } from "react";

const Home = () => {
  const isAuth = useUnit($isAuth)
  const user = useUnit($user)
  console.log(user);
  
  return (
    <div style={{
      position: "relative",
      height: '100vh',
      width: '100vw',
      overflow: 'hidden'
    }}>
      <Suspense fallback={<div>Loading...</div>}>
        <Map />
        <UserHeader/>
        {isAuth? <Upload/> : null}
        <FilterWidget/>
      </Suspense>
    </div>
  )
}

export default Home