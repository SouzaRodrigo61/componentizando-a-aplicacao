import { render } from "react-dom";

import { App } from "./App";
import {MovieProvider} from "./hooks/useMovies";

render(
    <MovieProvider>
        <App />
    </MovieProvider>
    , 
    document.getElementById("root")
);
