"use client"

import { useContext } from "react"
import { AuthState_Context } from "../../lib/auth_state"
import { MyListings } from "./my-listings"
import LoginPage from "./signin"
import Dashboard from "./dashboard"
import { ActiveTab_Context } from "@/src/components/activeTab-provider"

export default function Page() {
  const {user, loading} = useContext(AuthState_Context);
  const {activeTab, setActiveTab} = useContext(ActiveTab_Context);
  


    if(!user){
        return (loading?(<div className=" flex justify-center w-screen">loading...</div>):<div className=" flex justify-center w-screen"><LoginPage/></div>)
    }

  return (loading?(<div className=" flex justify-center w-screen">loading...</div>):(<div className=" flex justify-center w-screen"><Dashboard activeTab={activeTab}/></div>))
}
