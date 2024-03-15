import React, { useState } from 'react';
import styles from '../styles/AddictionBeliefScale.module.css';

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
  const [answers, setAnswers] = useState(Array(questions.length).fill('1'));

  const handleChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const calculateScore = () => {
    return answers.reduce((total, current) => total + Number(current), 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const score = calculateScore();
    alert(`Your Total Score: ${score}`);
  };

  const handleCancel = () => {
    window.history.back();
  };

  const diseaseQuestions = questions.filter(q => q.model === 'disease');
  const freeWillQuestions = questions.filter(q => q.model === 'free-will');

  return (
    <form className={styles.addictionBeliefScale} onSubmit={handleSubmit}>
      <section>
        <h2>Disease Model</h2>
        <p>
          The stronger the belief in a disease-model item, the higher the score for that item. Thus, disease-model items were scored 5 for “strongly agree” and 1 for “strongly disagree.” The higher the degree of belief in the disease model of addiction, the higher their total score. The highest possible score is 90.
          <br /><br />
          On a scale of 1-5, 1 being strongly disagree and 5 being strongly agree, what is the extent to which you agree or disagree with each statement below?
        </p>
        {diseaseQuestions.map((question, index) => (
          <div key={index} className={styles.question}>
            <p>{`${index + 1}. ${question.text}`}</p>
            {[1, 2, 3, 4, 5].map((number) => (
              <label key={number}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={number}
                  checked={answers[index] === number.toString()}
                  onChange={() => handleChange(index, number.toString())}
                />
                {`${number} - ${['Strongly disagree', 'Disagree', 'Uncertain', 'Agree', 'Strongly agree'][number-1]}`}
              </label>
            ))}
          </div>
        ))}
      </section>

      <section>
        <h2>Free-will Model</h2>
        <p>
          The stronger the belief in a free-will item, the lower the score for that item. Free-will model items were scored 1 for “strongly agree” and 5 for “strongly disagree.” The higher the degree of belief in the free-will model of addiction, the higher their total score. The highest possible score is 90.
          <br /><br />
          On a scale of 1-5, 1 being strongly agree and 5 being strongly disagree, what is the extent to which you agree or disagree with each statement below?
        </p>
        {freeWillQuestions.map((question, index) => (
          <div key={index + diseaseQuestions.length} className={styles.question}>
            <p>{`${index + 1}. ${question.text}`}</p>
            {[1, 2, 3, 4, 5].map((number) => (
              <label key={number}>
                <input
                  type="radio"
                  name={`question-${index + diseaseQuestions.length}`}
                  value={number}
                  checked={answers[index + diseaseQuestions.length] === number.toString()}
                  onChange={() => handleChange(index + diseaseQuestions.length, number.toString())}
                />
                {`${number} - ${['Strongly agree', 'Agree', 'Uncertain', 'Disagree', 'Strongly disagree'][number-1]}`}
              </label>
            ))}
          </div>
        ))}
      </section>

      <div className={styles.buttonSection}>
        <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </div>
    </form>
  );
};

export default AddictionBeliefScale;