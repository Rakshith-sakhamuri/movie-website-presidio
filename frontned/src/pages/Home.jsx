import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import MoviesTable from '../components/home/MoviesTable';
import MoviesCard from '../components/home/MoviesCard';
import FilterPage from './Filter';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [titleFilter, setTitleFilter] = useState('');
  useEffect(() => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_API_URL+'/movies')
      .then((response) => {
        setMovies(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const filters = {
    title: titleFilter,
  };

  useEffect(() => {
    setLoading(true);

    const filters = {
      title: titleFilter,
    };

    axios
      .get(import.meta.env.VITE_API_URL+'/movies', {
        params: filters,
      })
      .then((response) => {
        setMovies(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [titleFilter ]);

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        
        <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'>
          <Link to='/filter'>
            Filter
          </Link>
        </button>
      </div>
      <div className='flex flex-col'>
          <label className='text-lg text-gray-500'>Search Movie</label>
          <input
            type='text'
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Movies List</h1>
        <Link to='/movies/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <MoviesTable movies={movies} />
      ) : (
        <MoviesCard movies={movies} />
      )}
    </div>
  );
};

export default Home;
