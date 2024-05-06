import React, { useState, useEffect } from 'react';
import styles from '../../styles/SmokingTobaccoUse.module.css';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const SmokingTobaccoUseReadOnly = () => {
    const { patientId, log_id } = useParams();
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

    const [smokingStatus, setSmokingStatus] = useState({
        neverSmoked: false,
        stoppedBeforePregnancy: false,
        stoppedAfterPregnancy: false,
        stoppedDuringButSmokingNow: false,
        smokedDuringAndNow: false
    });

    const [usageFrequency, setUsageFrequency] = useState(products.map(() => ({
        past12Months: Array(5).fill(false),
        pastMonth: Array(5).fill(false)
    })));
    
    const [typicalUsage, setTypicalUsage] = useState("");
    const [mentholProductUse, setMentholProductUse] = useState("");
    const [brandsUsed, setBrandsUsed] = useState("");

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setSmokingStatus(prev => ({ ...prev, [name]: checked }));
    };

    const handleRadioChange = (productIndex, timeIndex, period, value) => {
        setUsageFrequency(prev => prev.map((product, idx) => {
            if (idx === productIndex) {
                const updatedTimes = product[period].map((v, i) => i === timeIndex ? value : v);
                return {
                    ...product,
                    [period]: updatedTimes
                };
            }
            return product;
        }));
    };

    const [aroundChildren, setAroundChildren] = useState("");
    const [insideHouse, setInsideHouse] = useState("");
    const [insideCar, setInsideCar] = useState("");
    const [workplace, setWorkplace] = useState("");
    const [firstUseAfterWake, setFirstUseAfterWake] = useState("");
    // const [wakeUpForTobacco, setWakeUpForTobacco] = useState("");

    const [wakeUpForTobacco, setWakeUpForTobacco] = useState("");
    const [nightsPerWeek, setNightsPerWeek] = useState("");
    const [quitAttempts, setQuitAttempts] = useState("");
    const [recentQuitDetails, setRecentQuitDetails] = useState({
        Age: '',
        Year: '',
        Help: '',
        Duration: '',
        ReturnReason: ''
    });
    const [longestQuitDetails, setLongestQuitDetails] = useState({
        Age: '',
        Year: '',
        Help: '',
        Duration: '',
        ReturnReason: ''
    });
    const [medications, setMedications] = useState({
        noMedications: false,
        details: ['Nicotine Patch', 'Nicotine Gum', 'Nicotine Oral Inhaler (puffer)', 'Nicotine Nasal Spray', 'Nicotine Lozenge (Commit)', 'Zyban/Wellbutrin/Bupropion', 'Chantix/varenicline'].map(medication => ({
            name: medication,
            used: '',
            result: '',
            sideEffects: '',
            mightUse: ''
        }))
    });    

    const handleCancel = () => {
        window.history.back();
    };

    useEffect(() => {
        const fetchLog = async () => {
            try {
                const accessToken = Cookies.get('accessToken');
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/smoking_tobacco_use/${patientId}/${log_id}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                credentials: 'omit',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                if (response.status === 204) { // Handling no content
                    return; 
                }
                const data = await response.json();
                setSmokingStatus(data[2].smokingStatus);
                setUsageFrequency(data[2].usageFrequency);
                setTypicalUsage(data[2].typicalUsage);
                setMentholProductUse(data[2].mentholProductUse);
                setBrandsUsed(data[2].brandsUsed);
                setAroundChildren(data[2].aroundChildren);
                setBrandsUsed(data[2].brandsUsed);
                setInsideHouse(data[2].insideHouse);
                setInsideCar(data[2].insideCar);
                setWorkplace(data[2].workplace);
                setFirstUseAfterWake(data[2].firstUseAfterWake);

                setWakeUpForTobacco(data[2].wakeUpForTobacco);
                setNightsPerWeek(data[2].nightsPerWeek);
                setQuitAttempts(data[2].quitAttempts);
                setRecentQuitDetails(data[2].recentQuitDetails);
                setLongestQuitDetails(data[2].longestQuitDetails);
                setMedications(data[2].medications);
                
            } catch (error) {
                console.error('failed to fetch');
            }
        };
    
        fetchLog();
    }, [patientId, log_id]);

    return (
        <div className={styles.container}>
            <form>
                <h1 className={styles.title}>Smoking / Tobacco Use before, during Pregnancy and at 1, 3, 6, 9, & 12 Months Postpartum</h1>
                <section className={styles.section}>
                    <p>For clients who had a baby in the past year:</p>
                    <p><b>1.) Ask the Participant to choose the statement that best describes their smoking status: </b></p>
                    <label>
                        <input 
                            type="checkbox" 
                            name="neverSmoked" 
                            checked={smokingStatus.neverSmoked} 
                            disabled 
                        />
                        I have NEVER smoked or have smoked less than 100 cigarettes in my lifetime.
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="stoppedBeforePregnancy" 
                            checked={smokingStatus.stoppedBeforePregnancy} 
                            disabled 
                        />
                        I stopped smoking BEFORE I found out I was pregnant and am not smoking now.
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="stoppedAfterPregnancy" 
                            checked={smokingStatus.stoppedAfterPregnancy} 
                            disabled 
                        />
                        I stopped smoking AFTER I found out I was pregnant and I am not smoking now.
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="stoppedDuringButSmokingNow" 
                            checked={smokingStatus.stoppedDuringButSmokingNow} 
                            disabled 
                        />
                        I stopped smoking during pregnancy but I am smoking now.
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="smokedDuringAndNow" 
                            checked={smokingStatus.smokedDuringAndNow} 
                            disabled 
                        />
                        I smoked during pregnancy and I am smoking now.
                    </label>
                </section>

                <section className={styles.section}>
                    <p><b>2.) This question asks about all tobacco products, including e-cigarettes, also known as vapes. </b></p>
                    <div className={styles.scrollableTable}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th colSpan="5">Past 12 months</th>
                                    <th colSpan="5">Past month</th>
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
                                {products.map((product, productIndex) => (
                                    <tr key={productIndex}>
                                        <td>{product}</td>
                                        {Array(10).fill().map((_, timeIndex) => (
                                            <td key={timeIndex}>
                                                <input 
                                                    type="radio" 
                                                    name={`product${productIndex}-time${timeIndex}`} 
                                                    checked={usageFrequency[productIndex][timeIndex < 5 ? 'past12Months' : 'pastMonth'][timeIndex % 5]}
                                                    disabled 
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className={styles.section}>
                    <p><b>3.) For each tobacco product that you use, how much do you use on a typical day or week when you are smoking, vaping, or using tobacco? </b></p>
                    <textarea 
                        name="typicalUsage" 
                        className={styles.largeTextbox} 
                        rows="4" 
                        placeholder="Describe your usage" 
                        value={typicalUsage}
                        disabled
                    ></textarea>
                </section>

                <section className={styles.section}>
                    <p><b>4.) Do you use menthol products? </b></p>
                    <div>
                        <label>
                            <input 
                                type="radio" 
                                name="mentholProductUse" 
                                value="yes" 
                                checked={mentholProductUse === 'yes'}
                                disabled 
                            />
                            Yes
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="mentholProductUse" 
                                value="no" 
                                checked={mentholProductUse === 'no'}
                                disabled 
                            />
                            No
                        </label>
                    </div>
                </section>

                <section className={styles.section}>
                    <p><b>5.) List all brands of tobacco products that you typically use: </b></p>
                    <textarea 
                        name="brandsUsed" 
                        className={styles.textbox} 
                        rows="2" 
                        placeholder="List all brands" 
                        value={brandsUsed}
                        disabled
                    ></textarea>
                </section>

                    <section className={styles.section}>
                        <p><b>6.) Does anyone smoke or vape around you and/or your children?</b></p>
                        <div className={styles.questionGroup}>
                            <label>
                                <input 
                                    type="radio" 
                                    name="aroundChildren" 
                                    value="smoke"
                                    checked={aroundChildren === "smoke"}
                                    disabled 
                                />
                                Smoke
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="aroundChildren" 
                                    value="vape"
                                    checked={aroundChildren === "vape"}
                                    disabled 
                                />
                                Vape
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="aroundChildren" 
                                    value="neither"
                                    checked={aroundChildren === "neither"}
                                    disabled 
                                />
                                Neither
                            </label>
                        </div>
                        <div className={styles.questionGroup}>
                            <p>Does anyone smoke or vape inside your house?</p>
                            <label>
                                <input 
                                    type="radio" 
                                    name="insideHouse" 
                                    value="smoke" 
                                    checked={insideHouse === "smoke"}
                                    disabled 
                                />
                                Smoke
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="insideHouse" 
                                    value="vape" 
                                    checked={insideHouse === "vape"}
                                    disabled 
                                />
                                Vape
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="insideHouse" 
                                    value="neither" 
                                    checked={insideHouse === "neither"}
                                    disabled 
                                />
                                Neither
                            </label>
                        </div>
                        <div className={styles.questionGroup}>
                            <p>Does anyone smoke or vape inside your car?</p>
                            <label>
                                <input 
                                    type="radio" 
                                    name="insideCar" 
                                    value="smoke" 
                                    checked={insideCar === "smoke"}
                                    disabled 
                                />
                                Smoke
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="insideCar" 
                                    value="vape" 
                                    checked={insideCar === "vape"}
                                    disabled 
                                />
                                Vape
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="insideCar" 
                                    value="neither" 
                                    checked={insideCar === "neither"}
                                    disabled 
                                />
                                Neither
                            </label>
                        </div>
                        <div className={styles.questionGroup}>
                            <p>Is smoking or vaping allowed in your workplace?</p>
                            <label>
                                <input 
                                    type="radio" 
                                    name="workplace" 
                                    value="smoke" 
                                    checked={workplace === "smoke"}
                                    disabled 
                                />
                                Smoke
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="workplace" 
                                    value="vape" 
                                    checked={workplace === "vape"}
                                    disabled 
                                />
                                Vape
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="workplace" 
                                    value="neither" 
                                    checked={workplace === "neither"}
                                    disabled 
                                />
                                Neither
                            </label>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <p><b>7.) How many minutes after you wake up do you smoke your first cigarette or use a tobacco product?</b></p>
                        <div className={styles.options}>
                            <label>
                                <input 
                                    type="radio" 
                                    name="firstUseAfterWake" 
                                    value="immediately"
                                    checked={firstUseAfterWake === "immediately"}
                                    disabled 
                                />
                                Immediately
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="firstUseAfterWake" 
                                    value="5-30 minutes"
                                    checked={firstUseAfterWake === "5-30 minutes"}
                                    disabled 
                                />
                                5-30 minutes
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="firstUseAfterWake" 
                                    value="31-60 minutes"
                                    checked={firstUseAfterWake === "31-60 minutes"}
                                    disabled 
                                />
                                31-60 minutes
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="firstUseAfterWake" 
                                    value="more than 60"
                                    checked={firstUseAfterWake === "more than 60"}
                                    disabled 
                                />
                                More than 60 minutes
                            </label>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <p><b>8.) Do you sometimes wake up at night to have a cigarette or use tobacco?</b></p>
                        <div className={styles.options}>
                            <label>
                                <input 
                                    type="radio" 
                                    name="wakeUpForTobacco" 
                                    value="yes"
                                    checked={wakeUpForTobacco === "yes"} 
                                    disabled 
                                />
                                Yes
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="wakeUpForTobacco" 
                                    value="no"
                                    checked={wakeUpForTobacco === "no"}
                                    disabled 
                                />
                                No
                            </label>
                            <label className={styles.nightsPerWeekLabel}>
                                If yes, how often?
                                <input 
                                    type="text" 
                                    name="nightsPerWeek" 
                                    className={styles.nightsPerWeekInput} 
                                    placeholder="____ nights per week"
                                    value={nightsPerWeek}
                                    disabled 
                                />
                            </label>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <p><b>9.) How many times have you made a serious attempt to quit smoking or using tobacco products?</b></p>
                        <div className={styles.optionGroup}>
                            {['0', '1', '2', '3', '4', '5 or more'].map((attempt, index) => (
                                <label key={index}>
                                    <input 
                                        type="radio" 
                                        name="quitAttempts" 
                                        value={attempt}
                                        checked={quitAttempts === attempt}
                                        disabled 
                                    />
                                    {attempt}
                                </label>
                            ))}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <p><b>10.) Tell us more about the times you have tried to quit in the past:</b></p>
                        <table className={styles.quitTable}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Your most recent quit attempt</th>
                                    <th>The time when you stayed quit the longest</th>
                                </tr>
                            </thead>
                            <tbody>
                                {['Age', 'Year', 'Help', 'Duration', 'ReturnReason'].map((field, index) => (
                                    <tr key={field}>
                                        <td>{`What ${field.toLowerCase()} was it?`}</td>
                                        <td>
                                            <input 
                                                type="text" 
                                                name={`recentQuit${field}`}
                                                value={recentQuitDetails[field] || ''}  
                                                disabled 
                                            />
                                        </td>
                                        <td>
                                            <input 
                                                type="text" 
                                                name={`longestQuit${field}`}
                                                value={longestQuitDetails[field] || ''} 
                                                disabled 
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>

                    <section className={styles.section}>
                    <p><b>11.) In the past, what medications have you used to help you quit?</b></p>
                    <label>
                        <input 
                            type="checkbox" 
                            name="noMedications"
                            checked={medications.noMedications}
                            disabled
                        />
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
                            <tr key={index}>
                                <td>{medication}</td>
                                <td>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name={`used-${index}`} 
                                            value="yes"
                                            checked={medication.used === "yes"} 
                                            disabled 
                                        />
                                        Yes
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name={`used-${index}`} 
                                            value="no" 
                                            checked={medication.used === "no"}
                                            disabled 
                                        />
                                        No
                                    </label>
                                </td>
                                <td>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name={`result-${index}`} 
                                            value="workedWell" 
                                            checked={medication.result === "workedWell"}
                                            disabled 
                                        />
                                        Worked Well
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name={`result-${index}`} 
                                            value="didNotWork" 
                                            checked={medication.result === "didNotWork"}
                                            disabled 
                                        />
                                        Did Not Work
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name={`result-${index}`} 
                                            value="sideEffects" 
                                            checked={medication.result === "sideEffects"}
                                            disabled 
                                        />
                                        Too Many Side Effects
                                    </label>
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        name={`sideEffects-${index}`} 
                                        placeholder="Describe any side effects"
                                        value={medication.sideEffects}
                                        disabled 
                                    />
                                </td>
                                <td>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name={`mightUse-${index}`} 
                                            value="yes" 
                                            checked={medication.mightUse === "yes"}
                                            disabled 
                                        />
                                        Yes
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name={`mightUse-${index}`} 
                                            value="no"
                                            checked={medication.mightUse === "no"}
                                            disabled 
                                        />
                                        No
                                    </label>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>

                <button type="button" className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default SmokingTobaccoUseReadOnly;


