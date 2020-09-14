import React from 'react'
import './Header.css'

export default ({black}) => {
    return(
        <header className={ black ? 'black' : ''}>
            <div className="header--logo">
                <h1>NetMovies</h1>
            </div>

            <div className="header--user">
                <a href="/">
                    <img src="https://freesvg.org/img/abstract-user-flat-4.png" alt='user' />
                </a>
            </div>
        </header>
    )
}