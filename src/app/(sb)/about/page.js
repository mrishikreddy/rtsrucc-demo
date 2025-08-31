import styles from './about.module.css';

export default function AboutPage() {
  return (
    <div className={styles.aboutContainer}>
       <div className={styles.topDiv}></div>
      <h1 className={styles.title}>SR University Coding Club</h1>

      <section className={styles.section}>
        <h2>About</h2>
        <p>
          The SR University Coding Club is a dynamic platform aimed at empowering students with the skills and mindset needed to thrive in the modern technological world. With a team led by dedicated coordinators and passionate student leaders, the club conducts a range of initiatives and events to foster a love for coding across all disciplines.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Mission of the Club</h2>
        <p>
          The mission of the Coding Club is to foster a collaborative environment where students across all disciplines can develop their coding skills, gain hands-on experience in solving real-world problems, and explore the broader applications of programming. We aim to inspire, motivate, and challenge our members by offering a diverse range of activities that are geared towards both novice and advanced coders.
        </p>
        <p>
          Our goal is to ensure that every member, regardless of their background or experience level, has the opportunity to grow their technical skills, enhance their creativity, and cultivate a passion for programming. One of our key objectives is to nurture problem-solving abilities in young minds, particularly school students, through targeted activities and outreach.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Vision of the Club</h2>
        <p>
          Our vision is to create a vibrant and inclusive coding community within the university that promotes continuous learning and growth. We aspire to become a hub where students from all years and disciplines can come together to learn, share knowledge, and build innovative projects.
        </p>
        <p>
          Through our various initiatives, we hope to position the Coding Club as a leader in fostering technical excellence, innovation, and problem-solving. We envision close partnerships with first-year students and long-term support to help our members shine at both national and international levels.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Objectives of the Club</h2>
        <ul>
          <li><strong>Improve Problem-Solving Skills for Students:</strong> Organize workshops and bootcamps for school and college students to instill early problem-solving and programming skills.</li>
          <li><strong>Improve Ranking on Coding Platforms:</strong> Offer resources and sessions targeting beginners to advanced coders to improve rankings on platforms like LeetCode, Codeforces, and more.</li>
          <li><strong>Promote Participation in Competitions:</strong> Encourage participation in coding contests, hackathons, and organize in-campus competitive events regularly.</li>
          <li><strong>Explore Benefits of Multiple Platforms:</strong> Introduce various platforms and their strengths for interview prep, learning, and competitive coding.</li>
          <li><strong>First-Year Orientation:</strong> Welcome and mentor first-year students with interactive sessions to ignite their coding journey.</li>
          <li><strong>Community Building:</strong> Create a collaborative and friendly environment for students to learn, grow, and innovate together.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Events Conducted</h2>
        <div className={styles.programs}>
          <div><span>October 25, 2024:</span> Launch Code Contest</div>
          <div><span>January 29, 2025:</span> LinkedIn Makeover</div>
          <div><span>February 5, 2025:</span> Tech Placement Secrets</div>
          <div><span>March 1, 2025:</span> Mastering Competitive Programming</div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Meet Our Team</h2>
        <p>
          <strong>Dr. Pramod Kumar Poladi</strong> – Faculty Coordinator<br />
          <strong>Paruchuri Umesh Chandra</strong> – Chair<br />
          <strong>Narishetti Nagaraju</strong> – Vice-Chair<br />
          <strong>Ashmitha Reddy Rakki Reddy</strong> – Secretary<br />
          <strong>Male Rishik Reddy</strong> – Management Head<br />
          <strong>Alluri Harsha Sri</strong> – Operations Lead<br />
          <strong>Sameera Anjum</strong> – Treasurer<br />
          <strong>Chaithra Alluri</strong> – Marketing & PR Secretary<br />
          <strong>Godishala Kruthik Roshan</strong> – Membership Chair<br />
          <strong>Padala Krishna Chaithanya Goud</strong> – Content & Creative Head<br />
          <strong>Methuku Hindu Reddy</strong> – Digital & Social Media Head<br />
          <strong>Devi Reddy Poojitha Reddy</strong> – Web Master
        </p>
      </section>


      <section className={styles.section}>
        <h2>Conclusion</h2>
        <p>
          The Coding Club stands as a beacon for anyone who is passionate about programming, regardless of their experience level. Through structured activities aimed at skill enhancement, problem-solving, and community building, we strive to create an environment where every member can thrive.
        </p>
        <p>
          By nurturing talent, promoting healthy competition, and encouraging continuous learning, we aim to empower the next generation of innovators and leaders in the world of technology.
        </p>
      </section>
    </div>
  );
}
