import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import useAddsId from "../Hook/anuncios/addsId/useAddsId";

const cheerio = require("react-native-cheerio");

export const use__get__Video__Player = (id: string) => {
  useEffect(() => {
    body();
  }, [id]);

  const [video, setvideo] = useState("");
  const [loading, setLoading] = useState(false);

  const { losDatos, refetch } = useAddsId("/scriptNumber", "scriptNumber");

  const body = async () => {
    setLoading(true);

    const data = await fetch(`https://www.ennovelas.com/${id}`);
    const lola = await data.text();
    const $ = cheerio.load(lola);

    const script = $(
      losDatos?.selector ??
        `#container > script:nth-child(${losDatos?.number ?? 7})`
    ).html();


    if (losDatos !== null || undefined) {
      const datas = script
        .split("preload: 'auto',")[0]
        .toString()
        .replace("var holaplayer;", "")
        .replace("window.hola_player({ player: '#hola',")
        .replace("undefined", "");
      const url = datas.split();
      const link = url[0]
        .split("tshare:")[0]
        .split("tsources:")[0]
        .split("  ")
        .filter((x: string) => x.includes("sources: [{src:"))[0]
        .replace("sources: [{src:", "")
        .split("  ")[0]
        .replace("}],", "")
        .toString()
        .split(" ")
        .filter((x: string) => x.includes("https://"))[0]
        .replace(" ", "")
        .replace(",", "")
        .replace('"', "")
        .replace('"', "");

      setvideo(link);
      setLoading(false);

    }
  };

  return { video, loading };
};
