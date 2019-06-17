import React, { useState } from 'react';

const Register = ({ handleRouteChange, setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmitRegistration = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
                name
            })
        })
            .then(res => res.json())
            .then(user => {
                if (user) {
                    setUser(user);
                    handleRouteChange('home');
                }
            });
    }
    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                onChange={({ target }) => setName(target.value)}
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                onChange={({ target }) => setEmail(target.value)}
                                type="email"
                                name="email-address"
                                id="email-address"
                                value={email}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                onChange={({ target }) => setPassword(target.value)}
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={handleSubmitRegistration} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                    </div>
                </form>
            </main>
        </article>
    )
};

export default Register;
