
import { useState, useEffect } from 'react'
import Header from './header'
import Footer from './footer'

import styles from '../styles/Home.module.css'



export default function  Page(props: any){
  const { children, ...customMeta } = props;

  return (     
    <div>
        <Header/>
        {children}

        <Footer/>
      {/* <footer className={styles.footer}></footer> */}
    </div>         
        
  )
}
