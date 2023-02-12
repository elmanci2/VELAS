
import { useQuery } from "react-query";
import { FechingData } from "../../FechingData";

const useAddsId = (url :  string ,  key : string  ) => {
    //// fetch data add  id
    const { data:losDatos  ,  isLoading   ,  isError , refetch } = useQuery( 
        [key] ,
       () =>  FechingData(url)
    )

  return {losDatos  , isError , refetch   }
};

export default useAddsId;
