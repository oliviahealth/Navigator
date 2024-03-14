import React from 'react';
import styles from '../styles/FormCoverLetter.module.css';

const FormCoverLetter = () => {
  const goBack = () => {
    window.history.back();
  };

  const printContent = () => {
    window.print();
  };

  return (
    <div className={styles.coverLetterContainer}>
      <div className={styles.coverLetterContent}>
        <h1>WELCOME & ENROLLMENT & CONSENT FORMS COVER LETTER v.2.26.24 </h1>
        <p>
        Dear Mother-to-Be, 
        <br></br><br></br>
        Welcome to GC-MOMS!
        <br></br><br></br> 
        Congratulations for taking a bold step for you and your baby’s health and your family’s future by enrolling in the GC-MOMS (Golden Crescent Management of Opioid Risk in Mothers) Program (hereinafter referred to as the Program). Once enrolled, your Navigator Home Visitor will visit you every on a regular basis (approximately one time per month) until your baby is one years old. Your Navigator will link you with community resources and give you information and support at this important time in your life. 
        <br></br><br></br>
        The GC-MOMS Program is an integrated part of the Program of Excellence for Mothers, Children & Families at the Texas A&M College of Nursing.  
        <br></br><br></br>
        In order to have a successful relationship with our clients, we have some rules that guide our actions. To ensure a shared understanding, we would like you to know the following: 
        <br></br><br></br>
        The Navigator Home Visitor (NHV) will support you in every way we can that is reasonable and appropriate and within our scope as Nurses and within the parameters of the program and university.  
        <br></br><br></br>
        The Navigator Home Visitor is <u>not allowed</u> to: 
        <br></br><br></br>
        1. Give or accept gifts. This includes cash, gift certificates and items.<br></br>  
        2. Drive you in their personal vehicle. However, they may refer you to a service available in the community.<br></br> 
        3. Participate in a social network (i.e. Facebook, Twitter, Instagram) with clients.<br></br> 
        4. Give out their personal phone numbers. The nurse will use their work phone which they will turn off after work hours (Monday – Friday, 8 AM – 5 PM). Text messaging will be used for the purpose of scheduling visits - no health teaching/nursing advice will be done through text.<br></br> 
        5. Attend private events like baby showers, christenings or marriage ceremonies. If invited by you and their schedule allows, the nurse may attend public events like graduation or school ceremonies.<br></br> 
        5. Perform visits in the home when there are potential safety concerns for your nurse (to be determined with Director/Nurse Supervisor). Visits can be scheduled in a different location.
        <br></br><br></br>

        The Navigator Home Visitor will work with your and their calendars to determine the best dates/times to meet. They will work with your calendar when they need to schedule or reschedule to meet with you (due to vacation, training, etc).  
        <br></br><br></br>
        Other Navigator Home Visitors and a Community Health Worker may also work with you. Our Navigator Supervisor / Team Lead and an Administrative and Clinical Team will be closely involved. 
        <br></br><br></br>
        We appreciate your choice to enroll in the NFP@TAMU program. We look forward to partnering with you and helping you reach your goals for a healthy pregnancy, healthy child and increasing self-sufficiency for you and your family. 
        <br></br><br></br>
        Communication is essential. Reach out to us if we can answer any questions or support you in any way.
        <br></br><br></br>
        <table className={styles.table}>
        <thead>
            <tr>
            <th>Walter Page MS, BSN, RN Director of Maternal Child & Family Initiatives</th>
            <th>Kat Hickl, MSW GC-MOMS Team Lead</th>
            <th>TBD’d Navigator Home Visitor</th>
            <th>TBD’d Navigator Home Visitor</th>
            <th>TBD’d Navigator Home Visitor</th>
            <th>Susan Williams Sr. Admin. Coord.</th>
            </tr>
        </thead>
        </table>
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.cancelButton} onClick={goBack}>Cancel</button>
        <button className={styles.printButton} onClick={printContent}>Print</button>
      </div>
    </div>
  );
};

export default FormCoverLetter;
