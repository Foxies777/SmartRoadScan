
import { Map } from "@widgets/MapWidget"
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
      </Suspense>
    </div>
  )
}

export default Home