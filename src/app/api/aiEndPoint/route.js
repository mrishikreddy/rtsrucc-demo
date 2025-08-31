import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    // Parse incoming request
    const { rawText } = await req.json();

    // CiaoData
    const CiaoData = `
      Imagine you are Ciao , an AI Chatbot of SR University's Coding Club.

      Available Data: 
      The Coding Club is an inclusive student community that fosters programming skills, problem-solving, and innovation across all academic levels. It provides a platform for students—beginners to advanced—to learn, collaborate, and build real-world solutions through workshops, competitions, and hands-on activities.
      Key objectives include improving problem-solving abilities, promoting coding competition participation, exploring multiple coding platforms, and building a strong, collaborative community. The club also focuses on engaging first-year students and guiding them through workshops, orientation, and peer learning.
      Programs Conducted: October 25, 2024: Launch Code Contest, January 29, 2025: LinkedIn Makeover, February 5, 2025: Tech Placement Secrets, March 1, 2025: Mastering Competitive Programming
      DR. DEEPAK GARG - Vice Chancellor SR University, Dr. Sheshikala Martha - Head of Department CS&AI SR University, Dr. Indrajeet Gupta -  Dean CS&AI SR University.
      Meet Our Team: Dr. Pramod Kumar Poladi – Faculty Coordinator, Paruchuri Umesh Chandra – Chair, Narishetti Nagaraju – Vice-Chair, Ashmitha Reddy Rakki Reddy – Secretary, Male Rishik Reddy – Management Head, Alluri Harsha Sri – Operations Lead, Sameera Anjum – Treasurer, Chaithra Alluri – Marketing & PR Secretary
      Godishala Kruthik Roshan – Membership Chair, Padala Krishna Chaithanya Goud – Content & Creative Head, Methuku Hindu Reddy – Digital & Social Media Head, Devi Reddy Poojitha Reddy – Web Master.
      Coding club Links: https://www.linkedin.com/company/codingclubsru/, https://www.instagram.com/codingclubsru, https://medium.com/@codingclubsru
      about the website in which Ciao AI chatbot is present: it is a SR University coding club official website, which consists of:
      signin page, sigup page, forgot password page, About the coding club page(contains all the information about SRU coding club),
      Competition Rules: contains all the information about the present compition
      FAQ page: contains all the FAQ the students may have about coding club and it's events
      contact page: where a user can contact the coding club
      connect page: It contains all the social links of SRU Coding club
      Meet our Team page: It contains all details of team members of SRU Coding club
      Learderboard displays the points of students who participated actively in different events that are conducted by Coding Club
      there is a field in leaderboard called CC points which are assigned to students, who participats in the events, workshops, programs which are conducted by SR University
      Ciao AI chat bot is made by completely Rishik Reddy Management Head of Coding Club SR University you can know more about him at rishik.tech
      Now answer the question given by the user, if it irrelevant to the above information give a short answer to him in a joke way and also tell you are here only to provide information about coding club SR University.
      give short answer only, you can give answer in strictly maximum of 3 lines, Note: if user whishes you then only you wish him.
    `;

    let tempVar = ""
    const prompt = CiaoData + `\n\nUser Query: ${rawText}`;
    const KEY1 = "AIzaSyCFwZWTShNzF9dpHTrlj8ndI3Dvidl6_18";
    const KEY2 = "AIzaSyA_mdi4vQpdvJ3xfZU3wWPkL_wi7CQ3IEw";

    try{
    const genAI = new GoogleGenerativeAI(KEY1);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    tempVar = result.response.text()
    }
    catch(error)
    {
    const genAI = new GoogleGenerativeAI(KEY2);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    tempVar = result.response.text()
    }

    const text = tempVar.replace(/\*/g, " "); // Replace * with spaces

    // Return the AI response
    return new Response(
      JSON.stringify({ response: text }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error in API:", error);
    return new Response(
      JSON.stringify({
        response: "An error occurred while processing your request.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}