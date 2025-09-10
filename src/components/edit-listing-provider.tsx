'use client'    
import React, { createContext, useContext, useState } from "react"
import { Approved_property } from "../lib/upload-properties";

export const Edit_listing_Context = createContext<{edit_list:Approved_property, setEdit_list?:React.Dispatch<React.SetStateAction<{}>>}>({})
const Edit_listing_Provider = ({children}:any) => {


  const [edit_list, setEdit_list] = useState<Approved_property>({});

  return(<Edit_listing_Context.Provider value={{ edit_list, setEdit_list}}>
    {children}
  </Edit_listing_Context.Provider>
  )
 
}
export default Edit_listing_Provider;