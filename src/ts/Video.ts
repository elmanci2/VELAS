import { useEffect, useState } from "react";

const cheerio = require("react-native-cheerio");

export const use__get__Video__Player = (id: string) => {
  useEffect(() => {
    body();
  }, [id]);

  const [video, setvideo] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoScipt, setVideoScipt] = useState(1);

  const body = async () => {
    setLoading(true);
    const data = await fetch(`https://www.ennovelas.com/${id}`);
    const lola = await data.text();
    const $ = cheerio.load(lola);

    const script = $(`#container > script:nth-child(${7})`).html();

   

    ///  check is scrit correct
    if (script == null  || undefined   ) {
      setVideoScipt(videoScipt + 1);
      console.log(videoScipt);
    
    } else {

        console.log('video is ratin player ');
        
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
