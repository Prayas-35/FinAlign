import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize'; // Assuming you have this component imported

const FormComponent = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Log form data as JSON in the console
    console.log(JSON.stringify({ name, email, message }));

    // Set an appropriate message in the textarea
    setMessage('');
    setSubmissionMessage('Thank you for submitting! We will get back to you soon.');

    // Optionally, clear the name and email fields
     setName('');
     setEmail('');
  };

  return (
    <>
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        className="max-w-lg py-2 px-2 rounded-lg text-black"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="max-w-lg py-2 px-2 rounded-lg text-black"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextareaAutosize
        minRows={3}
        maxRows={6}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type something..."
        className="border rounded-lg px-2 py-2 text-black"
      />
      <button
        type="submit"
        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mb-2"
      >
        Submit
      </button>
    </form>
    {submissionMessage && <div className="mt-4 text-green-600">{submissionMessage}</div>}
    </>
  );
};

export default FormComponent;