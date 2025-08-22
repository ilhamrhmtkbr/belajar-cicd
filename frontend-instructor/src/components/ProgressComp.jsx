import {useEffect, useState} from "react";

const ProgressComp = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const duration = 9000; // total waktu 3 detik
        const intervalTime = 100; // update setiap 100ms
        const increment = 100 / (duration / intervalTime); // berapa persen per update

        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return next;
            });
        }, intervalTime);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
             style={{
                 height: '90dvh',
                 display: 'grid',
                 placeItems: 'center',
                 placeContent: 'center',
                 width: '100%',
                 gridAutoRows: 'max-content'
             }}>
            <div className={'loading-bar'} style={{width: '40dvw'}}>
                <div className={'loading-bar-progress'} style={{
                    transition: 'width 0.1s linear',
                    width: `${progress}%`
                }}/>
            </div>
            <div className={'text-primary'} style={{
                paddingTop: 7
            }}>{Math.ceil(progress)}%</div>
        </div>
    );
};

export default ProgressComp;
