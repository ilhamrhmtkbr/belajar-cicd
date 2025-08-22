const FilterByComp = (props) => {

    return (
        <div
            className={'capitalize border-style-default radius-m pt-m pb-m font-size-s text-link box-border grid-start w-max-content'}
            style={{
                justifySelf: 'end',
                gap: 0
            }}>
            <p className={'font-light text-center radius-s border-style-default mb-s w-max-content ps-center pr-s pl-s'}>{props.name}</p>
            <div className={'table-box'}>
                <div className={'flex-aic-jcs pr-m pl-m gap-m'} style={{maxWidth: '100%'}}>
                    {props.filters.map((value, index) => (
                        <div key={index}
                             className={`cursor-pointer font-medium radius-s text-hover-underline ${props.defaultValue === value ? 'badge badge-small bg-primary' : ''}`}
                             onClick={() => props.handleOnChange(value)}>
                            {value}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FilterByComp;