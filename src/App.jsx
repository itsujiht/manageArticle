import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [bibJson, setBibJson] = useState([]);
    const [selectedTag, setSeletedTag] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');

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

    const tagList = [...new Set(bibJson.flatMap(item => item.tags))];

    const filteredBibJson = selectedTag ? bibJson.filter(bibJson => bibJson.tags.includes(selectedTag)) : bibJson;

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const searchFilteredArticles = filteredBibJson.filter((article) => {
        return (
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <>
            <div className='app-head'>
                <h1>paper manager</h1>
                <input
                    type="text"
                    placeholder="🔍 Search by title or author"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className='app-body'>
                <div className='tag-list'>
                    <p>tags :</p>
                    {tagList.map((tag, index) => (
                        <button className='tag-card' key={index} onClick={() => setSeletedTag(selectedTag === tag ? null : tag)} style={selectedTag === tag ? {color: '#ffffff', backgroundColor: '#393939', borderColor: '#ffb164', outline: '2px auto #ffb164'} : {}}>
                            {tag}
                        </button>
                    ))}
                </div>
                <div className='paper-card-container'>
                    {searchFilteredArticles.map((entry, index) => (
                        <div className='paper-card' key={index} onClick={() => setSelectedArticle(selectedArticle === entry.ID ? null : entry.ID)} style={selectedArticle === entry.ID ? {borderColor: '#ffb164'} : {}}>
                            {selectedArticle === entry.ID ? (
                                <>
                                    <h2>{entry.title}</h2>
                                    <p>{entry.author + ', ' + entry.year}</p>
                                    <div className='paper-card-tags'>
                                        {entry.tags.map((tag, tIndex) => tIndex > 0 ? (
                                            <span key={tIndex}>
                                                {', #' + tag}
                                            </span>
                                        ) : (
                                            <span key={tIndex}>
                                                {'#' + tag}
                                            </span>
                                        ))}
                                    </div>
                                    <p>{entry.abstract}</p>
                                    <p>{entry.memo}</p>
                                </>
                            ) : (
                                <>
                                    <h2>{entry.title}</h2>
                                    <p>{entry.author + ', ' + entry.year}</p>
                                    <div className='paper-card-tags'>
                                        {entry.tags.map((tag, tIndex) => tIndex > 0 ? (
                                            <span key={tIndex}>
                                                {', #' + tag}
                                            </span>
                                        ) : (
                                            <span key={tIndex}>
                                                {'#' + tag}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className='app-foot'>
                <a className='icon' href='https://github.com/nemusheep' target='_blank' rel='noopener noreferrer'>
                    <img src='/images/github-mark-white.png' alt='github logo' width='20' height='20' />
                </a>
                <a className='icon' href='https://twitter.com/mesheep_sleep' target='_blank' rel='noopener noreferrer'>
                    <img src='/images/xlogo-white.png' alt='X logo' width='20' height='20' />
                </a>
                <p> &copy; 2025 nemuSheep</p>
            </div>
        </>
    )
}

export default App
