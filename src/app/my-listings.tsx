"use client"
import Image from "next/image"
import { Bath, Bed, Building, Edit, Grid2x2Check, Heart, MapPin, MoreHorizontal, Trash, User } from "lucide-react"

import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/src/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { ActiveTab_Context } from "../components/activeTab-provider"
import { Key, useContext, useEffect, useState } from "react"
import {Get_logged_in_user_listed_properties } from "../lib/user"
import { AuthState_Context} from "../lib/auth_state"
import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel"
import Property_card from "../components/property_card"
import { Approve_property } from "../lib/upload-properties"
import { getApprovedListings, getListings } from "../lib/get_listings"

export function MyListings() {
  // Sample listings data
  interface Listing {
    id: string;
    title: string;
    price: number;
    location: string;
    beds: number;
    baths: number;
    sqft: number;
    type: string;
    images: string[];
    saved?: boolean;
    inquired?: boolean;
    status?: string;
    views?: number;
    inquiries?: number;
  }
  
  const [myListings, setMyListings] = useState<Listing[]>([])
  const [approved_Listings, setApprovedListings] = useState<Listing[]>([])
  const [gettingListings, setGettingListings] = useState(true)
  const {user, loading} = useContext(AuthState_Context)
 

  useEffect(()=>{


  const stored_listings = sessionStorage.getItem('my-listings');
const fetchListings = async () => {
  try{if (stored_listings) {
    console.log('no need fetching', myListings, stored_listings);
    const parsedListings = JSON.parse(stored_listings);
    setMyListings(parsedListings);
    setGettingListings(false);
    console.log(parsedListings, 'my listings');
  } else {
    setGettingListings(true);
  }
}catch(error){
  console.log('error getting from session storage', error)
}};

  const stored_approved_listings = sessionStorage.getItem('approved-listings');
const fetch_ApprovedListings = async () => {
  try{if (stored_approved_listings) {
    console.log('no need fetching', approved_myListings, stored_approved_listings);
    const parsedListings = JSON.parse(stored_approved_listings);
    setApprovedMyListings(parsedListings);
    setGettingListings(false);
    console.log(parsedListings, 'my listings');
  } else {
    setGettingListings(true);
  }
}catch(error){
  console.log('error getting from session storage', error)
}};

fetchListings();
fetch_ApprovedListings();

//fetch listings from firestore if not in session storage and
const get_Listings = async () => {

    try{
      const listings = await getListings();
      // console.log('listings', listings);
        sessionStorage.setItem('my-listings',JSON.stringify(listings));
        const stored_listings = sessionStorage.getItem('my-listings');
        if(stored_listings) setMyListings(JSON.parse(stored_listings))
        setGettingListings(false)}
  
    catch(e){
      setGettingListings(false)
      console.log('error getting listings from firestore')
    }
  }
  //fetch listings from firestore if not in session storage and
const get_ApprovedListings = async () => {

    try{
      const listings = await getApprovedListings();
      // console.log('listings', listings);
        sessionStorage.setItem('approved-listings',JSON.stringify(listings));
        const stored_listings = sessionStorage.getItem('approved-listings');
        if(stored_listings) setApprovedListings(JSON.parse(stored_listings))
        setGettingListings(false)}
  
    catch(e){
      setGettingListings(false)
      console.log('error getting listings from firestore')
    }
  }
  get_Listings();
  get_ApprovedListings();
  },[user, loading])



  //header activetab context
  const { setActiveTab} = useContext(ActiveTab_Context);

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8 max-w-[1200px]">
      <h1 className="mb-6 text-3xl font-bold">My Dashboard</h1>

      <Tabs defaultValue={'approved'} className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="approved">Approved Listings</TabsTrigger>
          <TabsTrigger value="unapproved">Unapproved Listings</TabsTrigger>
          <TabsTrigger value="all">All Listings</TabsTrigger>

        </TabsList>

        <TabsContent value="approved">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Properties You're Selling</h2>
            <Button onClick={()=>{if(setActiveTab) setActiveTab('post')}}>Post New Property</Button>
          </div>

          {user?(!gettingListings ? (myListings?.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="mb-2 text-lg font-medium">No listings yet</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                You haven't posted any properties for sale or rent yet.
              </p>
              <Button>Post Your First Property</Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
             {approved_Listings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                {listing.images==undefined?<Image src={"/placeholder.svg"} alt={listing.title} fill className="object-cover" />
    : <Image src={listing.images[0] || "/placeholder.svg"} alt={listing.title} fill className="object-cover" />
         
}
                  <Badge
                    className={`absolute left-2 top-2 ${
                      listing.status === "Active"
                        ? "bg-green-500"
                        : listing.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  >
                    {listing.status}
                  </Badge>
                  <Badge className="absolute right-2 top-2 bg-primary">${listing.price.toLocaleString()}</Badge>
                </div>
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-center justify-between">
                    <h3 className="line-clamp-1 text-xl font-semibold">{listing.title}</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {/* <DropdownMenuItem className="flex items-center">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Listing
                        </DropdownMenuItem> */}
                        <DropdownMenuItem className="flex items-center text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Listing
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    {listing.location}
                  </p>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center text-sm">
                        <Bed className="mr-1 h-3 w-3" />
                        {listing.beds} bd
                      </span>
                      <span className="flex items-center text-sm">
                        <Bath className="mr-1 h-3 w-3" />
                        {listing.baths} ba
                      </span>
                      <span className="flex items-center text-sm">
                        <Building className="mr-1 h-3 w-3" />
                        {listing.sqft} sqft
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    {/* <span className="flex items-center">
                      <Eye className="mr-1 h-3 w-3" />
                      {listing.views} views
                    </span> */}
                  </div>
                </CardContent>
                <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
                  <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />Edit
                  </Button>
                  <Button size='sm' className="hover:bg-gray-900 dark:hover:bg-gray-200 w-full" asChild>
              <Link href={`/${listing.id}`}>View Details</Link>
          </Button>
                </CardFooter>
              </Card>
              ))} 
            </div>
          )):(<div>loading...</div>)):(
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="mb-2 text-lg font-medium">No listings</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                You are not Signed in
              </p>
              <Button onClick={()=>{ if(setActiveTab) setActiveTab('signin')}}>Click here to Sign in</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="unapproved">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Properties Pending To Be Approved</h2>
            <Button onClick={()=>{if(setActiveTab) setActiveTab('post')}}>Post New Property</Button>
          </div>

          {user?(!gettingListings ? (myListings?.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="mb-2 text-lg font-medium">No listings yet</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                You haven't posted any properties for sale or rent yet.
              </p>
              <Button>Post Your First Property</Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
             {myListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                {listing.images==undefined?<Image src={"/placeholder.svg"} alt={listing.title} fill className="object-cover" />
    : <Image src={listing.images[0] || "/placeholder.svg"} alt={listing.title} fill className="object-cover" />
         
}
                  <Badge
                    className={`absolute left-2 top-2 ${
                      listing.status === "Active"
                        ? "bg-green-500"
                        : listing.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  >
                    {listing.status}
                  </Badge>
                  <Badge className="absolute right-2 top-2 bg-primary">${listing.price.toLocaleString()}</Badge>
                </div>
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-center justify-between">
                    <h3 className="line-clamp-1 text-xl font-semibold">{listing.title}</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center" onClick={()=>{Approve_property(listing.id)}} >
                          <Grid2x2Check className="mr-2 h-4 w-4" />
                          Approve Listing
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Listing
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    {listing.location}
                  </p>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center text-sm">
                        <Bed className="mr-1 h-3 w-3" />
                        {listing.beds} bd
                      </span>
                      <span className="flex items-center text-sm">
                        <Bath className="mr-1 h-3 w-3" />
                        {listing.baths} ba
                      </span>
                      <span className="flex items-center text-sm">
                        <Building className="mr-1 h-3 w-3" />
                        {listing.sqft} sqft
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    {/* <span className="flex items-center">
                      <Eye className="mr-1 h-3 w-3" />
                      {listing.views} views
                    </span> */}
                  </div>
                </CardContent>
                <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
                  <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />Edit
                  </Button>
                  <Button size='sm' className="hover:bg-gray-900 dark:hover:bg-gray-200 w-full" asChild>
              <Link href={`/${listing.id}`}>View Details</Link>
          </Button>
                </CardFooter>
              </Card>
              ))} 
            </div>
          )):(<div>loading...</div>)):(
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="mb-2 text-lg font-medium">No listings</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                You are not Signed in
              </p>
              <Button onClick={()=>{ if(setActiveTab) setActiveTab('signin')}}>Click here to Sign in</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="all">
          {/* <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Properties You're Selling</h2>
            <Button onClick={()=>{if(setActiveTab) setActiveTab('post')}}>Post New Property</Button>
          </div> */}

          {user?(!gettingListings ? (myListings?.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="mb-2 text-lg font-medium">No listings yet</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                You haven't posted any properties for sale or rent yet.
              </p>
              <Button>Post Your First Property</Button>
            </div>
          ) : (
            <div className = 'gap-5'>
             <section className="flex flex-col gap-2"> <h2 className="text-xl font-semibold"> Approved Properties. </h2>
             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {approved_Listings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                {listing.images==undefined?<Image src={"/placeholder.svg"} alt={listing.title} fill className="object-cover" />
    : <Image src={listing.images[0] || "/placeholder.svg"} alt={listing.title} fill className="object-cover" />
         
}
                  <Badge
                    className={`absolute left-2 top-2 ${
                      listing.status === "Active"
                        ? "bg-green-500"
                        : listing.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  >
                    {listing.status}
                  </Badge>
                  <Badge className="absolute right-2 top-2 bg-primary">${listing.price.toLocaleString()}</Badge>
                </div>
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-center justify-between">
                    <h3 className="line-clamp-1 text-xl font-semibold">{listing.title}</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {/* <DropdownMenuItem className="flex items-center">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Listing
                        </DropdownMenuItem> */}
                        <DropdownMenuItem className="flex items-center text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Listing
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    {listing.location}
                  </p>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center text-sm">
                        <Bed className="mr-1 h-3 w-3" />
                        {listing.beds} bd
                      </span>
                      <span className="flex items-center text-sm">
                        <Bath className="mr-1 h-3 w-3" />
                        {listing.baths} ba
                      </span>
                      <span className="flex items-center text-sm">
                        <Building className="mr-1 h-3 w-3" />
                        {listing.sqft} sqft
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    {/* <span className="flex items-center">
                      <Eye className="mr-1 h-3 w-3" />
                      {listing.views} views
                    </span> */}
                  </div>
                </CardContent>
                <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
                  <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />Edit
                  </Button>
                  <Button size='sm' className="hover:bg-gray-900 dark:hover:bg-gray-200 w-full" asChild>
              <Link href={`/${listing.id}`}>View Details</Link>
          </Button>
                </CardFooter>
              </Card>
              ))}
              </div> 
              </section>
               <section className="flex flex-col gap-2 mt-8"><h2 className ='text-xl font-semibold'> Pending To Be Approved Properties. </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {myListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                {listing.images==undefined?<Image src={"/placeholder.svg"} alt={listing.title} fill className="object-cover" />
    : <Image src={listing.images[0] || "/placeholder.svg"} alt={listing.title} fill className="object-cover" />
         
}
                  <Badge
                    className={`absolute left-2 top-2 ${
                      listing.status === "Active"
                        ? "bg-green-500"
                        : listing.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  >
                    {listing.status}
                  </Badge>
                  <Badge className="absolute right-2 top-2 bg-primary">${listing.price.toLocaleString()}</Badge>
                </div>
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-center justify-between">
                    <h3 className="line-clamp-1 text-xl font-semibold">{listing.title}</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {/* <DropdownMenuItem className="flex items-center">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Listing
                        </DropdownMenuItem> */}
                        <DropdownMenuItem className="flex items-center text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Listing
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    {listing.location}
                  </p>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center text-sm">
                        <Bed className="mr-1 h-3 w-3" />
                        {listing.beds} bd
                      </span>
                      <span className="flex items-center text-sm">
                        <Bath className="mr-1 h-3 w-3" />
                        {listing.baths} ba
                      </span>
                      <span className="flex items-center text-sm">
                        <Building className="mr-1 h-3 w-3" />
                        {listing.sqft} sqft
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    {/* <span className="flex items-center">
                      <Eye className="mr-1 h-3 w-3" />
                      {listing.views} views
                    </span> */}
                  </div>
                </CardContent>
                <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
                  <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />Edit
                  </Button>
                  <Button size='sm' className="hover:bg-gray-900 dark:hover:bg-gray-200 w-full" asChild>
              <Link href={`/${listing.id}`}>View Details</Link>
          </Button>
                </CardFooter>
              </Card>
              ))} 
              </div>
              </section>
            </div>
          )):(<div>loading...</div>)):(
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="mb-2 text-lg font-medium">No listings</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                You are not Signed in
              </p>
              <Button onClick={()=>{ if(setActiveTab) setActiveTab('signin')}}>Click here to Sign in</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
