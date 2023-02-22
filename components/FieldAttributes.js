import { useState } from "react";


const FieldAttributes = () => {

    const [field, setField] = useState({})

    const handleChange = (e) => {
        console.log(e.target);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submit field click");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Field name</label>
                <input type="text" name="name" value={field.name} onChange={handleChange}></input>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default FieldAttributes