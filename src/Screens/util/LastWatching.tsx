import { useEffect, useState } from "react";
import MyScreens from "../../Components/body/Screen";
import SliderGrid from "../../Components/custom/Sliders/SliderGrid";
import { getWatchig } from "../../db/db";

// create a component
export const LastWatching = () => {
  const [watching, setWatching] = useState([]);

  useEffect(() => {
    getWatchig().then((watching: any) => {
      setWatching(watching);
    });
  }, [watching]);
  return (
    <MyScreens>
      <SliderGrid
        isLoading={false}
        isError={false}
        refrech={() => null}
        data={watching as any}
      />
    </MyScreens>
  );
};
