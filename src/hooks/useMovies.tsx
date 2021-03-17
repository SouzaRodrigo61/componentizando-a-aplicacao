import {useContext, createContext, ReactNode, useState, useEffect} from "react";
import { GenreResponseProps } from "../models/GenreResponseProps";
import { MovieProps } from "../models/MovieProps";
import {api} from "../services/api";


interface MoviesProviderProps {
    children: ReactNode;
}

interface MoviesContextData {
    selectedGenreId: number,
    genres: GenreResponseProps[];
    movies: MovieProps[];
    selectedGenre: GenreResponseProps;
    handleClickButton: (id: number) => void;
}

const MoviesContext = createContext<MoviesContextData>({} as MoviesContextData);


export function MovieProvider({ children }: MoviesProviderProps) {
    const [selectedGenreId, setSelectedGenreId] = useState(1);

    const [genres, setGenres] = useState<GenreResponseProps[]>([]);

    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
        {} as GenreResponseProps
    );

    useEffect(() => {
        api.get<GenreResponseProps[]>("genres").then((response) => {
            setGenres(response.data);
        });
    }, []);

    useEffect(() => {
        api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(
            (response) => {
                setMovies(response.data);
            }
        );

        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(
            (response) => {
                setSelectedGenre(response.data);
            }
        );
    }, [selectedGenreId]);
    
    function handleClickButton(id: number) {
        setSelectedGenreId(id);
    }

    return (
        <MoviesContext.Provider value={{
            selectedGenreId,
            genres,
            movies,
            selectedGenre,
            handleClickButton
        }}>
            { children }
        </MoviesContext.Provider>
    );
}

export function useMovies() {
    return useContext(MoviesContext);
}
