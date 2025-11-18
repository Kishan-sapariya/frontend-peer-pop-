"use client"

import CompanyMarquee from '@/component/landing page/CompanyMarquee'
import ContentSlide from '@/component/landing page/ContentSlide'
import CTASection from '@/component/landing page/cta'
import Footer from '@/component/landing page/Footer'
import ForUsers from '@/component/landing page/ForUsers'
import HeroSection from '@/component/landing page/HeroSection'
import SeeAction from '@/component/landing page/SeeAction'
import Stats from '@/component/landing page/Stats'
import React from 'react'

const page = () => {
  return (
    <div>
       <HeroSection />
        <Stats />
        <SeeAction />
        <CompanyMarquee />
        <ContentSlide />
        <ForUsers />
        <CTASection />
        <Footer />
    </div>
  )
}

export default page
