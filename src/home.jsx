import "./home.css"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
const Home = () => {
    const [searchtext, setSearchtext] = useState("")
    const [booksdata, setBooksdata] = useState([])
    const [arraydata, setarraydata] = useState([])
    const [carddata, setCarddata] = useState({ tit: "", au: "", page: "", rat: "", link: "" })
    const handlesearch = (e) => {
        e.preventDefault()
        setSearchtext(e.target.value)
    }
    useEffect(() => {
        fetch("https://www.googleapis.com/books/v1/volumes?q=%7BbookTitle").then((res) => {
            return res.json()
        }).then((getdata) => {
            setBooksdata(getdata)
        }).catch((e) => {
            console.log(e)
        })
    }, [])
    const handleclick = (e) => {
        let dummy = [];
        for (let i = 0; i < booksdata.items.length; i++) {
            if (booksdata.items[i].volumeInfo.title == searchtext) {
                dummy.push(booksdata.items[i])
            }
            setarraydata(dummy)
        }
    }
    //console.log(carddata)

    return (
        <>
            <div>
                <div id="navbar">
                    <h1 id="heading">BOOK SEARCH</h1>
                </div>
                <div id="searchbar">
                    <input type="text" placeholder="Search for a book" id="searchbar" onChange={handlesearch} />
                    <img src="searchicon.png" style={{ width: 10 }} onClick={handleclick}></img>
                </div>
                <div>{arraydata.length ?(
                    <div id="hover">
                        {arraydata.map((item)=>{
                            return(
                                <div key={item.volumeInfo.title}>
                                    <a href={item.volumeInfo.infoLink}>
                                        <img  id="imagehover" src={item.volumeInfo.imageLinks.smallThumbnail}/>
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                ):(null)}

                </div>
                    
            </div>
            </>
            )
}
            export default Home;