import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import redirectTo from '../components/redirectTo.js'

const url = "http://localhost:8080/api/auth/signup";

const Signup = ()=> {
    const [userName,setUserName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errorMessage,setErrorMessage] = useState("")

    const signup = async (e) => {
		e.preventDefault();
		try {
            const { data } = await axios.post(url, {
                username: userName,
                email: email,
                password: password
            });
            if(data.user) {
                redirectTo('/signin');
            }
		} catch (error) {
            setErrorMessage("Email or Username already in use!")
			console.log(error);
		}
	};

    return (
        <main className={styles.main}>
            <h1 className={styles.heading}>Sign Up</h1>
            <div className={styles.container}>
                <form onSubmit={signup} className={styles.credential_form_container}>
                    {errorMessage}
                    <input 
                        type="text" 
                        className={styles.credential_input}
                        placeholder="User Name" 
                        value={userName}
                        onChange={(e)=> setUserName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        className={styles.credential_input}
                        placeholder="Email" 
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        className={styles.credential_input}
                        placeholder="Password" 
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                    <button 
                        className={styles.credential_submit_btn} 
                        type="submit">Sign Up
                    </button>
                    <Link href="/signin"><a><h4 className={styles.credential_footer_text}>Already have an account ?</h4></a></Link>
                </form>
            </div>
        </main>
    )
}

export default Signup