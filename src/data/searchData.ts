import moviePoster1 from '@/assets/movie-poster-1.jpg';
import moviePoster2 from '@/assets/movie-poster-2.jpg';
import moviePoster3 from '@/assets/movie-poster-3.jpg';
import moviePoster4 from '@/assets/movie-poster-4.jpg';
import moviePoster5 from '@/assets/movie-poster-5.jpg';
import moviePoster6 from '@/assets/movie-poster-6.jpg';

import { searchByTitle } from "@/lib/graphql";
import { getUser } from "@/lib/localAuth"; 

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


// Default fallback static content (can be replaced by API results)
// export const searchableContent: SearchItem[] = 

// [
//   {
//     id: 1,
//     title: 'Ka Jainsen',
//     type: 'movie',
//     genre: 'Drama',
//     language: 'Khasi',
//     poster: moviePoster1,
//     rating: 4.8,
//     year: 2023,
//     route: '/premieres'
//   },
//   {
//     id: 2,
//     title: 'Naga Rangtsa',
//     type: 'movie',
//     genre: 'Action',
//     language: 'Ao Naga',
//     poster: moviePoster2,
//     rating: 4.9,
//     year: 2023,
//     route: '/premieres'
//   },
//   {
//     id: 3,
//     title: 'Puanchei',
//     type: 'movie',
//     genre: 'Romance',
//     language: 'Mizo',
//     poster: moviePoster3,
//     rating: 4.7,
//     year: 2023,
//     route: '/premieres'
//   },
//   {
//     id: 4,
//     title: 'Ahimsa',
//     type: 'movie',
//     genre: 'Drama',
//     language: 'Manipuri',
//     poster: moviePoster4,
//     rating: 4.6,
//     year: 2022,
//     route: '/premieres'
//   },
//   {
//     id: 5,
//     title: 'Borphukan',
//     type: 'movie',
//     genre: 'Biopic',
//     language: 'Assamese',
//     poster: moviePoster5,
//     rating: 4.9,
//     year: 2023,
//     route: '/premieres'
//   },
//   {
//     id: 6,
//     title: 'Rongmei Tales',
//     type: 'movie',
//     genre: 'Folk Tales',
//     language: 'Rongmei',
//     poster: moviePoster6,
//     rating: 4.5,
//     year: 2023,
//     route: '/premieres'
//   }
// ];

// 🔥 Dynamic Search Function
export const searchableContent = async (query: string): Promise<SearchItem[]> => {
  const user = getUser();

  try {
    // Send empty query to API if first time
    const response = await searchByTitle(null,null);
    const apiResults = response?.searchTitle?.data ?? [];

    // Map API data to SearchItem
    const formattedResults: SearchItem[] = apiResults.map((item: any, index: number) => ({
      id: item?.id || index + 1,
      title: item?.title || "Unknown Title",
      type: item?.type || "movie",
      genre: Array.isArray(item?.genres) ? item.genres.join(', ') : item?.genres || "Unknown",
      language: item?.language || "",
      poster: item?.poster || moviePoster1,
      rating: item?.rating || 0,
      year: item?.release_date || 2023,
      route: item,
    }));
    console.log("Formatted Results:", formattedResults);

    return formattedResults.length ? formattedResults : [];

  } catch (error) {
    console.error("Search API Error:", error);
    return []; // Return empty array if API fails
  }
  
};


// ✅ Optional: Generate static content from API (for dev/testing)
// export const generateStaticContentFromAPI = async (): Promise<SearchItem[]> => {
//   try {
//     const response = await searchByTitle('', 0); // Empty query to get all items
//     const apiResults = response?.searchByTitle?.data ?? [];

//     return apiResults.map((item: any, index: number) => ({
//       id: item?.id || index + 1,
//       title: item?.title || "Unknown Title",
//       type: item?.category || "movie",
//       genre: item?.genres || "Unknown",
//       language: item?.language || "Unknown",
//       poster: item?.app_list_image || moviePoster1,
//       rating: item?.rating || 0,
//       year: item?.releaseYear || 2023,
//       route: "/details",
//     }));
//   } catch (error) {
//     console.error("Static content generation failed:", error);
//     return searchableContent;
//   }
// };
