"use client"
import Image from "next/image"
import { Bath, Bed, Building, Edit, Grid2x2Check, Heart, MapPin, MoreHorizontal, Trash, User } from "lucide-react"

import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/src/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { ActiveTab_Context } from "../../components/activeTab-provider"
import { Key, useContext, useEffect, useState } from "react"
import {Get_logged_in_user_listed_properties } from "../../lib/user"
import { AuthState_Context} from "../../lib/auth_state"
import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../components/ui/carousel"
import Property_card from "../../components/property_card"
import { Approve_property, Approved_property, delete_property, Property } from "../../lib/upload-properties"
import { getApprovedListings, getListings } from "../../lib/get_listings"
import { Edit_listing_Context } from "@/src/components/edit-listing-provider"

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
    images: object[];
    saved?: boolean;
    inquired?: boolean;
    status?: string;
    views?: number;
    inquiries?: number;
  }
  
  const [myListings, setMyListings] = useState<Property[]>([])
  const [approved_Listings, setApprovedListings] = useState<Approved_property[]>([])
  const [gettingListings, setGettingListings] = useState(true)
  const {user, loading} = useContext(AuthState_Context)
 

  //fetch listings from firestore if not in session storage and
const get_Listings = async () => {

    try{
      console.log('entered getListings')
      const listings = await getListings();
      // console.log('listings', listings);
        sessionStorage.setItem('my-listings',JSON.stringify(listings));
        localStorage.setItem('my-listings',JSON.stringify(listings));

        const stored_listings = JSON.parse(sessionStorage.getItem('my-listings')||'[]');
                        console.log(stored_listings, stored_listings?.length,sessionStorage.getItem('my-listings'))

        if(stored_listings?.length>=1) {setMyListings(stored_listings)}
        //REMEMBER TO REMOVE
        //REMEMBER TO REMOVE
        //REMEMBER TO REMOVE
        //REMEMBER TO REMOVE
        //REMEMBER TO REMOVE
        if(stored_listings?.length==0){
          const a = JSON.stringify([{"parking":"","role":"Landlord","price":32,"location":", , , , ","label":"FOR__SALE","updatedAt":"2025-07-12T02:00:45.313Z","bathrooms":"0","id":"0BCbz04ZSwXM48iObxUB","bedrooms":"0","property_type":"","description":"","rent_period":"monthly","createdAt":"2025-07-12T02:00:45.313Z","images":[],"address":", , , , ","areaSqFt":"","title":"df"},{"id":"0OFUI7BTqDULUrz14jTx","title":"jdkjfkd","price":3333,"address":"dkjfkdjfk, , dkfjkdkf, , ","areaSqFt":"393939","location":"dkjfkdjfk, , dkfjkdkf, , ","images":[],"parking":"","createdAt":"2025-07-12T01:53:38.028Z","label":"FOR__SALE","rent_period":"monthly","updatedAt":"2025-07-12T01:53:38.028Z","bathrooms":"3","bedrooms":"2","description":"kdjfkdjk","role":"Landlord","property_type":"house"},{"property_type":"","images":[],"label":"FOR__SALE","id":"5p3UzwZd7gQjWKXtnYlR","title":"fdgf","bedrooms":"0","parking":"","role":"Landlord","address":", , , , ","createdAt":"2025-07-12T01:59:33.048Z","description":"","areaSqFt":"","price":43554,"rent_period":"monthly","bathrooms":"0","updatedAt":"2025-07-12T01:59:33.048Z","location":", , , , "},{"bathrooms":"","address":"undefined,undefined","propertyType":"","updatedAt":"2025-07-10T03:32:45.766Z","id":"AbNDUFeY1WvknOHy4NcX","description":"A 4-bedroom detached house with bq attached\nLocation: Crown Estate Sangtedo Eti- Osa LCDA Lekki Phase 2 Lagos ","areaSqFt":"","role":"Agent","bedrooms":"","parking":"","label":"FOR__SALE","images":[],"createdAt":"2025-07-10T03:32:45.766Z","price":150000000,"title":"A 4-Bedroom Detached House with Bq Attached"},{"images":[],"id":"XFlCeOPIRsHLu72qTUFW","role":"Landlord","rent_period":"monthly","parking":"","label":"FOR__SALE","areaSqFt":"393939","price":3333,"location":"dkjfkdjfk, , dkfjkdkf, , ","bathrooms":"3","address":"dkjfkdjfk, , dkfjkdkf, , ","createdAt":"2025-07-12T01:53:28.013Z","description":"kdjfkdjk","bedrooms":"2","title":"jdkjfkd","property_type":"house","updatedAt":"2025-07-12T01:53:28.013Z"},{"createdAt":"2025-07-12T01:44:54.787Z","updatedAt":"2025-07-12T01:44:54.787Z","areaSqFt":"393939","bathrooms":"3","location":"dkjfkdjfk, , dkfjkdkf, , ","property_type":"house","address":"dkjfkdjfk, , dkfjkdkf, , ","parking":"","images":[],"bedrooms":"2","rent_period":"monthly","title":"jdkjfkd","id":"XLMVwUrwCfyC0tgMcC5g","role":"Landlord","label":"FOR__SALE","price":3333,"description":"kdjfkdjk"},{"bathrooms":"1","rent_period":"monthly","title":"property5","images":[{"imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/dd646ac5-0657-46b7-9d8c-346ae746a47dEAST-COURT-LOGO-1.png","type":"image"},{"imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/46b8fe61-453e-4708-9374-49383f2feea7EAST-COURT-LOGO-1.png","type":"image"},{"type":"image","imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/96e8d371-0816-4b70-bb91-12a55cdea983EAST-COURT-LOGO-1.png"},{"type":"image","imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/4fd919ff-bd83-4af4-93f8-b337dd506a5dEAST-COURT-LOGO-2.png"},{"imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/62860e08-2fd8-449a-bd3b-a8ad599707f7for_loyal_bigdoggydog.png","type":"image"},{"imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/62860e08-2fd8-449a-bd3b-a8ad599707f7for_revered_bigdoggydog.png","type":"image"},{"type":"image","imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/62860e08-2fd8-449a-bd3b-a8ad599707f7for_valued_homie.png"},{"type":"image","imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/62860e08-2fd8-449a-bd3b-a8ad599707f7linkedin-logo-black-sqaure-15921.png"},{"imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/62860e08-2fd8-449a-bd3b-a8ad599707f7location-2952.png","type":"image"},{"imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/62860e08-2fd8-449a-bd3b-a8ad599707f7mail-142.png","type":"image"},{"imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/62860e08-2fd8-449a-bd3b-a8ad599707f7phone-3114.png","type":"image"},{"imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/62860e08-2fd8-449a-bd3b-a8ad599707f7twitter-x-logo-black-square-rounded-outline-20849.png","type":"image"},{"type":"image","imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/62860e08-2fd8-449a-bd3b-a8ad599707f7undefined%20linkedin-logo-black-sqaure-15921.png"}],"areaSqFt":"3000","price":20000000,"description":"for sale","parking":"","bedrooms":"1","role":"Agent","updatedAt":"2025-07-12T01:33:40.665Z","createdAt":"2025-07-12T01:33:40.664Z","label":"FOR__SALE","address":"lagos, lagos, lagos, , Nigeria","location":"lagos, lagos, lagos, , Nigeria","property_type":"house","id":"YVSuIYObss4LBc7RsigR"},{"updatedAt":"2025-07-12T01:58:07.655Z","label":"FOR__SALE","images":[],"description":"","location":", , , , ","bathrooms":"0","title":"dsdxc","id":"aJ8RGwkNSvpLfqXoAAu7","areaSqFt":"","parking":"","property_type":"","address":", , , , ","rent_period":"monthly","createdAt":"2025-07-12T01:58:07.655Z","bedrooms":"0","role":"Agent","price":222},{"bathrooms":"3","address":"dkjfkdjfk, , dkfjkdkf, , ","updatedAt":"2025-07-12T01:57:40.658Z","description":"kdjfkdjk","id":"dMGLeQOjYFsBAwcHh5cg","rent_period":"monthly","areaSqFt":"393939","location":"dkjfkdjfk, , dkfjkdkf, , ","bedrooms":"2","role":"Landlord","parking":"","label":"FOR__SALE","images":[],"createdAt":"2025-07-12T01:57:40.658Z","price":3333,"title":"jdkjfkd","property_type":"house"},{"bathrooms":"3","rent_period":"monthly","title":"jdkjfkd","images":[{"type":"image","imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/6d572af6-cbe6-4d1b-95ca-6cf51e3769effor_loyal_bigdoggydog.png"}],"areaSqFt":"393939","price":3333,"description":"kdjfkdjk","parking":"","role":"Landlord","bedrooms":"2","createdAt":"2025-07-12T01:42:09.797Z","updatedAt":"2025-07-12T01:42:09.797Z","label":"FOR__SALE","address":"dkjfkdjfk, , dkfjkdkf, , ","location":"dkjfkdjfk, , dkfjkdkf, , ","property_type":"house","id":"dNOtDpFC6W4ztmy8DDab"},{"updatedAt":"2025-07-12T01:57:37.312Z","parking":"","price":3333,"images":[],"role":"Landlord","id":"eukxoiIj6k4tICOPAuSm","bedrooms":"2","property_type":"house","label":"FOR__SALE","createdAt":"2025-07-12T01:57:37.312Z","address":"dkjfkdjfk, , dkfjkdkf, , ","rent_period":"monthly","bathrooms":"3","description":"kdjfkdjk","areaSqFt":"393939","title":"jdkjfkd","location":"dkjfkdjfk, , dkfjkdkf, , "},{"bedrooms":"2","bathrooms":"3","createdAt":"2025-07-12T01:47:22.748Z","property_type":"house","location":"dkjfkdjfk, , dkfjkdkf, , ","role":"Landlord","id":"gk0Io54ZwonJ8KzugTSn","updatedAt":"2025-07-12T01:47:22.748Z","rent_period":"monthly","label":"FOR__SALE","images":[],"address":"dkjfkdjfk, , dkfjkdkf, , ","title":"jdkjfkd","areaSqFt":"393939","parking":"","description":"kdjfkdjk","price":3333},{"updatedAt":"2025-07-12T01:56:33.710Z","parking":"","price":3333,"images":[],"role":"Landlord","id":"jVrjGD0vEokykcpNRezi","bedrooms":"2","property_type":"house","label":"FOR__SALE","createdAt":"2025-07-12T01:56:33.710Z","rent_period":"monthly","address":"dkjfkdjfk, , dkfjkdkf, , ","description":"kdjfkdjk","bathrooms":"3","areaSqFt":"393939","location":"dkjfkdjfk, , dkfjkdkf, , ","title":"jdkjfkd"},{"parking":"","price":3333,"address":"dkjfkdjfk, , dkfjkdkf, , ","location":"dkjfkdjfk, , dkfjkdkf, , ","createdAt":"2025-07-12T01:53:46.157Z","areaSqFt":"393939","updatedAt":"2025-07-12T01:53:46.157Z","images":[],"label":"FOR__SALE","bathrooms":"3","role":"Landlord","rent_period":"monthly","property_type":"house","description":"kdjfkdjk","title":"jdkjfkd","id":"lrgp8U90vssABD1FevbH","bedrooms":"2"},{"images":[],"role":"Landlord","updatedAt":"2025-07-12T01:43:48.739Z","property_type":"house","address":"dkjfkdjfk, , dkfjkdkf, , ","areaSqFt":"393939","price":3333,"location":"dkjfkdjfk, , dkfjkdkf, , ","title":"jdkjfkd","label":"FOR__SALE","description":"kdjfkdjk","bedrooms":"2","bathrooms":"3","createdAt":"2025-07-12T01:43:48.739Z","rent_period":"monthly","id":"uYHPM08iYtPzowsFkjnA","parking":""},{"bedrooms":"1","location":"lagos, lagos, lagos, , Nigeria","parking":"","property_type":"house","updatedAt":"2025-07-12T01:40:52.304Z","areaSqFt":"3000","address":"lagos, lagos, lagos, , Nigeria","title":"property5","description":"for sale","label":"FOR__SALE","role":"Agent","price":20000000,"images":[{"imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/718cbf17-efb9-42cf-8f04-074385abd27bProtergia_energy_logo_white-edit.png","type":"image"}],"rent_period":"monthly","bathrooms":"1","createdAt":"2025-07-12T01:40:52.304Z","id":"xnLD58Awel8yQzxVoZlg"}])

          setMyListings(JSON.parse(a))}
        setGettingListings(false)

      }catch(e){
      setGettingListings(false)
      console.log('error getting listings from firestore',e)
    }
  }
  useEffect(()=>{        console.log(myListings)
},[myListings])
  //fetch listings from firestore if not in session storage and
const get_ApprovedListings = async () => {

    try{
      const listings = await getApprovedListings();
      // console.log('listings', listings);
        sessionStorage.setItem('approved-listings',JSON.stringify(listings));
        const stored_listings = JSON.parse(sessionStorage.getItem('approved-listings')||'[]');
        if(stored_listings){ setApprovedListings(stored_listings)}
        //REMEMBER TO REMOVE
        //REMEMBER TO REMOVE
        //REMEMBER TO REMOVE
        //REMEMBER TO REMOVE
        //REMEMBER TO REMOVE
        if(stored_listings?.length==0){
          const a = JSON.stringify([{"parking":"","role":"Landlord","price":32,"location":", , , , ","label":"FOR__SALE","updatedAt":"2025-07-12T02:00:45.313Z","bathrooms":"0","id":"0BCbz04ZSwXM48iObxUB","bedrooms":"0","property_type":"","description":"","rent_period":"monthly","createdAt":"2025-07-12T02:00:45.313Z","images":[],"address":", , , , ","areaSqFt":"","title":"df"},{"id":"0OFUI7BTqDULUrz14jTx","title":"jdkjfkd","price":3333,"address":"dkjfkdjfk, , dkfjkdkf, , ","areaSqFt":"393939","location":"dkjfkdjfk, , dkfjkdkf, , ","images":[],"parking":"","createdAt":"2025-07-12T01:53:38.028Z","label":"FOR__SALE","rent_period":"monthly","updatedAt":"2025-07-12T01:53:38.028Z","bathrooms":"3","bedrooms":"2","description":"kdjfkdjk","role":"Landlord","property_type":"house"},{"property_type":"","images":[],"label":"FOR__SALE","id":"5p3UzwZd7gQjWKXtnYlR","title":"fdgf","bedrooms":"0","parking":"","role":"Landlord","address":", , , , ","createdAt":"2025-07-12T01:59:33.048Z","description":"","areaSqFt":"","price":43554,"rent_period":"monthly","bathrooms":"0","updatedAt":"2025-07-12T01:59:33.048Z","location":", , , , "},{"bathrooms":"","address":"undefined,undefined","propertyType":"","updatedAt":"2025-07-10T03:32:45.766Z","id":"AbNDUFeY1WvknOHy4NcX","description":"A 4-bedroom detached house with bq attached\nLocation: Crown Estate Sangtedo Eti- Osa LCDA Lekki Phase 2 Lagos ","areaSqFt":"","role":"Agent","bedrooms":"","parking":"","label":"FOR__SALE","images":[],"createdAt":"2025-07-10T03:32:45.766Z","price":150000000,"title":"A 4-Bedroom Detached House with Bq Attached"},{"images":[],"id":"XFlCeOPIRsHLu72qTUFW","role":"Landlord","rent_period":"monthly","parking":"","label":"FOR__SALE","areaSqFt":"393939","price":3333,"location":"dkjfkdjfk, , dkfjkdkf, , ","bathrooms":"3","address":"dkjfkdjfk, , dkfjkdkf, , ","createdAt":"2025-07-12T01:53:28.013Z","description":"kdjfkdjk","bedrooms":"2","title":"jdkjfkd","property_type":"house","updatedAt":"2025-07-12T01:53:28.013Z"},{"createdAt":"2025-07-12T01:44:54.787Z","updatedAt":"2025-07-12T01:44:54.787Z","areaSqFt":"393939","bathrooms":"3","location":"dkjfkdjfk, , dkfjkdkf, , ","property_type":"house","address":"dkjfkdjfk, , dkfjkdkf, , ","parking":"","images":[],"bedrooms":"2","rent_period":"monthly","title":"jdkjfkd","id":"XLMVwUrwCfyC0tgMcC5g","role":"Landlord","label":"FOR__SALE","price":3333,"description":"kdjfkdjk"},{"bathrooms":"1","rent_period":"monthly","title":"property5","images":[{"imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/dd646ac5-0657-46b7-9d8c-346ae746a47dEAST-COURT-LOGO-1.png","type":"image"},{"imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/46b8fe61-453e-4708-9374-49383f2feea7EAST-COURT-LOGO-1.png","type":"image"},{"type":"image","imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/96e8d371-0816-4b70-bb91-12a55cdea983EAST-COURT-LOGO-1.png"},{"type":"image","imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/4fd919ff-bd83-4af4-93f8-b337dd506a5dEAST-COURT-LOGO-2.png"},{"imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/62860e08-2fd8-449a-bd3b-a8ad599707f7for_loyal_bigdoggydog.png","type":"image"},{"imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/62860e08-2fd8-449a-bd3b-a8ad599707f7for_revered_bigdoggydog.png","type":"image"},{"type":"image","imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/62860e08-2fd8-449a-bd3b-a8ad599707f7for_valued_homie.png"},{"type":"image","imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/62860e08-2fd8-449a-bd3b-a8ad599707f7linkedin-logo-black-sqaure-15921.png"},{"imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/62860e08-2fd8-449a-bd3b-a8ad599707f7location-2952.png","type":"image"},{"imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/62860e08-2fd8-449a-bd3b-a8ad599707f7mail-142.png","type":"image"},{"imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/62860e08-2fd8-449a-bd3b-a8ad599707f7phone-3114.png","type":"image"},{"imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/62860e08-2fd8-449a-bd3b-a8ad599707f7twitter-x-logo-black-square-rounded-outline-20849.png","type":"image"},{"type":"image","imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/62860e08-2fd8-449a-bd3b-a8ad599707f7undefined%20linkedin-logo-black-sqaure-15921.png"}],"areaSqFt":"3000","price":20000000,"description":"for sale","parking":"","bedrooms":"1","role":"Agent","updatedAt":"2025-07-12T01:33:40.665Z","createdAt":"2025-07-12T01:33:40.664Z","label":"FOR__SALE","address":"lagos, lagos, lagos, , Nigeria","location":"lagos, lagos, lagos, , Nigeria","property_type":"house","id":"YVSuIYObss4LBc7RsigR"},{"updatedAt":"2025-07-12T01:58:07.655Z","label":"FOR__SALE","images":[],"description":"","location":", , , , ","bathrooms":"0","title":"dsdxc","id":"aJ8RGwkNSvpLfqXoAAu7","areaSqFt":"","parking":"","property_type":"","address":", , , , ","rent_period":"monthly","createdAt":"2025-07-12T01:58:07.655Z","bedrooms":"0","role":"Agent","price":222},{"bathrooms":"3","address":"dkjfkdjfk, , dkfjkdkf, , ","updatedAt":"2025-07-12T01:57:40.658Z","description":"kdjfkdjk","id":"dMGLeQOjYFsBAwcHh5cg","rent_period":"monthly","areaSqFt":"393939","location":"dkjfkdjfk, , dkfjkdkf, , ","bedrooms":"2","role":"Landlord","parking":"","label":"FOR__SALE","images":[],"createdAt":"2025-07-12T01:57:40.658Z","price":3333,"title":"jdkjfkd","property_type":"house"},{"bathrooms":"3","rent_period":"monthly","title":"jdkjfkd","images":[{"type":"image","imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/6d572af6-cbe6-4d1b-95ca-6cf51e3769effor_loyal_bigdoggydog.png"}],"areaSqFt":"393939","price":3333,"description":"kdjfkdjk","parking":"","role":"Landlord","bedrooms":"2","createdAt":"2025-07-12T01:42:09.797Z","updatedAt":"2025-07-12T01:42:09.797Z","label":"FOR__SALE","address":"dkjfkdjfk, , dkfjkdkf, , ","location":"dkjfkdjfk, , dkfjkdkf, , ","property_type":"house","id":"dNOtDpFC6W4ztmy8DDab"},{"updatedAt":"2025-07-12T01:57:37.312Z","parking":"","price":3333,"images":[],"role":"Landlord","id":"eukxoiIj6k4tICOPAuSm","bedrooms":"2","property_type":"house","label":"FOR__SALE","createdAt":"2025-07-12T01:57:37.312Z","address":"dkjfkdjfk, , dkfjkdkf, , ","rent_period":"monthly","bathrooms":"3","description":"kdjfkdjk","areaSqFt":"393939","title":"jdkjfkd","location":"dkjfkdjfk, , dkfjkdkf, , "},{"bedrooms":"2","bathrooms":"3","createdAt":"2025-07-12T01:47:22.748Z","property_type":"house","location":"dkjfkdjfk, , dkfjkdkf, , ","role":"Landlord","id":"gk0Io54ZwonJ8KzugTSn","updatedAt":"2025-07-12T01:47:22.748Z","rent_period":"monthly","label":"FOR__SALE","images":[],"address":"dkjfkdjfk, , dkfjkdkf, , ","title":"jdkjfkd","areaSqFt":"393939","parking":"","description":"kdjfkdjk","price":3333},{"updatedAt":"2025-07-12T01:56:33.710Z","parking":"","price":3333,"images":[],"role":"Landlord","id":"jVrjGD0vEokykcpNRezi","bedrooms":"2","property_type":"house","label":"FOR__SALE","createdAt":"2025-07-12T01:56:33.710Z","rent_period":"monthly","address":"dkjfkdjfk, , dkfjkdkf, , ","description":"kdjfkdjk","bathrooms":"3","areaSqFt":"393939","location":"dkjfkdjfk, , dkfjkdkf, , ","title":"jdkjfkd"},{"parking":"","price":3333,"address":"dkjfkdjfk, , dkfjkdkf, , ","location":"dkjfkdjfk, , dkfjkdkf, , ","createdAt":"2025-07-12T01:53:46.157Z","areaSqFt":"393939","updatedAt":"2025-07-12T01:53:46.157Z","images":[],"label":"FOR__SALE","bathrooms":"3","role":"Landlord","rent_period":"monthly","property_type":"house","description":"kdjfkdjk","title":"jdkjfkd","id":"lrgp8U90vssABD1FevbH","bedrooms":"2"},{"images":[],"role":"Landlord","updatedAt":"2025-07-12T01:43:48.739Z","property_type":"house","address":"dkjfkdjfk, , dkfjkdkf, , ","areaSqFt":"393939","price":3333,"location":"dkjfkdjfk, , dkfjkdkf, , ","title":"jdkjfkd","label":"FOR__SALE","description":"kdjfkdjk","bedrooms":"2","bathrooms":"3","createdAt":"2025-07-12T01:43:48.739Z","rent_period":"monthly","id":"uYHPM08iYtPzowsFkjnA","parking":""},{"bedrooms":"1","location":"lagos, lagos, lagos, , Nigeria","parking":"","property_type":"house","updatedAt":"2025-07-12T01:40:52.304Z","areaSqFt":"3000","address":"lagos, lagos, lagos, , Nigeria","title":"property5","description":"for sale","label":"FOR__SALE","role":"Agent","price":20000000,"images":[{"imageUrl":"https://ejhtl7z1mmsysnco.public.blob.vercel-storage.com/718cbf17-efb9-42cf-8f04-074385abd27bProtergia_energy_logo_white-edit.png","type":"image"}],"rent_period":"monthly","bathrooms":"1","createdAt":"2025-07-12T01:40:52.304Z","id":"xnLD58Awel8yQzxVoZlg"}])

          setApprovedListings(JSON.parse(a))}
        setGettingListings(false)}
  
    catch(e){
      setGettingListings(false)
      console.log('error getting listings from firestore')
    }
  }

  // Fetch listings from session storage or firestore
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
  try{
    if (stored_approved_listings) {
    console.log('no need fetching', approved_Listings, stored_approved_listings);
    const parsedListings = JSON.parse(stored_approved_listings);
    setApprovedListings(parsedListings);
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


  get_Listings();
  get_ApprovedListings();
  },[user, loading])



  //header activetab context
  const { setActiveTab} = useContext(ActiveTab_Context);
  const { setEdit_list, setEdit_list_approved} = useContext(Edit_listing_Context);

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

          {user?
          (!gettingListings ? 
            (approved_Listings?.length === 0 ? 
              (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="mb-2 text-lg font-medium">No listings yet</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                You haven't approved any properties for sale or rent yet.
              </p>
              <Button>Post Your First Property</Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
             {approved_Listings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                {!listing.images || listing.images.length==0?<Image src={"/placeholder.svg"} alt={''} fill className="object-cover" />
    : <Image src={listing.images[0].imageUrl || "/placeholder.svg"} alt={listing.images[0].imageUrl || "Property image"} fill className="object-cover" />
         
}
              
                  <Badge className="absolute right-2 top-2 bg-primary">${(listing.price ?? 0).toLocaleString()}</Badge>
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
                        <DropdownMenuItem className="flex items-center text-destructive" onClick={async ()=>{ await delete_property((listing.id)??'',true); sessionStorage.removeItem('approved-listings'); get_ApprovedListings()}}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Listing
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground ">
                    <MapPin className="mr-1 h-3 w-3" />
                    <p className="line-clamp-1">{listing.address}</p>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center text-sm">
                        <Bed className="mr-1 h-3 w-3" />
                        {listing.bedrooms} bd
                      </span>
                      <span className="flex items-center text-sm">
                        <Bath className="mr-1 h-3 w-3" />
                        {listing.bathrooms} ba
                      </span>
                      <span className="flex items-center text-sm">
                        <Building className="mr-1 h-3 w-3" />
                        {listing.areaSqFt} sqft
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
                  <Button variant="outline" size="sm" onClick={()=>{if(setActiveTab){ setActiveTab('edit-properties')} 
                  if(setEdit_list){setEdit_list(listing)}
                  if(setEdit_list_approved){setEdit_list_approved(true)}
                  }}>
                  <Edit className="mr-2 h-4 w-4" />Edit
                  </Button>
                  <Button size='sm' className="hover:bg-gray-900 dark:hover:bg-gray-200 w-full" asChild>
              <Link href={`/eastcourt_admin/${listing.id}`}>View Details</Link>
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
{!listing.images || listing.images.length === 0
  ? <Image src={"/placeholder.svg"} alt={''} fill className="object-cover" />
  : <Image src={(listing.images[0]?.imageUrl) ?? "/placeholder.svg"} alt={listing.images[0]?.imageUrl || "/placeholder.svg"} fill className="object-cover" />
}
                  
                  <Badge className="absolute right-2 top-2 bg-primary">${(listing.price??0).toLocaleString()}</Badge>
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
                        <DropdownMenuItem className="flex items-center" onClick={async ()=>{ await Approve_property((listing.id)??''); sessionStorage.removeItem('my-listings'); get_Listings()}} >
                          <Grid2x2Check className="mr-2 h-4 w-4" />
                          Approve Listing
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center text-destructive" onClick={async ()=>{ await delete_property((listing.id)??''); sessionStorage.removeItem('my-listings'); get_Listings()}}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Listing
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    {listing.address}
                  </p>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center text-sm">
                        <Bed className="mr-1 h-3 w-3" />
                        {listing.bedrooms} bd
                      </span>
                      <span className="flex items-center text-sm">
                        <Bath className="mr-1 h-3 w-3" />
                        {listing.bathrooms} ba
                      </span>
                      <span className="flex items-center text-sm">
                        <Building className="mr-1 h-3 w-3" />
                        {listing.areaSqFt} sqft
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
                  <Button variant="outline" size="sm" onClick={()=>{if(setActiveTab){ setActiveTab('edit-properties')} 
                  if(setEdit_list){setEdit_list(listing)}                  
                  if(setEdit_list_approved){setEdit_list_approved(false)}

                  }}>                  
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

          {user?(!gettingListings ? (approved_Listings?.length === 0 ? (
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
                {!listing.images || listing.images.length==0?<Image src={"/placeholder.svg"} alt={''} fill className="object-cover" />
    : <Image src={listing.images[0].imageUrl || "/placeholder.svg"} alt={listing.images[0].imageUrl || "/placeholder.svg"} fill className="object-cover" />
         
}
                  {/* <Badge
                    className={`absolute left-2 top-2 ${
                      listing.status === "Active"
                        ? "bg-green-500"
                        : listing.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  >
                    {listing.status}
                  </Badge> */}
                  <Badge className="absolute right-2 top-2 bg-primary">${(listing.price??0).toLocaleString()}</Badge>
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
                        <DropdownMenuItem className="flex items-center text-destructive" onClick={async ()=>{ await delete_property((listing.id)??'',true); sessionStorage.removeItem('approved-listings'); get_ApprovedListings()}}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Listing
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    {listing.address}
                  </p>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center text-sm">
                        <Bed className="mr-1 h-3 w-3" />
                        {listing.bedrooms} bd
                      </span>
                      <span className="flex items-center text-sm">
                        <Bath className="mr-1 h-3 w-3" />
                        {listing.bathrooms} ba
                      </span>
                      <span className="flex items-center text-sm">
                        <Building className="mr-1 h-3 w-3" />
                        {listing.areaSqFt} sqft
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
                {!listing.images || listing.images.length==0?<Image src={"/placeholder.svg"} alt={''} fill className="object-cover" />
    : <Image src={listing.images[0].imageUrl || "/placeholder.svg"} alt={listing.images[0].imageUrl || "/placeholder.svg"} fill className="object-cover" />
         
}
                  {/* <Badge
                    className={`absolute left-2 top-2 ${
                      listing.status === "Active"
                        ? "bg-green-500"
                        : listing.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  >
                    {listing.status}
                  </Badge> */}
                  <Badge className="absolute right-2 top-2 bg-primary">${(listing.price??0).toLocaleString()}</Badge>
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
                         <DropdownMenuItem className="flex items-center" onClick={async ()=>{ await Approve_property((listing.id)??''); sessionStorage.removeItem('my-listings'); get_Listings()}} >
                          <Grid2x2Check className="mr-2 h-4 w-4" />
                          Approve Listing
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center text-destructive" onClick={async ()=>{ await delete_property((listing.id)??''); sessionStorage.removeItem('my-listings'); get_Listings()}}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Listing
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    {listing.address}
                  </p>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center text-sm">
                        <Bed className="mr-1 h-3 w-3" />
                        {listing.bedrooms} bd
                      </span>
                      <span className="flex items-center text-sm">
                        <Bath className="mr-1 h-3 w-3" />
                        {listing.bathrooms} ba
                      </span>
                      <span className="flex items-center text-sm">
                        <Building className="mr-1 h-3 w-3" />
                        {listing.areaSqFt} sqft
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
