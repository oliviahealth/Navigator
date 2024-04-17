import React from 'react';
import styles from '../styles/SmokingTobaccoUse.module.css';

const SmokingTobaccoUse = () => {
    // An array of products for the table
    const products = [
        "Cigarettes",
        "E-cigarettes",
        "Cigars/Cigarillos/little cigars (ex: Black & Milds, Swisher Sweets, Dutch Masters, White Owl, or Phillies Blunts)",
        "Smokeless Tobacco/Chewing Tobacco/Chew/Snuff (ex: Copenhagen, Grizzly, Skoal, Levi Garrett, Redman, Red Seal, Timberwolf)",
        "Snus",
        "Hookah",
        "Dissolvable tobacco as in Strips/Sticks/Orbs",
        "Heated tobacco products (ex: IQOS, glo, Eclipse)",
        "“Tobacco free” nicotine pouches (ex: Zyn)",
        "Other (specify):"
    ];

    const handleCancel = () => {
        window.history.back();
      };

  return (
    <div className={styles.container}>
      <form>
      <h1 className={styles.title}>Tobacco Use Screening and Documentation Form</h1>
        {/* Section for clients who had a baby in the past year */}
        <section className={styles.section}>
          <p>For clients who had a baby in the past year:</p>
          <p><b>1.) Ask the Participant to choose the statement that best describes their smoking status: </b></p>
          <label>
            <input type="checkbox" />
            I have NEVER smoked or have smoked less than 100 cigarettes in my lifetime.
          </label>
          <label>
            <input type="checkbox" />
            I stopped smoking BEFORE I found out I was pregnant and am not smoking now.
          </label>
          <label>
            <input type="checkbox" />
            I stopped smoking AFTER I found out I was pregnant and I am not smoking now.
          </label>
          <label>
            <input type="checkbox" />
            I stopped smoking during pregnancy but I am smoking now.
          </label>
          <label>
            <input type="checkbox" />
            I smoked during pregnancy and I am smoking now.
          </label>
        </section>

        <section className={styles.section}>
          <p><b>2.) This question asks about all tobacco products, including e-cigarettes, also known as vapes. Brand examples of e-cigarettes include JUUL, Puff Bar, Suorin, Smok, Vuse alto, Kandypens, and myblu. E-cigarettes are battery powered devices that usually include a nicotine-based liquid that is vaporized and inhaled. You may also know them as e-cigs, vape-pens, e-hookahs, or mods. </b></p>
          <p>Please mark how often client uses each tobacco product in the past 12 months and past month.  </p>
          <div className={styles.scrollableTable}>
          <table className={styles.table}>
          <colgroup>
            <col style={{ width: '30%' }} />
            <col style={{ width: '14%' }} />
            <col style={{ width: '14%' }} />
            <col style={{ width: '14%' }} />
            <col style={{ width: '14%' }} />
            <col style={{ width: '14%' }} />
          </colgroup>
            <thead>
                <tr>
                <th>Product</th>
                <th colSpan="5">Past 12 months</th>
                <th colSpan="5">Past 30 days</th>
                </tr>
                <tr>
                <th></th>
                <th>Not Used</th>
                <th>1-3 times monthly</th>
                <th>1-2 times weekly</th>
                <th>3-6 times weekly</th>
                <th>Daily</th>
                <th>Not Used</th>
                <th>1-3 times monthly</th>
                <th>1-2 times weekly</th>
                <th>3-6 times weekly</th>
                <th>Daily</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                <tr key={index}>
                    <td>{product}</td>
                    {Array(10).fill().map((_, i) => (
                    <td key={i}>
                        <input type="radio" name={`product${index}-time${i}`} />
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
            </div>
        </section>

        <section className={styles.section}>
          <p><b>3.) For each tobacco product that you use, how much do you use on a typical day or week when you are smoking, vaping, or using tobacoo? (ex: one JUUL pod a day, 1 pack of cigarettes per day, one can of dip a week)  </b></p>
          <textarea className={styles.largeTextbox} rows="4" placeholder="Describe your usage"></textarea>
        </section>

        <section className={styles.section}>
          <p><b>4.) Do you use menthol products? </b></p>
          <div>
            <label>
            <input type="radio" name="mentholProductUse" value="yes" />
            Yes
            </label>
            <label>
            <input type="radio" name="mentholProductUse" value="no" />
            No
            </label>
        </div>
        </section>

        <section className={styles.section}>
          <p><b>5.) List all brands of tobacco products that you typically use:  </b></p>
          <textarea className={styles.textbox} rows="2" placeholder="List all brands"></textarea>
        </section>

        <section className={styles.section}>
        <p><b>6.)</b></p>
        <div className={styles.questionGroup}>
            <p>Does anyone smoke or vape around you and/or your children?</p>
            <label>
            <input type="radio" name="aroundChildren" value="smoke" /> Smoke
            </label>
            <label>
            <input type="radio" name="aroundChildren" value="vape" /> Vape
            </label>
            <label>
            <input type="radio" name="aroundChildren" value="neither" /> Neither
            </label>
        </div>
        <div className={styles.questionGroup}>
            <p>Does anyone smoke or vape inside your house?</p>
            <label>
            <input type="radio" name="insideHouse" value="smoke" /> Smoke
            </label>
            <label>
            <input type="radio" name="insideHouse" value="vape" /> Vape
            </label>
            <label>
            <input type="radio" name="insideHouse" value="neither" /> Neither
            </label>
        </div>
        <div className={styles.questionGroup}>
            <p>Does anyone smoke or vape inside your car?</p>
            <label>
            <input type="radio" name="insideCar" value="smoke" /> Smoke
            </label>
            <label>
            <input type="radio" name="insideCar" value="vape" /> Vape
            </label>
            <label>
            <input type="radio" name="insideCar" value="neither" /> Neither
            </label>
        </div>
        <div className={styles.questionGroup}>
            <p>Is smoking or vaping allowed in your workplace?</p>
            <label>
            <input type="radio" name="workplace" value="smoke" /> Smoke
            </label>
            <label>
            <input type="radio" name="workplace" value="vape" /> Vape
            </label>
            <label>
            <input type="radio" name="workplace" value="neither" /> Neither
            </label>
        </div>
        </section>

        <section className={styles.section}>
          <p><b>7.) How many minutes after you wake up do you smoke your first cigarette or use a tobacco product?  </b></p>
          <div className={styles.options}>
            <label>
            <input type="radio" name="firstUseAfterWake" value="immediately" /> Immediately
            </label>
            <label>
            <input type="radio" name="firstUseAfterWake" value="5-30 minutes" /> 5-30 minutes
            </label>
            <label>
            <input type="radio" name="firstUseAfterWake" value="31-60 minutes" /> 31-60 minutes
            </label>
            <label>
            <input type="radio" name="firstUseAfterWake" value="more than 60" /> {'>'} 60 minutes
            </label>
          </div>
        </section>

        <section className={styles.section}>
          <p><b>8.) Do you sometimes wake up at night to have a cigarette or use tobacco?  </b></p>
          <div className={styles.options}>
            <label>
            <input type="radio" name="wakeUpForTobacco" value="yes" /> Yes
            </label>
            <label>
            <input type="radio" name="wakeUpForTobacco" value="no" /> No
            </label>
            <label className={styles.nightsPerWeekLabel}>
            If yes, how often?
            <input type="text" name="nightsPerWeek" className={styles.nightsPerWeekInput} placeholder="____ nights per week" />
            </label>
          </div>
        </section>

        <section className={styles.section}>
          <p><b>9.) How many times have you made a serious attempt to quit smoking or using tobacco products?  </b></p>
          <div className={styles.optionGroup}>
            <label>
            <input type="radio" name="quitAttempts" value="0" /> 0
            </label>
            <label>
            <input type="radio" name="quitAttempts" value="1" /> 1
            </label>
            <label>
            <input type="radio" name="quitAttempts" value="2" /> 2
            </label>
            <label>
            <input type="radio" name="quitAttempts" value="3" /> 3
            </label>
            <label>
            <input type="radio" name="quitAttempts" value="4" /> 4
            </label>
            <label>
            <input type="radio" name="quitAttempts" value="5ormore" /> 5 or more
            </label>
          </div>
        </section>

        <section className={styles.section}>
          <p><b>10.) Tell us more about the times you have tried to quit in the past:  </b></p>
          <table className={styles.quitTable}>
            <thead>
            <tr>
                <th></th>
                <th>Your most recent quit attempt</th>
                <th>The time when you stayed quit the longest</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>How old were you?</td>
                <td><input type="text" name="recentQuitAge" /></td>
                <td><input type="text" name="longestQuitAge" /></td>
            </tr>
            <tr>
                <td>What year was it?</td>
                <td><input type="text" name="recentQuitYear" /></td>
                <td><input type="text" name="longestQuitYear" /></td>
            </tr>
            <tr>
                <td>What did you use to help you (medicine, counseling, etc.)?</td>
                <td><input type="text" name="recentQuitHelp" /></td>
                <td><input type="text" name="longestQuitHelp" /></td>
            </tr>
            <tr>
                <td>How long did you stay quit?</td>
                <td><input type="text" name="recentQuitDuration" /></td>
                <td><input type="text" name="longestQuitDuration" /></td>
            </tr>
            <tr>
                <td>Why did you return to using tobacco?</td>
                <td><input type="text" name="recentQuitReturnReason" /></td>
                <td><input type="text" name="longestQuitReturnReason" /></td>
            </tr>
            </tbody>
          </table>
        </section>

        <section className={styles.section}>
          <p><b>11.) In the past, what medications have you used to help you quit?  </b></p>
          <label>
          <input type="checkbox" name="noMedications" />
          I have never used any medications to help
        </label>
        <table className={styles.quitMedicationsTable}>
            <thead>
            <tr>
                <th>Medications</th>
                <th>I used in the past (Yes/No)</th>
                <th>Result</th>
                <th>Describe any side effects</th>
                <th>I might use now (Yes/No)</th>
            </tr>
            </thead>
            <tbody>
            {['Nicotine Patch', 'Nicotine Gum', 'Nicotine Oral Inhaler (puffer)', 'Nicotine Nasal Spray', 'Nicotine Lozenge (Commit)', 'Zyban/Wellbutrin/Bupropion', 'Chantix/varenicline'].map((medication, index) => (
                <React.Fragment key={index}>
                <tr>
                    <td>{medication}</td>
                    <td>
                    <label>
                        <input type="radio" name={`used-${index}`} value="yes" /> Yes
                    </label>
                    <label>
                        <input type="radio" name={`used-${index}`} value="no" /> No
                    </label>
                    </td>
                    <td>
                    <label>
                        <input type="radio" name={`result-${index}`} value="workedWell" /> Worked Well
                    </label>
                    <label>
                        <input type="radio" name={`result-${index}`} value="didNotWork" /> Did Not Work
                    </label>
                    <label>
                        <input type="radio" name={`result-${index}`} value="sideEffects" /> Too Many Side Effects
                    </label>
                    </td>
                    <td>
                    <input type="text" name={`sideEffects-${index}`} placeholder="Describe any side effects" />
                    </td>
                    <td>
                    <label>
                        <input type="radio" name={`mightUse-${index}`} value="yes" /> Yes
                    </label>
                    <label>
                        <input type="radio" name={`mightUse-${index}`} value="no" /> No
                    </label>
                    </td>
                </tr>
                </React.Fragment>
            ))}
            </tbody>
        </table>
        </section>

        {/* Submit button */}
        <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
};
export default SmokingTobaccoUse;
