import {Button} from "./Button";

import "../styles/sidebar.scss";
import {useMovies} from "../hooks/useMovies";

export function SideBar() {
    const {
        selectedGenreId,
        genres,
        handleClickButton
    } = useMovies();
    
    return(
        <nav className="sidebar">
                <span>
                    Watch<p>Me</p>
                </span>

            <div className="buttons-container">
                {genres.map((genre) => (
                    <Button
                        id={String(genre.id)}
                        title={genre.title}
                        iconName={genre.name}
                        onClick={() => handleClickButton(genre.id)}
                        selected={selectedGenreId === genre.id}
                    />
                ))}
            </div>
        </nav>
    );
}
