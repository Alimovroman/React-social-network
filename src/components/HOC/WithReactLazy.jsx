import Preloader from "../common/Preloader/Preloader";
import React, { Suspense } from "react";

const WithReactLazy = (ReactLazy) => {
  return class extends React.Component {
    
    render() {
      return (
        <Suspense fallback={<Preloader />}>
          <ReactLazy />
        </Suspense>
      )
    }
  }

}

export default WithReactLazy;