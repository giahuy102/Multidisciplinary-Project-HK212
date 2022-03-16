import './style.css'

function Signup() {
    return (
        <form>
            <label>
                Email:
                <input type='email'></input>
            </label>
            <label>
                Username:
                <input type='text'></input>
            </label>
            <label>
                Password:
                <input type='password'></input>
            </label>
            <div>
                <button className='btn btn-primary' type='submit'>Submit</button>
            </div>
        </form>
    );
}

export default Signup;