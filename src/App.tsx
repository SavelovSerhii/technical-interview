import { useEffect, useState } from 'react';
import axios from 'axios';
import { Search } from './components/Search/Search';
import { Input } from './components/Input/Input';
import { Modal } from './components/Modal/Modal';
import './App.css';

interface User {
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

function App() {
    const [isSelectOpen, toggleIsSelectOpen] = useState(false);
    const [pokemonList, setPokemonList] = useState<string[]>([]);
    const [user, setUser] = useState<User>({
        firstName: '',
        lastName: '',
    })
    const [isModalOpen, toggleIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [pokemonDetails, setPokemonDetails] = useState<Pokemon[]>([]);

    const handleUser = (newData: string, key: string) => {
        const newUser = {
            ...user,
            [key]: newData
        }

        setUser({...newUser})
    }

    const handleModal = () => {
        if (!user.firstName.length) {
            setErrorMessage('First name that you gave is not meeting the requirements');
        } else if (!user.lastName.length) {
            setErrorMessage('Last name that you gave is not meeting the requirements');
        } else if (pokemonList.length !== 4) {
            setErrorMessage('You can choose only 4 Pokémon');
        } else {
            axios.all([
                axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonList[0].toLowerCase()}`), 
                axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonList[1].toLowerCase()}`),
                axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonList[2].toLowerCase()}`), 
                axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonList[3].toLowerCase()}`)
              ])
              .then(axios.spread((responce1, responce2, responce3, responce4) => {
                setPokemonDetails([{
                    name: responce1.data.name,
                    sprite: responce1.data.sprites.front_default,
                    stats: responce1.data.stats
                },
                {
                    name: responce2.data.name,
                    sprite: responce2.data.sprites.front_default,
                    stats: responce2.data.stats
                },
                {
                    name: responce3.data.name,
                    sprite: responce3.data.sprites.front_default,
                    stats: responce3.data.stats
                },
                {
                    name: responce4.data.name,
                    sprite: responce4.data.sprites.front_default,
                    stats: responce4.data.stats
                }]);

                toggleIsModalOpen(true)
              }));
        }
    }

    useEffect(() => {
        setErrorMessage('');
    }, [user.firstName, user.lastName, pokemonList.length])

    return (
        <div className='app'>
            <form
                className='app__form form'
                onSubmit={(event) => {event.preventDefault()}}
            >
                <Input
                    text={user.firstName}
                    setText={handleUser}
                    type='firstName'
                    title='First name'
                    min={2}
                    max={12}
                />

                <Input
                    text={user.lastName}
                    setText={handleUser}
                    type='lastName'
                    title='Last name'
                    min={2}
                    max={12}
                />

                <Search
                    isOpen={isSelectOpen}
                    toggleIsOpen={toggleIsSelectOpen}
                    pokemonList={pokemonList}
                    setPokemonList={setPokemonList}
                />

                <span className='error'>
                    {errorMessage}
                </span>

                <button
                    className='form__button'
                    onClick={() => handleModal()}
                >
                    Submit
                </button>

                <Modal
                    user={user}
                    pokemons={pokemonDetails}
                    isOpen={isModalOpen}
                    toggleIsOpen={toggleIsModalOpen}
                    setPokemonDetails={setPokemonDetails}
                />
            </form>
        </div>
    )
}

export default App
