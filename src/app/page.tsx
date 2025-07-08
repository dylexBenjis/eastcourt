"use client"

import { useContext } from "react"
import Dashboard from "./dashboard"
import { AuthState_Context } from "../lib/auth_state"
import { ActiveTab_Context } from "../components/activeTab-provider"

export default function Page() {
  const {loading} = useContext(AuthState_Context)
  const {activeTab, setActiveTab} = useContext(ActiveTab_Context);

  if (loading) {
    return <div className="flex justify-center items-center w-screen h-screen"><div className="loader">loading....</div></div>
  }

  return <div className=" flex justify-center w-screen"><div className=""><Dashboard activeTab={activeTab}/></div></div>
}
