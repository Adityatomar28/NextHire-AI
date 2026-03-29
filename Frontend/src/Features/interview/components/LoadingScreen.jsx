import React from 'react'
import '../style/loading.scss'

const LoadingScreen = ({ message = "Loading your interview plan..." }) => {
    return (
        <main className='loading-screen'>
            <div className='loading-screen__container'>
                <div className='loading-spinner'>
                    <div className='spinner-circle spinner-circle--1'></div>
                    <div className='spinner-circle spinner-circle--2'></div>
                    <div className='spinner-circle spinner-circle--3'></div>
                </div>

                <h1 className='loading-screen__title'>{message}</h1>

                <div className='loading-dots'>
                    <span className='dot'></span>
                    <span className='dot'></span>
                    <span className='dot'></span>
                </div>

                <div className='loading-progress'>
                    <div className='progress-bar'></div>
                </div>

                <p className='loading-screen__subtitle'>
                    Analyzing your profile and generating insights...
                </p>
            </div>

            {/* Animated background elements */}
            <div className='loading-bg-elements'>
                <div className='bg-orb bg-orb--1'></div>
                <div className='bg-orb bg-orb--2'></div>
                <div className='bg-orb bg-orb--3'></div>
            </div>
        </main>
    )
}

export default LoadingScreen
