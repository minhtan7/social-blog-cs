import React from 'react'

import {
  Container,
} from "react-bootstrap";


export default function Footer() {
 const now = new Date();
 const year = now.getFullYear();

 return (
   <Container
     fluid
     className="d-flex align-items-center justify-content-center"
   >
     <p className="d-flex align-items-center justify-content-center footer">
       Made with ❤️ by {"  "}
       <a className="m-1" href="https://github.com/PrimeTimeTran">
         PrimeTimeTran
       </a>
       {year}
     </p>
   </Container>
 );
}
