import React, { useState } from 'react';

const Signin = ({ handleRouteChange, setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmitSignin = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(res => res.json())
            .then(user => {
                if (user.id) {
                    setUser(user)
                    handleRouteChange('home');
                }
            })
            .catch(err => {
                handleRouteChange('signin')
            });

    }

    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={({ target }) => setEmail(target.value)} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" value={email} />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={({ target }) => setPassword(target.value)} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" value={password} />
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={handleSubmitSignin} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => handleRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
                    </div>
                </form>
            </main>
        </article>
    )
};

export default Signin;
