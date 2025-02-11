import React from "react";
import ReactDOM from 'react-dom/client';


const App = () => {
    return(
        <div className="text-lg text-center text-red-500">
            React app using build tool as parcel & styling library as tailwindCSS
        </div>
    )
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);