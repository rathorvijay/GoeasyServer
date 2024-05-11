
import {toast} from "react-hot-toast"
import { apiConnector } from '../apiconnector';
import { cetalogData } from '../apis';

export const getCatalogyPageData = async(categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
        console.log("api",cetalogData.CETALOGPAGEDATA_API)
        const response = await apiConnector("POST", cetalogData.CETALOGPAGEDATA_API, 
        {categoryId: categoryId,});

        if(!response?.data?.success)
            throw new Error("Could not Fetch Category page data");

         result = response?.data;

  }
  catch(error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
}

