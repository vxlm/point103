
import React, { useState } from 'react';
import styles from './SignupForm.module.css';
import { Button } from './button';
const SignupForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    contactNumber: '',
    linkedInProfile: '',
    email: '',
    experiences: [{ position: '', company: '', startDate: '', endDate: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const experiences = [...formState.experiences];
    experiences[index][name] = value;
    setFormState({ ...formState, experiences });
  };

  const addExperience = () => {
    setFormState({
      ...formState,
      experiences: [...formState.experiences, { position: '', company: '', startDate: '', endDate: '' }]
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formState);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input
            type='text'
            name='name'
            value={formState.name}
            onChange={handleChange}
            placeholder='Your name'
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type='text'
            name='contactNumber'
            value={formState.contactNumber}
            onChange={handleChange}
            placeholder='Contact number'
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type='text'
            name='linkedInProfile'
            value={formState.linkedInProfile}
            onChange={handleChange}
            placeholder='LinkedIn profile'
            className={styles.input}
            required
          />
        </div>
        {formState.experiences.map((exp, index) => (
          <div key={index} className={styles.inputGroup}>
            <input type="text" name="position" placeholder="Position" value={exp.position} onChange={(e) => handleExperienceChange(index, e)} className={styles.input} />
            <input type="text" name="company" placeholder="Company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} className={styles.input} />
            <input type="date" name="startDate" placeholder="Start Date" value={exp.startDate} onChange={(e) => handleExperienceChange(index, e)} className={styles.input} />
            <input type="date" name="endDate" placeholder="End Date" value={exp.endDate} onChange={(e) => handleExperienceChange(index, e)} className={styles.input} />
          </div>
        ))}
        <Button type='submit'onClick={addExperience} className="translate-y-[-1rem] animate-fade-in opacity-0" variant="secondary" size="small">Add Experience</Button>
        <Button type='submit' className="translate-y-[-1rem] animate-fade-in opacity-0" variant="primary" size="small">Submit</Button>
      </form>
    </div>

  );
};

export default SignupForm;
