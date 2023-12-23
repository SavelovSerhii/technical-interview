import React, { useState, useRef, useEffect } from 'react';
import allNames from '../../data/names.json';
import './Search.css';
import close from '../../assets/close.svg';

type Props = {
    isOpen: boolean,
    toggleIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    pokemonList: string[],
    setPokemonList: React.Dispatch<React.SetStateAction<string[]>>
};

export const Search: React.FC<Props> = (props) => {
    const namesRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const {
        isOpen,
        toggleIsOpen,
        pokemonList,
        setPokemonList
    } = props;

    const [value, setValue] = useState('');
    const [names, setNames] = useState(allNames);
    const [offset, setOffset] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (pokemonList.length < 4) {
            if (event.target.value.includes(' ')) {
                if (allNames.some(el => el.toLowerCase() === value.toLowerCase())) {
                    setPokemonList([...pokemonList, allNames[allNames.indexOf(allNames.find(el => el.toLowerCase() === value.toLowerCase()) || '')]]);
                    setValue('');
                    setNames(allNames);
                } else {
                    toggleIsOpen(false);
                    setValue('');

                    setErrorMessage('You can only choose an existing Pokémon');

                    if (inputRef && inputRef.current) {
                        inputRef.current.blur();
                    }
                }
            } else {
                setValue(event.target.value);
                setNames(allNames.filter(el => el.toLowerCase().includes(event.target.value.toLowerCase())));
            }
        } else {
            toggleIsOpen(false);

            setErrorMessage('You can choose only 4 Pokémon');

            if (inputRef && inputRef.current) {
                inputRef.current.blur();
            }
        }
    }

    useEffect(() => {
        setOffset(namesRef && namesRef.current && namesRef.current.offsetWidth || 0);
    })

    return (
        <>
            {isOpen &&
                <div
                    className='Search__background'
                    onClick={() => {
                        toggleIsOpen(false);

                        if (pokemonList.length < 4) {
                            setErrorMessage('You can choose only 4 Pokémon');
                            setTimeout(() => {
                                setErrorMessage('')
                            }, 4000)
                        }
                    }}
                />
            }

            <div className='Search'>
                <div ref={namesRef} className="Search__values">
                    {pokemonList.map((pokemon, index) => (
                        <div className="Search__value" key={index}>
                            {pokemon}
                            <button
                                onClick={() => setPokemonList([...pokemonList.filter((el, elIndex) => elIndex !== index)])}
                                className='Search__button Search__button--close'
                            >
                                <img
                                    className='Search__image Search__image--close'
                                    src={close}
                                />
                            </button>
                        </div>
                    ))}
                </div>

                <label htmlFor="search__input">
                    Choose 4 Pokémon
                    <input
                        className={`Search__input ${errorMessage.length ? 'Search__input--error' : ''}`}
                        type="text"
                        placeholder={!pokemonList.length ? 'Select' : ''}
                        onFocus={() => {
                            toggleIsOpen(true);
                            setErrorMessage('');
                        }}
                        value={value}
                        onChange={(event) => {handleChange(event)}}
                        style={{paddingLeft: `${12 + offset + 'px'}`}}
                        id="search__input"
                        ref={inputRef}
                    />
                    <span className='error'>
                        {errorMessage}
                    </span>
                </label>

                {isOpen &&
                    <ul className='Search__list'>
                        {names.map(name => (
                            <li
                                className='Search__item'
                                key={names.indexOf(name)}
                            >
                                <button
                                    className='Search__button Search__button--item'
                                    onClick={() => {
                                        if (pokemonList.length < 4) {
                                            setValue('');
                                            setPokemonList([...pokemonList, name]);
                                            setNames(allNames);
                                        } else {
                                            setErrorMessage('You can choose only 4 Pokémon');
                                            setTimeout(() => {
                                                setErrorMessage('')
                                            }, 4000)
                                            toggleIsOpen(false);
                                        }

                                        if (pokemonList.length === 3 ) {
                                            toggleIsOpen(false);
                                        }
                                    }}
                                >
                                    { name }
                                </button>
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </>
    );
};