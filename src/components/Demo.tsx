import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

interface TimeAgoProps {
    timestamp: number;
}


function TimeAgo(): JSX.Element {
    const [secondsAgo, setSecondsAgo] = useState<number>(0)



    useEffect(() => {
        const intervalId = setInterval(() => {
            setSecondsAgo(prevSecondsAgo => prevSecondsAgo + 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <div>{secondsAgo} seconds ago</div>
            <Routes>
                <Route path="account" element={<>ACCOUNT</>} />
                <Route path=":id" element={<>ID SHOW</>} />
            </Routes>
        </>
    );
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