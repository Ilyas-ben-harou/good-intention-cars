// src/components/client/Dashboard.js
import React, { useEffect, useState } from 'react'
import HeroSection from './HeroSection';
import SearchForm from './SearchForm';
import HowItWorks from './HowItWorks';
import PopularCars from './PopularCars';
import BrandLogos from './BrandLogos';
import WhyChooseUs from './WhyChooseUs';
import TestimonialsS from './TestimonialsS';
import GoogleMaps from './GoogleMaps';
import { clientAxios } from '../../../api/axios';
import Contact from '../contact/Contact';
const Dashboard = () => {
    const [cars,setCars]=useState()
    useEffect(()=>{
        clientAxios.get('/car').then(response=>{
            setCars(response.data.cars)
        }).catch(err=>{
            console.error(err)
        })
    },[])
    return (
        <div className="bg-white">
            <HeroSection />
            {/* <SearchForm /> */}
            <HowItWorks />
            <PopularCars cars={cars}/>
            <BrandLogos />
            <WhyChooseUs />
            <Contact />
            <GoogleMaps />
        </div>
    )
}

export default Dashboard
