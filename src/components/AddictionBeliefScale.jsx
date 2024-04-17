import React, { useState } from 'react';
import styles from '../styles/AddictionBeliefScale.module.css';
import { useParams } from 'react-router-dom';

const questions = [
  { 
    text: "Most addicts don’t know they have a problem and must be forced to recognize they are addicts. [Disease model]", 
    model: "disease" 
  },
  { 
    text: "Addicts cannot control themselves when they drink or take drugs. [Disease model]", 
    model: "disease" 
  },
  { 
    text: "The only solution to drug addiction and/or alcoholism is treatment. [Disease model]", 
    model: "disease" 
  },
  { 
    text: "Addiction is an all-or-nothing disease: A person cannot be a temporary drug addict with a mild drinking or drug problem. [Disease model]", 
    model: "disease" 
  },
  { 
    text: "The most important step in overcoming an addiction is to acknowledge that you are powerless and can’t control it. [Disease model]", 
    model: "disease" 
  },
  { 
    text: "Abstinence is the only way to control alcoholism/drug addiction. [Disease model]", 
    model: "disease" 
  },
  { 
    text: "Physiology, not psychology, determines whether one drinker will become addicted to alcohol and another will not. [Disease model]", 
    model: "disease" 
  },
  { 
    text: "The fact that alcoholism runs in families means that it is a genetic disease. [Disease model]", 
    model: "disease" 
  },
  { 
    text: "People who are drug addicted can never outgrow addiction and are always in danger of relapsing. [Disease model]", 
    model: "disease" 
  },
  { 
    text: "The best way to overcome addiction is by relying on your own willpower. [Free-will model]", 
    model: "free-will" 
  },
  { 
    text: "People can stop relying on drugs or alcohol as they develop new ways to deal with life. [Free-will model]", 
    model: "free-will" 
  },
  { 
    text: "Addiction has more to do with the environments people live in than the drugs they are addicted to. [Free-will model]", 
    model: "free-will" 
  },
  { 
    text: "People often outgrow drug and alcohol addiction. [Free-will model]", 
    model: "free-will" 
  },
  { 
    text: "Alcoholics and drug addicts can learn to moderate their drinking or cut down on their drug use. [Free-will model]", 
    model: "free-will" 
  },
  { 
    text: "People become addicted to drugs/alcohol when life is going badly for them. [Free-will model]", 
    model: "free-will" 
  },
  { 
    text: "You have to rely on yourself to overcome an addiction such as alcoholism. [Free-will model]", 
    model: "free-will" 
  },
  { 
    text: "Drug addicts and alcoholics can find their own ways out of addiction, without outside help, given the opportunity. [Free-will model]", 
    model: "free-will" 
  },
  { 
    text: "Drug addiction is a way of life people rely on to cope with the world. [Free-will model]", 
    model: "free-will" 
  }
];

const AddictionBeliefScale = () => {
  const { patientId } = useParams();
  const [answersData, setAnswersData] = useState({
    addictionBeliefs: questions.map((question, index) => ({
      id: index,
      text: question.text,
      model: question.model,
      score: '1',
    }))
  });

  const handleChange = (index, value) => {
    setAnswersData(prevData => ({
      ...prevData,
      addictionBeliefs: prevData.addictionBeliefs.map((item, i) =>
        i === index ? { ...item, score: value } : item
      )
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/insert_forms/addiction_belief_scale/${patientId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answersData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Successfully submitted:', data);
      window.history.back();
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  return (
    <form className={styles.addictionBeliefScale} onSubmit={handleSubmit}>
      {['disease', 'free-will'].map((model, sectionIndex) => (
        <section key={model}>
          <h2>{model.charAt(0).toUpperCase() + model.slice(1)} Model</h2>
          
          {answersData.addictionBeliefs.filter(q => q.model === model).map((question, index) => (
            <div key={question.id} className={styles.question}>
              <p>{`${sectionIndex * (questions.length / 2) + index + 1}. ${question.text}`}</p>
              {[1, 2, 3, 4, 5].map((number) => (
                <label key={number}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={number}
                    checked={question.score === number.toString()}
                    onChange={(e) => handleChange(question.id, e.target.value)}
                  />
                  {`${number} - ${['Strongly disagree', 'Disagree', 'Uncertain', 'Agree', 'Strongly agree'][number-1]}`}
                </label>
              ))}
            </div>
          ))}
        </section>
      ))}
      <div className={styles.buttonSection}>
        <button type="button" onClick={() => window.history.back()} className={styles.cancelButton}>Cancel</button>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </div>
    </form>
  );
};

export default AddictionBeliefScale;