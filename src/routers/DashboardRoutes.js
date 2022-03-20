import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DcScreen } from '../components/dc/DcScreen'
import { HeroScreen } from '../components/heroes/HeroScreen'
import { MarvelScreen } from '../components/marvel/MarvelScreen'
import { SearchScreen } from '../components/search/SearchScreen'
import { Navbar } from '../components/ui/Navbar'

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />

            <div className='container'>
                <Routes>
                    <Route path="marvel" element={<MarvelScreen />} />
                    <Route path="dc" element={<DcScreen />} />

                    <Route path="search" element={<SearchScreen />} />
                    <Route path="hero/:heroId" element={<HeroScreen />} />

                    <Route path="/" element={<MarvelScreen />} />

                    <Route path='*' element={ <Navigate to='/marvel'/>} /> 
                    

                </Routes>
            </div>

        </>
    )
}
