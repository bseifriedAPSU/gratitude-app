import "./wordcloud.css"
import React from 'react';
import ReactWordcloud from 'react-wordcloud';
import Cloud from "./cloud.svg";


export default function Wordcloud() {

    const words = [
        //TESTING VALUES
        { text: 'puppies', value: 100 },
        { text: 'tacos', value: 95 },
        { text: 'trees', value: 90 },
        { text: 'sunset', value: 90 },
        { text: 'family', value: 85 },
        { text: 'coffee', value: 70 },
        { text: 'health', value: 40 },
        { text: 'socks', value: 35 },
        { text: 'home', value: 85 },
        { text: 'kittens', value: 25 },
        { text: 'puppies', value: 100 },
        { text: 'tacos', value: 95 },
        { text: 'trees', value: 90 },
        { text: 'sunset', value: 90 },
        { text: 'family', value: 85 },
        { text: 'coffee', value: 70 },
        { text: 'health', value: 40 },
        { text: 'socks', value: 35 },
        { text: 'home', value: 85 },
        { text: 'kittens', value: 25 },
        { text: 'puppies', value: 100 },
        { text: 'tacos', value: 95 },
        { text: 'trees', value: 90 },
        { text: 'sunset', value: 90 },
        { text: 'family', value: 85 },
        { text: 'coffee', value: 70 },
        { text: 'health', value: 40 },
        { text: 'socks', value: 35 },
        { text: 'home', value: 85 },
        { text: 'kittens', value: 25 },
        { text: 'puppies', value: 100 },
        { text: 'tacos', value: 95 },
        { text: 'trees', value: 90 },
        { text: 'sunset', value: 90 },
        { text: 'family', value: 85 },
        { text: 'coffee', value: 70 },
        { text: 'health', value: 40 },
        { text: 'socks', value: 35 },
        { text: 'home', value: 85 },
        { text: 'kittens', value: 25 },
        { text: 'puppies', value: 100 },
        { text: 'tacos', value: 95 },
        { text: 'trees', value: 90 },
        { text: 'sunset', value: 90 },
        { text: 'family', value: 85 },
        { text: 'coffee', value: 70 },
        { text: 'health', value: 40 },
        { text: 'socks', value: 35 },
        { text: 'home', value: 85 },
        { text: 'kittens', value: 25 },
        { text: 'puppies', value: 100 },
        { text: 'tacos', value: 95 },
        { text: 'trees', value: 90 },
        { text: 'sunset', value: 90 },
        { text: 'family', value: 85 },
        { text: 'coffee', value: 70 },
        { text: 'health', value: 40 },
        { text: 'socks', value: 35 },
        { text: 'home', value: 85 },
        { text: 'kittens', value: 25 },
    ];

    const options = {
        rotations: 2,
        rotationAngles: [0, 35, 90, 110],
        fontSizes: [20, 60, 75],
      
    };
    return (
        <div className="wordcloud-container">
            <div className="cloud-mask">
                <ReactWordcloud words={words} options={options} />
                </div>
            <svg width="0" height="0" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden'}}>
                <defs>
                    <mask id="Cloud">
                        <image href={Cloud} width="100%" height="100%" />
                    </mask>
                </defs>
            </svg>
       
               
            </div>
       
    );

};

