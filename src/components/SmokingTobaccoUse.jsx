import React, { useState } from 'react';
import styles from '../styles/SmokingTobaccoUse.module.css';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const SmokingTobaccoUse = () => {
    const { patientId } = useParams();
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
                const updatedTimes = product[period].map((v, i) => i === timeIndex ? value : false);
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

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        switch (name) {
            case "typicalUsage":
                setTypicalUsage(value);
                break;
            case "mentholProductUse":
                setMentholProductUse(value);
                break;
            case "brandsUsed":
                setBrandsUsed(value);
                break;
            case "aroundChildren":
                setAroundChildren(value);
                break;
            case "insideHouse":
                setInsideHouse(value);
                break;
            case "insideCar":
                setInsideCar(value);
                break;
            case "workplace":
                setWorkplace(value);
                break;
            case "firstUseAfterWake":
                setFirstUseAfterWake(value);
                break;
            case "wakeUpForTobacco":
                setWakeUpForTobacco(value);
                break;
            case "nightsPerWeek":
                setNightsPerWeek(value);
                break;
            case "quitAttempts":
                setSmokingStatus(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
                break;
            case "quitAttempts":
                setQuitAttempts(value);
                break;
            default:
                console.warn(`No handler for field: ${name}`);
                break;
        }
        if (name.startsWith("recentQuit")) {
            const field = name.replace("recentQuit", "");
            setRecentQuitDetails(prev => ({ ...prev, [field]: value }));
        } else if (name.startsWith("longestQuit")) {
            const field = name.replace("longestQuit", "");
            setLongestQuitDetails(prev => ({ ...prev, [field]: value }));
        }
        if (name === "noMedications") {
            setMedications(prev => ({ ...prev, noMedications: checked }));
        } else if (name.startsWith("used-") || name.startsWith("result-") || name.startsWith("mightUse-")) {
            const [key, index] = name.split('-');
            setMedications(prev => ({
                ...prev,
                details: prev.details.map((item, idx) => idx.toString() === index ? { ...item, [key]: value } : item)
            }));
        } else if (name.startsWith("sideEffects-")) {
            const index = name.split('-')[1];
            setMedications(prev => ({
                ...prev,
                details: prev.details.map((item, idx) => idx.toString() === index ? { ...item, sideEffects: value } : item)
            }));
        }
    };      

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            smokingStatus,
            usageFrequency,
            typicalUsage,
            mentholProductUse,
            brandsUsed,
            aroundChildren,
            insideHouse,
            insideCar,
            workplace,
            firstUseAfterWake,
            wakeUpForTobacco,
            nightsPerWeek,
            quitAttempts,
            recentQuitDetails,
            longestQuitDetails,
            medications
        };
        try {
            const accessToken = Cookies.get('accessToken');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/insert_forms/smoking_tobacco_use/${patientId}`, {
                method: 'POST',
                credentials: 'omit',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                 },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Form submitted successfully');
            window.history.back();
        } catch (error) {
            console.error('Failed to submit');
        }
    };

    const handleCancel = () => {
        window.history.back();
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <h1 className={styles.title}>Smoking / Tobacco Use before, during Pregnancy and at 1, 3, 6, 9, & 12 Months Postpartum</h1>
                <section className={styles.section}>
                    <p>For clients who had a baby in the past year:</p>
                    <p><b>1.) Ask the Participant to choose the statement that best describes their smoking status: </b></p>
                    <label>
                        <input 
                            type="checkbox" 
                            name="neverSmoked" 
                            checked={smokingStatus.neverSmoked} 
                            onChange={() => setSmokingStatus({...smokingStatus, neverSmoked: !smokingStatus.neverSmoked})} 
                        />
                        I have NEVER smoked or have smoked less than 100 cigarettes in my lifetime.
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="stoppedBeforePregnancy" 
                            checked={smokingStatus.stoppedBeforePregnancy} 
                            onChange={() => setSmokingStatus({...smokingStatus, stoppedBeforePregnancy: !smokingStatus.stoppedBeforePregnancy})} 
                        />
                        I stopped smoking BEFORE I found out I was pregnant and am not smoking now.
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="stoppedAfterPregnancy" 
                            checked={smokingStatus.stoppedAfterPregnancy} 
                            onChange={() => setSmokingStatus({...smokingStatus, stoppedAfterPregnancy: !smokingStatus.stoppedAfterPregnancy})} 
                        />
                        I stopped smoking AFTER I found out I was pregnant and I am not smoking now.
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="stoppedDuringButSmokingNow" 
                            checked={smokingStatus.stoppedDuringButSmokingNow} 
                            onChange={() => setSmokingStatus({...smokingStatus, stoppedDuringButSmokingNow: !smokingStatus.stoppedDuringButSmokingNow})} 
                        />
                        I stopped smoking during pregnancy but I am smoking now.
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="smokedDuringAndNow" 
                            checked={smokingStatus.smokedDuringAndNow} 
                            onChange={() => setSmokingStatus({...smokingStatus, smokedDuringAndNow: !smokingStatus.smokedDuringAndNow})} 
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
                                                    onChange={() => handleRadioChange(productIndex, timeIndex % 5, timeIndex < 5 ? 'past12Months' : 'pastMonth', true)} 
                                                    checked={usageFrequency[productIndex][timeIndex < 5 ? 'past12Months' : 'pastMonth'][timeIndex % 5]}
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
                        onChange={handleInputChange}
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
                                onChange={handleInputChange} 
                            />
                            Yes
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="mentholProductUse" 
                                value="no" 
                                checked={mentholProductUse === 'no'}
                                onChange={handleInputChange} 
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
                        onChange={handleInputChange}
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
                                    onChange={handleInputChange} 
                                    checked={aroundChildren === "smoke"}
                                />
                                Smoke
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="aroundChildren" 
                                    value="vape"
                                    onChange={handleInputChange} 
                                    checked={aroundChildren === "vape"}
                                />
                                Vape
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="aroundChildren" 
                                    value="neither"
                                    onChange={handleInputChange} 
                                    checked={aroundChildren === "neither"}
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
                                    onChange={handleInputChange}
                                    checked={insideHouse === "smoke"}
                                />
                                Smoke
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="insideHouse" 
                                    value="vape"
                                    onChange={handleInputChange}
                                    checked={insideHouse === "vape"}
                                />
                                Vape
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="insideHouse" 
                                    value="neither"
                                    onChange={handleInputChange}
                                    checked={insideHouse === "neither"}
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
                                    onChange={handleInputChange}
                                    checked={insideCar === "smoke"}
                                />
                                Smoke
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="insideCar" 
                                    value="vape"
                                    onChange={handleInputChange}
                                    checked={insideCar === "vape"}
                                />
                                Vape
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="insideCar" 
                                    value="neither"
                                    onChange={handleInputChange}
                                    checked={insideCar === "neither"}
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
                                    onChange={handleInputChange}
                                    checked={workplace === "smoke"}
                                />
                                Smoke
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="workplace" 
                                    value="vape"
                                    onChange={handleInputChange}
                                    checked={workplace === "vape"}
                                />
                                Vape
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="workplace" 
                                    value="neither"
                                    onChange={handleInputChange}
                                    checked={workplace === "neither"}
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
                                    onChange={handleInputChange} 
                                    checked={firstUseAfterWake === "immediately"}
                                />
                                Immediately
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="firstUseAfterWake" 
                                    value="5-30 minutes"
                                    onChange={handleInputChange} 
                                    checked={firstUseAfterWake === "5-30 minutes"}
                                />
                                5-30 minutes
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="firstUseAfterWake" 
                                    value="31-60 minutes"
                                    onChange={handleInputChange} 
                                    checked={firstUseAfterWake === "31-60 minutes"}
                                />
                                31-60 minutes
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="firstUseAfterWake" 
                                    value="more than 60"
                                    onChange={handleInputChange} 
                                    checked={firstUseAfterWake === "more than 60"}
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
                                    onChange={handleInputChange}
                                    checked={wakeUpForTobacco === "yes"} 
                                />
                                Yes
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="wakeUpForTobacco" 
                                    value="no"
                                    onChange={handleInputChange}
                                    checked={wakeUpForTobacco === "no"}
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
                                    onChange={handleInputChange} 
                                    value={nightsPerWeek}
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
                                        onChange={handleInputChange} 
                                        checked={quitAttempts === attempt}
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
                                                onChange={handleInputChange} 
                                            />
                                        </td>
                                        <td>
                                            <input 
                                                type="text" 
                                                name={`longestQuit${field}`}
                                                value={longestQuitDetails[field] || ''} 
                                                onChange={handleInputChange} 
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
                            onChange={handleInputChange}
                            checked={medications.noMedications}
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
                                            onChange={handleInputChange} 
                                        />
                                        Yes
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name={`used-${index}`} 
                                            value="no" 
                                            checked={medication.used === "no"}
                                            onChange={handleInputChange} 
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
                                            onChange={handleInputChange} 
                                        />
                                        Worked Well
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name={`result-${index}`} 
                                            value="didNotWork" 
                                            checked={medication.result === "didNotWork"}
                                            onChange={handleInputChange} 
                                        />
                                        Did Not Work
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name={`result-${index}`} 
                                            value="sideEffects" 
                                            checked={medication.result === "sideEffects"}
                                            onChange={handleInputChange} 
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
                                        onChange={handleInputChange} 
                                    />
                                </td>
                                <td>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name={`mightUse-${index}`} 
                                            value="yes" 
                                            checked={medication.mightUse === "yes"}
                                            onChange={handleInputChange} 
                                        />
                                        Yes
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name={`mightUse-${index}`} 
                                            value="no" 
                                            checked={medication.mightUse === "no"}
                                            onChange={handleInputChange} 
                                        />
                                        No
                                    </label>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>

                {/* Submit and Cancel buttons */}
                <button type="button" className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
                <button type="submit" className={styles.button}>Submit</button>
            </form>
        </div>
    );
};

export default SmokingTobaccoUse;


