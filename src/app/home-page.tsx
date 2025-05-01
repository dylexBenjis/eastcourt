"use client"

import { Fragment, useContext, useState } from "react"
import Image from "next/image"
import { Bath, Bed, Building, ChevronDown, MapPin, Search } from "lucide-react"

import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Slider } from "@/src/components/ui/slider"
import { Badge } from "@/src/components/ui/badge"
import Property_card from "@/src/components/property_card"
import { ActiveTab_Context } from "../components/activeTab-provider"
import { AuthState_Context } from "../lib/auth_state"

export function HomePage() {
  const [priceRange, setPriceRange] = useState([50000, 500000])
  const [expanded, setExpanded] = useState(false)

  // Sample featured listings data
  const featuredListings = [
    {
      id: 1,
      title: "Modern Apartment with City View",
      price: 350000,
      location: "Downtown, New York",
      beds: 2,
      baths: 2,
      sqft: 1200,
      type: "Apartment",
      image: ["/placeholder.svg?height=300&width=400"],
      featured: true,
    },
    {
      id: 2,
      title: "Spacious Family Home",
      price: 450000,
      location: "Suburbia, California",
      beds: 4,
      baths: 3,
      sqft: 2400,
      type: "House",
      image: ["/placeholder.svg?height=300&width=400"],
      featured: true,
    },
    {
      id: 3,
      title: "Luxury Penthouse",
      price: 750000,
      location: "Marina District, San Francisco",
      beds: 3,
      baths: 3.5,
      sqft: 2000,
      type: "Penthouse",
      image: ["/placeholder.svg?height=300&width=400"],
      featured: true,
    },
    ,
  ]

  //activetab context
  const {setActiveTab}=useContext(ActiveTab_Context)

  //user
  const {user, loading} = useContext(AuthState_Context)

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">

{!user&&<section className="h-[calc(100vh/1.75)] flex justify-center items-center">
  <div className='flex flex-col gap-5 max-w-[768px] text-center '>
  <h1  className="text-5xl font-bold">Welcome to Eastcourt, a website where you can list and find a property suited for you.</h1>
  <p className="text-lg"><span  onClick={()=>{if(setActiveTab)setActiveTab('signin')}} className="cursor-pointer text-blue-600">Sign in</span> to list properties or start viewing properties close to you.</p>
</div>
</section>}


      {/* Featured Listings */}
      <section className="mb-10 mt-10">
        <h2 className="mb-6 text-2xl font-bold">Featured Listings</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredListings
            .filter((listing) => listing.featured)
            .map((listing, index) => (
              <Fragment key={index}>
              <Property_card listing={listing}/>
              </Fragment>            ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Button variant="outline">View All Properties</Button>
        </div>
      </section>

      {/* Recent Listings */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">Recent Listings</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredListings
            .filter((listing) => !listing?.featured)
            .map((listing, index) => (
              <Fragment key={index}>
              <Property_card listing={listing}/>
              </Fragment>
            ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Button variant="outline">View All Properties</Button>
        </div>
      </section>
    </div>
  )
}
