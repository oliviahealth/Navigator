// import React, { useState } from 'react';
// import styles from '../styles/SmokingTobaccoUse.module.css';
// import { useParams } from 'react-router-dom';
// import Cookies from 'js-cookie';

// const SmokingTobaccoUse = () => {
//     const { patientId } = useParams();
//     const [products, setProducts] = useState([
//         'Cigarettes',
//         'E-cigarettes',
//         'Chewing Tobacco',
//         'Cigars',
//         'Pipe Tobacco',
//         'Snuff'
//     ]);
//     const [formData, setFormData] = useState({
//         // Initializing state for each form section
//         smokingStatus: {},
//         tobaccoUse: {},
//         typicalUsage: "",
//         mentholProductUse: "",
//         brandsUsed: "",
//         exposure: {
//             aroundChildren: "",
//             insideHouse: "",
//             insideCar: "",
//             workplace: "",
//         },
//         firstUseAfterWake: "",
//         wakeUpForTobacco: "",
//         nightsPerWeek: "",
//         quitAttempts: "",
//         pastQuitDetails: {
//             recentQuitAge: "",
//             recentQuitYear: "",
//             recentQuitHelp: "",
//             recentQuitDuration: "",
//             recentQuitReturnReason: "",
//             longestQuitAge: "",
//             longestQuitYear: "",
//             longestQuitHelp: "",
//             longestQuitDuration: "",
//             longestQuitReturnReason: "",
//         },
//         medicationsUsed: {},
//         hasUsedMedications: ""
//     });

//     const handleCancel = () => {
//         window.history.back();
//     };

//     const handleChange = (name, value, section = '') => {
//         if (section) {
//             setFormData(prevState => ({
//                 ...prevState,
//                 [section]: {
//                     ...prevState[section],
//                     [name]: value
//                 }
//             }));
//         } else {
//             setFormData(prevState => ({
//                 ...prevState,
//                 [name]: value
//             }));
//         }
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
// const accessToken = Cookies.get('accessToken');
//         try {
//             const response = await fetch(`${import.meta.env.VITE_API_URL}/api/insert_forms/smoking_tobacco_use/${patientId}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${accessToken}`
//                 },
//                 credentials: 'omit',
//                 body: JSON.stringify(formData),
//             });
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const data = await response.json();
//             window.history.back();
//         } catch (error) {
//             console.error('failed to submit');
//         }
//     };

//     return (
//         <div className={styles.container}>
//             <form onSubmit={handleSubmit}>
//                 <h1 className={styles.title}>Smoking / Tobacco Use before, during Pregnancy and at 1, 3, 6, 9, & 12 Months Postpartum</h1>
//                 <section className={styles.section}>
//                     <p>For clients who had a baby in the past year:</p>
//                     <p><b>1.) Ask the Participant to choose the statement that best describes their smoking status: </b></p>
//                     {['NEVER', 'BEFORE', 'AFTER', 'DURING', 'NOW'].map((status, index) => (
//                         <label key={index}>
//                             <input
//                                 type="checkbox"
//                                 checked={formData.smokingStatus[status] || false}
//                                 onChange={(e) => handleChange(status, e.target.checked, 'smokingStatus')}
//                             />
//                             {`Status ${status}`}
//                         </label>
//                     ))}
//                 </section>

//                 <section className={styles.section}>
//                     <p><b>2.) This question asks about all tobacco products, including e-cigarettes, also known as vapes. </b></p>
//                     <div className={styles.scrollableTable}>
//                         <table className={styles.table}>
//                             {/* Table headers and other static content */}
//                             <tbody>
//                                 {products.map((product, index) => (
//                                     <tr key={index}>
//                                         <td>{product}</td>
//                                         {Array(10).fill().map((_, i) => (
//                                             <td key={i}>
//                                                 <input
//                                                     type="radio"
//                                                     name={`product${index}-time${i}`}
//                                                     checked={formData.tobaccoUse[`product${index}-time${i}`] || false}
//                                                     onChange={(e) => handleChange(`product${index}-time${i}`, e.target.checked, 'tobaccoUse')}
//                                                 />
//                                             </td>
//                                         ))}
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </section>

//                 <section className={styles.section}>
//                     <p><b>3.) For each tobacco product that you use, how much do you use on a typical day or week when you are smoking, vaping, or using tobacco?</b></p>
//                     <textarea
//                         className={styles.largeTextbox}
//                         rows="4"
//                         placeholder="Describe your usage"
//                         value={formData.typicalUsage}
//                         onChange={(e) => handleChange('typicalUsage', e.target.value)}
//                     />
//                 </section>

//                 <section className={styles.section}>
//                     <p><b>4.) Do you use menthol products?</b></p>
//                     <div>
//                         <label>
//                             <input
//                                 type="radio"
//                                 name="mentholProductUse"
//                                 value="yes"
//                                 checked={formData.mentholProductUse === 'yes'}
//                                 onChange={(e) => handleChange('mentholProductUse', e.target.value)}
//                             />
//                             Yes
//                         </label>
//                         <label>
//                             <input
//                                 type="radio"
//                                 name="mentholProductUse"
//                                 value="no"
//                                 checked={formData.mentholProductUse === 'no'}
//                                 onChange={(e) => handleChange('mentholProductUse', e.target.value)}
//                             />
//                             No
//                         </label>
//                     </div>
//                 </section>

//                 <section className={styles.section}>
//                     <p><b>5.) List all brands of tobacco products that you typically use:</b></p>
//                     <textarea
//                         className={styles.textbox}
//                         rows="2"
//                         placeholder="List all brands"
//                         value={formData.brandsUsed}
//                         onChange={(e) => handleChange('brandsUsed', e.target.value)}
//                     />
//                 </section>

//                 <section className={styles.section}>
//                     <p><b>6.) Does anyone smoke or vape around you and/or your children?</b></p>
//                     <div className={styles.questionGroup}>
//                         <label>
//                             <input
//                                 type="radio"
//                                 name="aroundChildren"
//                                 value="smoke"
//                                 checked={formData.exposure.aroundChildren === 'smoke'}
//                                 onChange={(e) => handleChange('aroundChildren', e.target.value, 'exposure')}
//                             />
//                             Smoke
//                         </label>
//                         <label>
//                             <input
//                                 type="radio"
//                                 name="aroundChildren"
//                                 value="vape"
//                                 checked={formData.exposure.aroundChildren === 'vape'}
//                                 onChange={(e) => handleChange('aroundChildren', e.target.value, 'exposure')}
//                             />
//                             Vape
//                         </label>
//                         <label>
//                             <input
//                                 type="radio"
//                                 name="aroundChildren"
//                                 value="neither"
//                                 checked={formData.exposure.aroundChildren === 'neither'}
//                                 onChange={(e) => handleChange('aroundChildren', e.target.value, 'exposure')}
//                             />
//                             Neither
//                         </label>
//                     </div>
//                     <div className={styles.questionGroup}>
//                         <p>Does anyone smoke or vape inside your house?</p>
//                         {/* Similar radio group for insideHouse */}
//                     </div>
//                     <div className={styles.questionGroup}>
//                         <p>Does anyone smoke or vape inside your car?</p>
//                         {/* Similar radio group for insideCar */}
//                     </div>
//                     <div className={styles.questionGroup}>
//                         <p>Is smoking or vaping allowed in your workplace?</p>
//                         {/* Similar radio group for workplace */}
//                     </div>
//                 </section>

//                 <section className={styles.section}>
//                     <p><b>7.) How many minutes after you wake up do you smoke your first cigarette or use a tobacco product?</b></p>
//                     <div className={styles.options}>
//                         {/* Similar radio options for firstUseAfterWake */}
//                     </div>
//                 </section>

//                 <section className={styles.section}>
//                     <p><b>8.) Do you sometimes wake up at night to have a cigarette or use tobacco?</b></p>
//                     <div className={styles.options}>
//                         <label>
//                             <input
//                                 type="radio"
//                                 name="wakeUpForTobacco"
//                                 value="yes"
//                                 checked={formData.wakeUpForTobacco === 'yes'}
//                                 onChange={(e) => handleChange('wakeUpForTobacco', e.target.value)}
//                             />
//                             Yes
//                         </label>
//                         <label>
//                             <input
//                                 type="radio"
//                                 name="wakeUpForTobacco"
//                                 value="no"
//                                 checked={formData.wakeUpForTobacco === 'no'}
//                                 onChange={(e) => handleChange('wakeUpForTobacco', e.target.value)}
//                             />
//                             No
//                         </label>
//                         <label className={styles.nightsPerWeekLabel}>
//                             If yes, how often?
//                             <input
//                                 type="text"
//                                 name="nightsPerWeek"
//                                 className={styles.nightsPerWeekInput}
//                                 placeholder="____ nights per week"
//                                 value={formData.nightsPerWeek}
//                                 onChange={(e) => handleChange('nightsPerWeek', e.target.value)}
//                             />
//                         </label>
//                     </div>
//                 </section>

//                 <section className={styles.section}>
//                     <p><b>9.) How many times have you made a serious attempt to quit smoking or using tobacco products?</b></p>
//                     <div className={styles.optionGroup}>
//                         {['0', '1', '2', '3', '4', '5 or more'].map((attempt, index) => (
//                             <label key={index}>
//                                 <input
//                                     type="radio"
//                                     name="quitAttempts"
//                                     value={attempt}
//                                     checked={formData.quitAttempts === attempt}
//                                     onChange={(e) => handleChange('quitAttempts', e.target.value)}
//                                 />
//                                 {attempt}
//                             </label>
//                         ))}
//                     </div>
//                 </section>

//                 <section className={styles.section}>
//                     <p><b>10.) Tell us more about the times you have tried to quit in the past:</b></p>
//                     <table className={styles.quitTable}>
//                         <thead>
//                             <tr>
//                                 <th></th>
//                                 <th>Your most recent quit attempt</th>
//                                 <th>The time when you stayed quit the longest</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {['Age', 'Year', 'Help', 'Duration', 'ReturnReason'].map((field) => (
//                                 <tr key={field}>
//                                     <td>{`What ${field.toLowerCase()} was it?`}</td>
//                                     <td>
//                                         <input
//                                             type="text"
//                                             name={`recentQuit${field}`}
//                                             value={formData.pastQuitDetails[`recentQuit${field}`]}
//                                             onChange={(e) => handleChange(`recentQuit${field}`, e.target.value, 'pastQuitDetails')}
//                                         />
//                                     </td>
//                                     <td>
//                                         <input
//                                             type="text"
//                                             name={`longestQuit${field}`}
//                                             value={formData.pastQuitDetails[`longestQuit${field}`]}
//                                             onChange={(e) => handleChange(`longestQuit${field}`, e.target.value, 'pastQuitDetails')}
//                                         />
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </section>

//                 <section className={styles.section}>
//                     <p><b>11.) In the past, what medications have you used to help you quit?</b></p>
//                     <div>
//                         {['Nicotine Patch', 'Nicotine Gum', 'Nicotine Oral Inhaler (puffer)', 'Nicotine Nasal Spray', 'Nicotine Lozenge (Commit)', 'Zyban/Wellbutrin/Bupropion', 'Chantix/varenicline'].map((medication, index) => (
//                             <div key={index}>
//                                 <label>
//                                     <input
//                                         type="checkbox"
//                                         checked={formData.medicationsUsed[medication] || false}
//                                         onChange={(e) => handleChange(medication, e.target.checked, 'medicationsUsed')}
//                                     />
//                                     {medication}
//                                 </label>
//                             </div>
//                         ))}
//                     </div>
//                 </section>
//                 <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
//                 <button type="submit" className={styles.button}>Submit</button>
//             </form>
//         </div>
//     );
// };

// export default SmokingTobaccoUse;





//CORRECT FRONT-END WITH COMPLETE BACK-END INTEGRATION

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
                const updatedTimes = product[period].map((v, i) => i === timeIndex ? value : v);
                return {
                    ...product,
                    [period]: updatedTimes
                };
            }
            return product;
        }));
    };

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
            case "insideHouse":
            case "insideCar":
            case "workplace":
            case "firstUseAfterWake":
            case "wakeUpForTobacco":
            case "quitAttempts":
                setSmokingStatus(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
                break;
            default:
                console.warn(`No handler for field: ${name}`);
                break;
        }
    };    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            smokingStatus,
            usageFrequency,
            typicalUsage,
            mentholProductUse,
            brandsUsed
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
            console.error('Failed to submit:', error);
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
                                />
                                Smoke
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="aroundChildren" 
                                    value="vape"
                                    onChange={handleInputChange} 
                                />
                                Vape
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="aroundChildren" 
                                    value="neither"
                                    onChange={handleInputChange} 
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
                                />
                                Smoke
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="insideHouse" 
                                    value="vape" 
                                    onChange={handleInputChange} 
                                />
                                Vape
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="insideHouse" 
                                    value="neither" 
                                    onChange={handleInputChange} 
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
                                />
                                Smoke
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="insideCar" 
                                    value="vape" 
                                    onChange={handleInputChange} 
                                />
                                Vape
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="insideCar" 
                                    value="neither" 
                                    onChange={handleInputChange} 
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
                                />
                                Smoke
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="workplace" 
                                    value="vape" 
                                    onChange={handleInputChange} 
                                />
                                Vape
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="workplace" 
                                    value="neither" 
                                    onChange={handleInputChange} 
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
                                />
                                Immediately
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="firstUseAfterWake" 
                                    value="5-30 minutes"
                                    onChange={handleInputChange} 
                                />
                                5-30 minutes
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="firstUseAfterWake" 
                                    value="31-60 minutes"
                                    onChange={handleInputChange} 
                                />
                                31-60 minutes
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="firstUseAfterWake" 
                                    value="more than 60"
                                    onChange={handleInputChange} 
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
                                />
                                Yes
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="wakeUpForTobacco" 
                                    value="no"
                                    onChange={handleInputChange} 
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
                                                onChange={handleInputChange} 
                                            />
                                        </td>
                                        <td>
                                            <input 
                                                type="text" 
                                                name={`longestQuit${field}`} 
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
                                            onChange={handleInputChange} 
                                        />
                                        Yes
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name={`used-${index}`} 
                                            value="no" 
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
                                            onChange={handleInputChange} 
                                        />
                                        Worked Well
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name={`result-${index}`} 
                                            value="didNotWork" 
                                            onChange={handleInputChange} 
                                        />
                                        Did Not Work
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name={`result-${index}`} 
                                            value="sideEffects" 
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
                                        onChange={handleInputChange} 
                                    />
                                </td>
                                <td>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name={`mightUse-${index}`} 
                                            value="yes" 
                                            onChange={handleInputChange} 
                                        />
                                        Yes
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name={`mightUse-${index}`} 
                                            value="no" 
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


