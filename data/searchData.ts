import moviePoster1 from '@/assets/movie-poster-1.jpg';
import moviePoster2 from '@/assets/movie-poster-2.jpg';
import moviePoster3 from '@/assets/movie-poster-3.jpg';
import moviePoster4 from '@/assets/movie-poster-4.jpg';
import moviePoster5 from '@/assets/movie-poster-5.jpg';
import moviePoster6 from '@/assets/movie-poster-6.jpg';

export interface SearchItem {
  id: number;
  title: string;
  type: 'movie' | 'series' | 'music';
  genre: string;
  language: string;
  poster: string;
  rating: number;
  year: number;
  route: string;
}

export const searchableContent: SearchItem[] = [
  {
    id: 1,
    title: 'Ka Jainsen',
    type: 'movie',
    genre: 'Drama',
    language: 'Khasi',
    poster: moviePoster1,
    rating: 4.8,
    year: 2023,
    route: '/premieres'
  },
  {
    id: 2,
    title: 'Naga Rangtsa',
    type: 'movie',
    genre: 'Action',
    language: 'Ao Naga',
    poster: moviePoster2,
    rating: 4.9,
    year: 2023,
    route: '/premieres'
  },
  {
    id: 3,
    title: 'Puanchei',
    type: 'movie',
    genre: 'Romance',
    language: 'Mizo',
    poster: moviePoster3,
    rating: 4.7,
    year: 2023,
    route: '/premieres'
  },
  {
    id: 4,
    title: 'Ahimsa',
    type: 'movie',
    genre: 'Drama',
    language: 'Manipuri',
    poster: moviePoster4,
    rating: 4.6,
    year: 2022,
    route: '/premieres'
  },
  {
    id: 5,
    title: 'Borphukan',
    type: 'movie',
    genre: 'Biopic',
    language: 'Assamese',
    poster: moviePoster5,
    rating: 4.9,
    year: 2023,
    route: '/premieres'
  },
  {
    id: 6,
    title: 'Rongmei Tales',
    type: 'movie',
    genre: 'Folk Tales',
    language: 'Rongmei',
    poster: moviePoster6,
    rating: 4.5,
    year: 2023,
    route: '/premieres'
  },
  {
    id: 7,
    title: 'Village Diaries',
    type: 'series',
    genre: 'Documentary',
    language: 'Assamese',
    poster: moviePoster1,
    rating: 4.7,
    year: 2023,
    route: '/tv-series'
  },
  {
    id: 8,
    title: 'Hornbill Legends',
    type: 'series',
    genre: 'Drama',
    language: 'Angami',
    poster: moviePoster2,
    rating: 4.8,
    year: 2023,
    route: '/tv-series'
  },
  {
    id: 9,
    title: 'Rhythm of Hills',
    type: 'music',
    genre: 'Traditional',
    language: 'Khasi',
    poster: moviePoster3,
    rating: 4.9,
    year: 2023,
    route: '/music'
  },
  {
    id: 10,
    title: 'Bihu Beats',
    type: 'music',
    genre: 'Folk',
    language: 'Assamese',
    poster: moviePoster4,
    rating: 4.8,
    year: 2023,
    route: '/music'
  }
];
