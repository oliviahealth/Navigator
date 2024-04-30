import React, { useState, useEffect } from 'react';
import styles from '../../styles/SmokingTobaccoUse.module.css';
import { useParams } from 'react-router-dom';

const SmokingTobaccoUseReadOnly = () => {
    const { patientId, log_id } = useParams();
    const [products, setProducts] = useState([
        'Cigarettes',
        'E-cigarettes',
        'Chewing Tobacco',
        'Cigars',
        'Pipe Tobacco',
        'Snuff'
    ]);
    const [formData, setFormData] = useState({
        // Initializing state for each form section
        smokingStatus: {},
        tobaccoUse: {},
        typicalUsage: "",
        mentholProductUse: "",
        brandsUsed: "",
        exposure: {
            aroundChildren: "",
            insideHouse: "",
            insideCar: "",
            workplace: "",
        },
        firstUseAfterWake: "",
        wakeUpForTobacco: "",
        nightsPerWeek: "",
        quitAttempts: "",
        pastQuitDetails: {
            recentQuitAge: "",
            recentQuitYear: "",
            recentQuitHelp: "",
            recentQuitDuration: "",
            recentQuitReturnReason: "",
            longestQuitAge: "",
            longestQuitYear: "",
            longestQuitHelp: "",
            longestQuitDuration: "",
            longestQuitReturnReason: "",
        },
        medicationsUsed: {},
        hasUsedMedications: ""
    });

    useEffect(() => {
        const fetchLog = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/smoking_tobacco_use/${patientId}/${log_id}`, {
                  method: 'GET',
                  credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                if (response.status === 204) { // Handling no content
                    return; 
                }
                const data = await response.json();
                setFormData(data[2]);
                
            } catch (error) {
                console.error('Error fetching sipport system info:', error);
            }
        };
    
        fetchLog();
    }, [patientId, log_id]);

    const handleCancel = () => {
        window.history.back();
    };

    const handleChange = (name, value, section = '') => {
        if (section) {
            setFormData(prevState => ({
                ...prevState,
                [section]: {
                    ...prevState[section],
                    [name]: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    return (
        <div className={styles.container}>
            <form>
                <h1 className={styles.title}>Tobacco Use Screening and Documentation Form</h1>
                {/* Section for clients who had a baby in the past year */}
                <section className={styles.section}>
                    {/* This section should ideally use radio buttons for single selection */}
                    {/* Here are checkboxes for demonstration. Adjust as needed */}
                    <p>For clients who had a baby in the past year:</p>
                    <p><b>1.) Ask the Participant to choose the statement that best describes their smoking status: </b></p>
                    {['NEVER', 'BEFORE', 'AFTER', 'DURING', 'NOW'].map((status, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                checked={formData.smokingStatus[status] || false}
                                disabled
                            />
                            {`Status ${status}`}
                        </label>
                    ))}
                </section>

                <section className={styles.section}>
                    <p><b>2.) This question asks about all tobacco products, including e-cigarettes, also known as vapes. </b></p>
                    <div className={styles.scrollableTable}>
                        <table className={styles.table}>
                            {/* Table headers and other static content */}
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index}>
                                        <td>{product}</td>
                                        {Array(10).fill().map((_, i) => (
                                            <td key={i}>
                                                <input
                                                    type="radio"
                                                    name={`product${index}-time${i}`}
                                                    checked={formData.tobaccoUse[`product${index}-time${i}`] || false}
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
                    <p><b>3.) For each tobacco product that you use, how much do you use on a typical day or week when you are smoking, vaping, or using tobacco?</b></p>
                    <textarea
                        className={styles.largeTextbox}
                        rows="4"
                        placeholder="Describe your usage"
                        value={formData.typicalUsage}
                        disabled
                    />
                </section>

                <section className={styles.section}>
                    <p><b>4.) Do you use menthol products?</b></p>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="mentholProductUse"
                                value="yes"
                                checked={formData.mentholProductUse === 'yes'}
                                disabled
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="mentholProductUse"
                                value="no"
                                checked={formData.mentholProductUse === 'no'}
                                disabled
                            />
                            No
                        </label>
                    </div>
                </section>

                <section className={styles.section}>
                    <p><b>5.) List all brands of tobacco products that you typically use:</b></p>
                    <textarea
                        className={styles.textbox}
                        rows="2"
                        placeholder="List all brands"
                        value={formData.brandsUsed}
                        disabled
                    />
                </section>

                <section className={styles.section}>
                    <p><b>6.) Does anyone smoke or vape around you and/or your children?</b></p>
                    <div className={styles.questionGroup}>
                        <label>
                            <input
                                type="radio"
                                name="aroundChildren"
                                value="smoke"
                                checked={formData.exposure.aroundChildren === 'smoke'}
                                disabled
                            />
                            Smoke
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="aroundChildren"
                                value="vape"
                                checked={formData.exposure.aroundChildren === 'vape'}
                                disabled
                            />
                            Vape
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="aroundChildren"
                                value="neither"
                                checked={formData.exposure.aroundChildren === 'neither'}
                                disabled
                            />
                            Neither
                        </label>
                    </div>
                    <div className={styles.questionGroup}>
                        <p>Does anyone smoke or vape inside your house?</p>
                        {/* Similar radio group for insideHouse */}
                    </div>
                    <div className={styles.questionGroup}>
                        <p>Does anyone smoke or vape inside your car?</p>
                        {/* Similar radio group for insideCar */}
                    </div>
                    <div className={styles.questionGroup}>
                        <p>Is smoking or vaping allowed in your workplace?</p>
                        {/* Similar radio group for workplace */}
                    </div>
                </section>

                <section className={styles.section}>
                    <p><b>7.) How many minutes after you wake up do you smoke your first cigarette or use a tobacco product?</b></p>
                    <div className={styles.options}>
                        {/* Similar radio options for firstUseAfterWake */}
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
                                checked={formData.wakeUpForTobacco === 'yes'}
                                disabled
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="wakeUpForTobacco"
                                value="no"
                                checked={formData.wakeUpForTobacco === 'no'}
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
                                value={formData.nightsPerWeek}
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
                                    checked={formData.quitAttempts === attempt}
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
                            {['Age', 'Year', 'Help', 'Duration', 'ReturnReason'].map((field) => (
                                <tr key={field}>
                                    <td>{`What ${field.toLowerCase()} was it?`}</td>
                                    <td>
                                        <input
                                            type="text"
                                            name={`recentQuit${field}`}
                                            value={formData.pastQuitDetails[`recentQuit${field}`]}
                                            disabled
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name={`longestQuit${field}`}
                                            value={formData.pastQuitDetails[`longestQuit${field}`]}
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
                    <div>
                        {['Nicotine Patch', 'Nicotine Gum', 'Nicotine Oral Inhaler (puffer)', 'Nicotine Nasal Spray', 'Nicotine Lozenge (Commit)', 'Zyban/Wellbutrin/Bupropion', 'Chantix/varenicline'].map((medication, index) => (
                            <div key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={formData.medicationsUsed[medication] || false}
                                        disabled
                                    />
                                    {medication}
                                </label>
                            </div>
                        ))}
                    </div>
                </section>
                <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
            </form>
        </div>
    );
};

export default SmokingTobaccoUseReadOnly;