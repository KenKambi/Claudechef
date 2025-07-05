

//function to practice different kind of inputs for forms

export default function Form (){

    function signUp (formData){
        const mytitle = formData.getAll("title")
        //console.log(mytitle)
        const allData = Object.fromEntries(formData)
        const myAllData = {
            ...allData,
            mytitle
        }
        console.log(myAllData)

    }

    return(
        <form action={signUp}>
            <label htmlFor="name"> Name: </label>
            <input id="name" type="text" name="name"  required/>
            <br />

            <label htmlFor="email"> Email: </label>
            <input type="email" name="email" id="email"  required/>
            <br />

            <label htmlFor="description">Description: </label>
            <textarea name="description" id="description" required></textarea>

            <fieldset>
                <legend>Time of day</legend>
                <label htmlFor="time">Morning</label>
                <input type="radio" name="time" id="time" value="morning" required/>

                <label htmlFor="time"> Evening</label>
                <input type="radio" name="time" id="time" value="evenig"  required/>
            </fieldset>
            <br />

            <fieldset>
                <legend>Title</legend>
                <label htmlFor="title">Mr.</label>
                <input type="checkbox" id="title" name="title" value="mr"  />

                <label htmlFor="title">Mrs.</label>
                <input type="checkbox" id="title" name="title" value="mrs" />
            </fieldset>
            <br />

            <label htmlFor="color">Color Pallet: </label>
            <select name="color" id="color" defaultValue="" required>
                <option disabled value="">--Choose color--</option>
                <option value="red"> Red </option>
                <option value="orange"> Orange </option>
                <option value="yellow"> Yellow </option>
                <option value="green"> Green </option>
                <option value="blue"> Blue </option>
                <option value="indigo"> Indigo </option>
            </select>
            <br />

            <button>Submit</button>

        </form>
    )
}