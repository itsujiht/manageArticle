import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0);
    const [bibJson, setBibJson] = useState([]);

    useEffect(() => {
        async function fetchBibtex() {
            try {
                const response = await fetch('/liter.json');
                const jsonData = await response.json();
                setBibJson(jsonData);
            } catch(error) {
                console.log("error :", error);
                setBibJson([
                    {
                      ENTRYTYPE: "error",
                      citationKey: "fallback",
                      title: "データを取得できませんでした",
                      author: "N/A",
                      year: "N/A",
                      memo: "None",
                      abstract: "None",
                      tags: "None"
                    }
                  ]);
            }
        }

        fetchBibtex();
    }, [])    

    return (
        <>
            <div className='app-head'>
                <h1>paper manager</h1>
                {/* 検索バー */}
            </div>
            <div className='app-body'>
                <button onClick={() => setCount((count) => count + 1)}>{count}</button>
                <div className='tag-list'>
                    <p>tags :</p>
                    {/* タグを並べてすぐに検索できるように */}
                </div>
                <div className='paper-card-container'>
                    {bibJson.map((entry, index) => (
                        <div className='paper-card' key={index}>
                            <h2>{entry.title}</h2>
                            <p>{entry.author}</p>
                            <p>{entry.year + ', ' + entry.tags}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default App
