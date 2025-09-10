'use client'
import { useState } from "react"
import { PostProperty } from "./post-property"

const Edit_Properties = () => {
    const [priceRange, setPriceRange] = useState([50000, 500000])

    return(
<div className='my-5'>
      <PostProperty/>
    </div>
    )
}
export default Edit_Properties;