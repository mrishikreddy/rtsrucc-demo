import Image from 'next/image';
import styles from "./mot.module.css";

const teamMembers = [
  {
    name: 'Dr. Pramod Kumar Poladi',
    designation: 'Faculty Coordinator',
    image: '/pramod1.png',
    link: 'https://www.linkedin.com/in/dr-pramod-kumar-poladi-666224b2/',
  },
  {
    name: 'Paruchuri Umesh Chandra',
    designation: 'Chair',
    image: '/umesh.png',
    link: 'https://www.linkedin.com/in/paruchuriumeshchandra/',
  },
  {
    name: 'Narishetti Nagaraju',
    designation: 'Vice-Chair',
    image: '/nagaraju.png',
    link: 'https://www.linkedin.com/in/narishetti-nagaraju/',
  },
  {
    name: 'Ashmitha Reddy Rakki Reddy',
    designation: 'Secretary',
    image: '/ashmitha.png',
    link: 'https://www.linkedin.com/in/ashmitha-reddy-rakkireddy-03bb56285?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
  },
  {
    name: 'Male Rishik Reddy',
    designation: 'Management Head',
    image: '/rishik.png',
    link: 'https://www.rishik.tech/',
  },
  {
    name: 'Alluri Harsha Sri',
    designation: 'Operations Lead',
    image: '/harsha.jpg',
    link: 'https://www.linkedin.com/in/alluriharshasri/',
  },
  {
    name: 'Sameera Anjum',
    designation: 'Treasurer',
    image: '/sameera.jpg',
    link: 'https://www.linkedin.com/in/sameera-anjum-320987332/',
  },
  {
    name: 'Chaithra Alluri',
    designation: 'Marketing & PR Secretary',
    image: '/chaithra.png',
    link: 'https://www.linkedin.com/in/chaithraalluri/',
  },
  {
    name: 'Godishala Kruthik Roshan',
    designation: 'Membership Chair',
    image: '/roshan.png',
    link: 'https://www.linkedin.com/in/kruthikroshan/',
  },
  {
    name: 'Padala Krishna Chaithanya goud ',
    designation: 'Content & Creative Head',
    image: '/chaithanya.png',
    link: 'https://www.linkedin.com/in/krishna-chaithanya-goud-336983317/',
  },
  {
    name: 'Methuku Hindu Reddy',
    designation: 'Digital & Social Media Head',
    image: '/hindu.png',
    link: 'https://www.linkedin.com/in/methuku-hindu-reddy/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
  },
  {
    name: 'Devi Reddy Poojitha Reddy',
    designation: 'Web Master',
    image: '/poojitha.png',
    link: 'https://www.linkedin.com/in/devireddy-poojithareddy-6253a8277/',
  },
];

export default function mot() {
  const faculty = teamMembers[0];
  const others = teamMembers.slice(1);

  return (
    <div className={styles.teamContainer}>
      <h1 className={styles.titleMT}>Meet Our Team</h1>

      <div className={styles.facultyContainer}>
        <a href={faculty.link} target="_blank" rel="noopener noreferrer" className={styles.card}>
          <Image
            src={faculty.image}
            alt={faculty.name}
            width={150}
            height={150}
            className={styles.avatar}
          />
          <h3>{faculty.name}</h3>
          <p>{faculty.designation}</p>
        </a>
      </div>

      <div className={styles.membersGrid}>
        {others.map((member, index) => (
          <a
            key={index}
            href={member.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <Image
              src={member.image}
              alt={member.name}
              width={150}
              height={150}
              className={styles.avatar}
            />
            <h3>{member.name}</h3>
            <p>{member.designation}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
