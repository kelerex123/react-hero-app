import React from 'react'

import {heroes} from '../../data/heroes'
import {HeroCard} from '../../components/heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useLocation, useNavigate } from 'react-router-dom';

import queryString from 'query-string'
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { useMemo } from 'react';

export const SearchScreen = () => {

    const navigate = useNavigate();
    const location = useLocation();
    

    const {q = ''} = queryString.parse(location.search)


    const [formValues, handleInputChange] = useForm({
        searchText: q
    });
    
    const {searchText} = formValues;
    
    const heroesFiltered =  useMemo(() => getHeroesByName(q), [q])

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`?q=${searchText}`)
    }

    return (
        <>
            <h1>SearchScreen</h1>
            <hr />

            <div className='row'>
                <div className="col-5">
                    <h4>Buscar</h4>
                    <hr />

                    <form onSubmit={ handleSearch }>
                        <input 
                            type="text"
                            placeholder="Buscar un héroe"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={ searchText }
                            onChange={ handleInputChange }
                        />


                        <button 
                            className="btn btn-outline-primary mt-1"
                            type="submit">
                            Buscar...
                        </button>

                    </form>


                </div>

                <div className='col-7'>
                    <h4>Resultados</h4>
                    <hr />

                    {
                        (q === '') &&
                        <div className='alert alert-info'>
                            Busca un heroe
                        </div>
                    }
                    
                    {
                        (q !== '') && heroesFiltered.length === 0 &&
                        <div className='alert alert-danger'>
                            No hay un heroe con {q}
                        </div>
                    }

                    {
                        heroesFiltered.map( hero => (
                            <HeroCard key={hero.id} {...hero}/>
                        ))
                    }

                </div>
            </div>
        </>
    )
}
