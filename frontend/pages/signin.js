import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import redirectTo from '../components/redirectTo.js'

const url = "http://localhost:8080/api/auth/signin";

const Signin = ()=> {
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [errorMessage,setErrorMessage] = useState("")

    const signin = async (e) => {
		e.preventDefault();
		try {
            const { data } = await axios.post(url, {
                username: userName,
                password: password
            });
            if(data.accessToken) {
                document.cookie = 'authtoken='+data.accessToken;
                document.cookie = 'userId='+data.id
                redirectTo('/todo');
            }
		} catch (error) {
            setErrorMessage("Username or Password is incorrect!")
			console.log(error);
		}
	};

    return (
        <main className={styles.main}>
            <h1 className={styles.heading}>Sign In</h1>
            <div className={styles.container}>
                <form onSubmit={signin} className={styles.credential_form_container}>
                    {errorMessage}
                    <input 
                        type="text" 
                        className={styles.credential_input}
                        placeholder="User Name" 
                        value={userName}
                        onChange={(e)=> setUserName(e.target.value)}
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
                        type="submit">
                            Sign In
                    </button>
                    <Link href="/signup"><a><h4 className={styles.credential_footer_text}>Don&apos;t have an account ?</h4></a></Link>
                </form>
            </div>
        </main>
    )
}

export default Signin