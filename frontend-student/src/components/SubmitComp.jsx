import {memo} from "react";

const SubmitComp = memo((props) => {
    let name = 'Submit';

    if (props.name) {
        name = props.name;
    }

    const isCenter = props.isCenter ?? false;

    return (
        props.isLoading ?
            <div className={`button bg-primary ${isCenter ? 'ps-center' : ''}`} style={{padding: '5px 3px'}}>
                <div className={'loading-spinner'}
                     style={{
                         borderTopColor: 'white',
                         width: 'var(--m)',
                         height: 'var(--m)',
                     }}></div>
            </div> :
            <button className={`button bg-primary ${isCenter ? 'ps-center' : ''}`} type={'submit'}>{name}</button>
    )
})

export default SubmitComp;