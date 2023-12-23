import React, { useState } from 'react';
import './Modal.css';

interface  User {
    firstName: string;
    lastName: string
};

interface Pokemon {
    name: string,
    sprite: string,
    stats: {
        base_stat: number,
        effor: number,
        stat: {
            name: string,
            url: string
        }
    }[]
};

type Props = {
    user: User,
    pokemons: Pokemon[],
    isOpen: boolean,
    toggleIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setPokemonDetails: React.Dispatch<React.SetStateAction<Pokemon[]>>,
};

export const Modal: React.FC<Props> = (props) => {
    const { user, pokemons, isOpen, toggleIsOpen, setPokemonDetails } = props;

    return (
        <>
            {isOpen && <div className='Modal__background' />}
            <div className={`Modal ${!isOpen ? 'Modal--closed' : ''}`}>
                <h2 className='Modal__user'>
                    User: {user.firstName} {user.lastName}
                </h2>
                <ul className='Modal__list'>
                    {pokemons.map((pokemon, index) => (
                        <li className='Modal__item' key={index}>
                            <img
                                src={pokemon.sprite}
                                className='Modal__image'
                            />
                            {pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}
                        </li>
                    ))}
                </ul>

                <button
                    className='Modal__button'
                    onClick={() => {
                        toggleIsOpen(false)
                        setTimeout(() => setPokemonDetails([]), 520)
                    }}
                >
                    Cancel
                </button>
                <button
                    className='Modal__button'
                    onClick={() => {
                        toggleIsOpen(false)
                        setTimeout(() => setPokemonDetails([]), 520)
                    }}
                >
                    Submit
                </button>
            </div>
        </>
    );
};