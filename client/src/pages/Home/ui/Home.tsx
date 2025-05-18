
import { FilterWidget } from "@widgets/FilterWidget";
import { Map } from "@widgets/MapWidget"
import { Upload } from "@widgets/Upload";
import { UserHeader } from "@widgets/UserHeader";
import { Suspense } from "react";

const Home = () => {
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
        <Upload/>
        <FilterWidget/>
      </Suspense>
    </div>
  )
}

export default Home