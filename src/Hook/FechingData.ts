import { BASE__URL } from "../Constants/url";

export const FechingData = async (url: string) => {
  const response = await fetch( BASE__URL+url);
  return response.json();
};
