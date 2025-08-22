import {memo} from "react";

const CourseCardSkeletonComp = memo(({count = 4}) => {
    return (
        <div className={'card-layout'}>
            {Array.from({length: count}).map((_, index) => (
                <article className={'border-style-default radius-m'}
                         style={{
                             display: 'grid',
                             gridTemplateRows: '212px 1fr',
                         }} key={index}>
                    <img src={''} className={'radius-s object-fit-cover w-full loading-pulse'}
                         style={{height: '-webkit-fill-available'}}
                         alt={'ilhamrhmtkbr'}/>
                    <div className={'box-border p-m'}
                         style={{
                             display: 'grid',
                             gridTemplateRows: '1fr max-content max-content',
                         }}>
                        <p className={'font-medium font-size-l loading-pulse'} style={{height: 20}}></p>
                        <p className={'font-light loading-pulse'} style={{height: 40, marginTop: 7}}></p>
                    </div>
                </article>
            ))}
        </div>
    )
})

export default CourseCardSkeletonComp;