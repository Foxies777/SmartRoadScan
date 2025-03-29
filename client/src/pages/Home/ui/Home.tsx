import { Map } from "@widgets/MapWidget"
import { UserHeader } from "@widgets/UserHeader";

import { Suspense } from "react";

const Home = () => {
  return (
    <div style={{position: "relative"}}>
      <Suspense fallback={<div>Loading...</div>}>
        <Map />
        <UserHeader/>
      </Suspense>
      </div>
  )
}

export default Home