import React, { useEffect, useState } from "react";
import { GlobalStore } from "redux-micro-frontend";
const Menu = React.lazy(
  // @ts-ignore
  () => import("MENU/Menu")
);
const App = () => {
  const [price, setPrice] = useState(0);
  const globalStore = GlobalStore.Get();
  const appStore = globalStore.CreateStore(
    "webapp",
    (state: any, action: any) => {
      switch (action.type) {
        case "setPrice":
          return action.payload;
        default:
          return 1;
      }
    }
  );
  globalStore.RegisterStore("webapp", appStore);
  globalStore.RegisterGlobalActions("webapp", ["setPrice"]);
  globalStore.Subscribe("webapp", (price) => {
    setPrice(price);
  });
  useEffect(() => {
    setTimeout(() => {
      console.log("set Price 10");
      globalStore.DispatchAction("setPrice", { type: "setPrice", payload: 10 });
    }, 2000);
  }, []);
  return (
    <>
      <Menu />
      Posi price is {price}
    </>
  );
};

export default App;
