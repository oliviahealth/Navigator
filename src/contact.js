import React from 'react';
import walterPageImage from '../src/assets/walter-page.jpg';
import TungImage from '../src/assets/Tung-Nguyen-CSCE-5Sept23.jpg';

const Contact = () => {
  const contacts = [
    {
      name: 'Walter Page',
      phoneNumber: '979-436-0213',
      email: 'wpage@tamu.edu',
      image: walterPageImage // Using the imported image
    },
    {
      name: 'Tung Nguyen',
      phoneNumber: '979-458-5602',
      email: 'tung@tamu.edu',
      image: TungImage // Placeholder image URL
    },
    {
      name: 'Naimish Kavani',
      phoneNumber: '512-545-5158',
      email: 'Naimishkavani@tamu.edu',
    },
    {
      name: 'Yingchen Dong',
      phoneNumber: '954-224-2950',
      email: 'yc.dong@tamu.edu',
    },
    {
      name: 'Afeen Fatima',
      phoneNumber: '469-496-9665',
      email: 'a3pmfatima@tamu.edu',
    },

    // Add more contacts as needed
  ];

  const rows = [
    <tr key="sponsor-row">
      <td colSpan="2" className="sponsor">
        <h2 className="center-title">Sponsor: </h2>
      </td>
    </tr>,
    <tr key="sponsor-contacts">
      {contacts.slice(0, 2).map((contact, index) => (
        <td key={index} className="contact-cell">
          <img
            src={contact.image}
            alt={`${contact.name}`}
            width="150"
            height="150"
          />
          <div className="contact-details">
            <p>{contact.name}</p>
            <p>{contact.phoneNumber}</p>
            <p>{contact.email}</p>
          </div>
        </td>
      ))}
    </tr>,
    <tr key="developer-row">
      <td colSpan="2" className="developer">
        <h1 className="center-title">Developer: </h1>
      </td>
    </tr>,
    <tr key="developer-contacts">
      {contacts.slice(2).map((contact, index) => (
        <td key={index} className="contact-cell">
          <div className="contact-details">
            <p>{contact.name}</p>
            <p>{contact.phoneNumber}</p>
            <p>{contact.email}</p>
          </div>
        </td>
      ))}
    </tr>
  ];

  return (
    <div className="contact-page">
      <h1 className="contact-title">Contact Information</h1>
      <table className="contact-table">
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default Contact;
