'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!firstNameRef.current.value) errors.firstName = true;
    if (!lastNameRef.current.value) errors.lastName = true;
    if (!emailRef.current.value.includes('@')) errors.email = true;
    if (!phoneRef.current.value.match(/^\d{8}$/)) errors.phone = true;

    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>Sign Up</h2>
      <input
        ref={firstNameRef}
        placeholder="First Name"
        style={{ borderColor: errors.firstName ? 'red' : '', marginBottom: '0.5rem' }}
      /><br />
      <input
        ref={lastNameRef}
        placeholder="Last Name"
        style={{ borderColor: errors.lastName ? 'red' : '', marginBottom: '0.5rem' }}
      /><br />
      <input
        ref={emailRef}
        placeholder="Email"
        style={{ borderColor: errors.email ? 'red' : '', marginBottom: '0.5rem' }}
      /><br />
      <input
        ref={phoneRef}
        placeholder="Phone (8 digits)"
        style={{ borderColor: errors.phone ? 'red' : '', marginBottom: '0.5rem' }}
      /><br />
      <button type="submit">Submit</button>
    </form>
  );
}