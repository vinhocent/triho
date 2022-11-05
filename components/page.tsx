
import { useState, useEffect } from 'react'
import Header from './header'
import styles from '../styles/Home.module.css'


const Page = () => {

  // useEffect only runs on the client, so now we can safely show the UI

  return (     
    <div>
        <Header/>




      <footer className={styles.footer}></footer>
    </div>         
        
  )
}

export default Page
