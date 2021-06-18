import React from 'react'

function Data({name, data}) {
    return (
        <>
            <div className="data_items">
                <p className="data_name">{name}</p>
                <h1 className="data_content">{data}</h1>
            </div>
        </>
    )
}

export default Data
