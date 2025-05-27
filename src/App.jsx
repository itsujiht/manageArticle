import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [bibJson, setBibJson] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchBibtex() {
            try {
                const response = await fetch('/liter.json');
                const jsonData = await response.json();
                setBibJson(jsonData.reverse());
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

    const filteredBibJson = selectedTags.length > 0 ? bibJson.filter(article => selectedTags.every(tag => article.tags.includes(tag))) : bibJson;

    const handleToggleTag = (tag) => {
        tag === null ? setSelectedTags([]) : 
        setSelectedTags((prevTags) => prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]);
    };

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
                <div className='search-head'>
                    <input
                        type="text"
                        placeholder="🔍 Search by title or author"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button onClick={() => setSearchQuery('')}>
                        ×
                    </button>
                </div>
            </div>
            <div className='app-body'>
                <div className='tag-list'>
                    <p>tags :</p>
                    <button className='tag-card-off' onClick={() => handleToggleTag(null)}>
                            tags-off
                    </button>
                    {tagList.map((tag, index) => (
                        <button className='tag-card' key={index} onClick={() => handleToggleTag(tag)} style={selectedTags.includes(tag) ? {color: '#ffffff', backgroundColor: '#393939', borderColor: '#ffb164', outline: '2px auto #ffb164'} : {}}>
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
                    {searchFilteredArticles.length === 0 && (
                        <div className='no-articles-found'>
                            <h2>Oops! I coundn't find any articles.</h2>
                        </div>
                    )}
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
