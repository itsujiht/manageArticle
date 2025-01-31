import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [count, setCount] = useState(0);
    const [bibJson, setBibJson] = useState([]);

    useEffect(() => {
        async function fetchBibtex() {
            try {
                const bibtexString = await fetch('/liter.bib');
                const text = await bibtexString.text();
                const parsedJson = parseBibtex(text);
                setBibJson(parsedJson);
            } catch(error) {
                console.log("error :", error);
                setBibJson([
                    {
                      entryType: "error",
                      citationKey: "fallback",
                      title: "データを取得できませんでした",
                      author: "N/A",
                      year: "N/A"
                    }
                  ]);
            }
        }

        fetchBibtex();
    }, [])    

    return (
        <>
            <div className='app-body'>
                <p>paper manager</p>
                <button onClick={() => setCount((count) => count + 1)}>{count}</button>
                <div className='paper-card-container'>
                    {bibJson.map((entry, index) => (
                        <div className='paper-card' key={index}>
                            <h2>{entry.title}</h2>
                            <p>{entry.author}</p>
                            <p>{entry.year}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default App
