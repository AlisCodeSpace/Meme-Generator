
import React from "react"

export default function Meme() {
    // const [memeImage, updateImage] = React.useState("http://i.imgflip.com/1bij.jpg")
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })   

    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        async function getMemes() {
        const res = await fetch("https://api.imgflip.com/get_memes")
        const data = await res.json()
        setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])

    function memeImageGenerator() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        
        setMeme(prevMeme => ({
            ...prevMeme, randomImage: url
        }))
    }

    function handleChange(event) {
        setMeme(prevMeme => ({
            ...prevMeme, [event.target.name]: event.target.value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()
    }

    return (
        <main className="form--container">
            <form onSubmit={handleSubmit} className="meme">
                <div className="meme--container">
                    <div className="meme--input">
                        <label htmlFor="top-text">Top Text</label>
                        <input type="text" placeholder="Shut up" id="top-text"
                        name='topText'
                        onChange={handleChange}
                        value={meme.topText}/>
                    </div>
                    <div className="meme--input">
                        <label htmlFor="bottom-text">Bottom Text</label>
                        <input type="text" placeholder="And take my money" id="bottom-text"
                        name='bottomText'
                        onChange={handleChange}
                        value={meme.bottomText}/>
                    </div>
                </div>
                <button onClick={memeImageGenerator} className="meme--submit">Get a new meme image</button>
            </form>
            <div className='meme--image'>
                <img src={meme.randomImage} alt="Meme Image" width="500px" height="500px"/>
                <h2 className='meme--text top'>{meme.topText}</h2>
                <h2 className='meme--text bottom'>{meme.bottomText}</h2>
            </div>
        </main>
    )
}