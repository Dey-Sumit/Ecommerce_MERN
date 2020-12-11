import React from "react"
import { Helmet } from "react-helmet"

const Meta = ({ title = "Welcome To Shopify", description }) => {
   return (
      <Helmet>
         <title>{title}</title>
         <meta name="description" content={description} />
      </Helmet>
   )
}

export default Meta
