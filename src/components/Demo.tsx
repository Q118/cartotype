import { useState, useEffect } from 'react';


interface TimeAgoProps {
    timestamp: number;
}


function TimeAgo({timestamp}: TimeAgoProps): JSX.Element {
    const [secondsAgo, setSecondsAgo] = useState<number>(Math.floor((Date.now() - timestamp) / 1000))
    
    
    
    useEffect(() => {
        const intervalId = setInterval(() => {   
            setSecondsAgo(Math.floor((Date.now() - timestamp) / 1000));
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timestamp]);

    return <div>{secondsAgo} seconds ago</div>;
}

export default TimeAgo;
/*
function TimeAgo({ timestamp }: { timestamp: number }): JSX.Element {
  const [secondsAgo, setSecondsAgo] = useState<number>(Math.floor((Date.now() - timestamp) / 1000));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsAgo(Math.floor((Date.now() - timestamp) / 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timestamp]);

  const date = new Date(timestamp);

*/