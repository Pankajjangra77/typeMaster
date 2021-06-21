import React from 'react'

function Data({name, data}) {
    return (
        <>
            <div className="data_items">
                <p className="data_name">{name}</p>
                <h2 className="data_content">{data}</h2>
            </div>
        </>
    )
}

export default Data
