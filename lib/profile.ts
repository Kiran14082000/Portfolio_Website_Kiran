export const profile = {
  name: 'Kiran Gobi Manivannan',
  role: 'Data Science & AI / ML',
  location: 'Toronto, Ontario, Canada',
  email: 'kiranxgobi@gmail.com',
  phone: '437-838-5167',
  linkedin: 'https://www.linkedin.com/in/kirangobimanivannan/',
  github: 'https://github.com/Kiran14082000',
  resume: '/Kiran-Gobi-Manivannan-Resume.pdf',
  summary: 'Data science and machine learning professional with a Post Graduate Diploma in AI & Machine Learning and a B.E. in Computer Science. Hands-on experience with Python, SQL, scikit-learn, Power BI, data quality, workflow automation and LLM-based prototypes.',
  highlights: [
    { value: '20%', label: 'Less manual effort', detail: 'Through Python workflow automation' },
    { value: '85%', label: 'Classifier accuracy', detail: 'Resume–job fit model on a test set of 1,000+ pairs' },
    { value: '+9%', label: 'F1-score improvement', detail: 'Through feature tuning and text preprocessing' }
  ],
  skills: [
    { group: 'Programming & Data', items: ['Python','SQL','JavaScript','Workflow Automation','Exploratory Data Analysis','Data Cleaning','Data Preprocessing','Data Profiling','Data Validation'] },
    { group: 'Analytics & BI', items: ['Power BI','DAX','Tableau','SAS','Excel','Data Visualization','Operational Reporting'] },
    { group: 'Machine Learning & AI', items: ['Scikit-learn','Random Forest','SVM','Classification','Feature Engineering','Model Evaluation','NLP','TF-IDF','Sentiment Analysis','Computer Vision','Generative AI','LLM APIs','Open-Source LLMs','Multi-Agent Systems'] },
    { group: 'Engineering & Automation', items: ['REST APIs','API Integration','ETL Design','Docker','Git','Jupyter Notebook','VS Code'] },
    { group: 'Domain', items: ['AML & Financial Transaction Data','LCTR','EFT','STR','Quality Control','Case Management'] }
  ],
  experience: [
    { role: 'Data Operations Analyst', company: 'AML Shop', location: 'Toronto, ON', period: 'Jul 2026 – Present', bullets: ['Process and validate high-volume, confidential financial transaction data (LCTR, EFT, STR-related, source-of-funds, and payment records) in AML case-management systems.','Run quality-control checks to identify missing or inconsistent records and correct errors, keeping case data reliable for reporting.'] },
    { role: 'Artificial Intelligence & Machine Learning Intern', company: 'Ethosight AI', location: 'Toronto, ON', period: 'Jan 2025 – Aug 2025', bullets: ['Cleaned, validated, and preprocessed operational and AI decision datasets using Python, SQL, and Excel.','Profiled datasets and ran data-quality assessments to surface inconsistencies and improve insight reliability.','Applied machine learning and analytical techniques to evaluate algorithm transparency and decision-making behavior in AI systems.'] },
    { role: 'Programmer Analyst', company: 'Cognizant Technology Solutions', location: 'Chennai, India', period: 'Feb 2022 – Nov 2023', bullets: ['Built Python automation scripts for data-processing workflows, reducing manual effort by 20%.','Integrated REST APIs to automate data exchange between internal platforms and third-party systems.','Developed rapid AI prototypes using LLM APIs for document summarization and query automation.'] }
  ],
  education: [
    { degree: 'Post Graduate Diploma, Artificial Intelligence & Machine Learning', school: 'Lambton College', location: 'Toronto, ON', period: 'Jan 2024 – Aug 2025' },
    { degree: 'Bachelor of Engineering, Computer Science', school: 'St. Joseph’s College of Engineering', location: 'Chennai, India', period: 'Mar 2018 – May 2022' }
  ],
  projects: [
    { id: 'resume-suitability', title: 'Resume Suitability Prediction System', category: 'NLP & Machine Learning', date: 'Apr 2025', description: 'An NLP resume–job fit classifier that evaluates alignment between resumes and job descriptions.', details: 'Built and evaluated a text-classification pipeline using TF-IDF with Random Forest and SVM comparisons. The model reached 85% accuracy on a test set of 1,000+ resume–job-description pairs. Feature tuning and text preprocessing improved the F1-score by 9%.', tags: ['Python','scikit-learn','TF-IDF','Random Forest','SVM'], metric: '85% accuracy', github: '' },
    { id: 'object-detection-context', title: 'AI Object Detection & Contextual Query System', category: 'Computer Vision & Generative AI', date: 'Jul 2025', description: 'An object-detection and LLM reasoning pipeline connecting a user interface to an inference engine.', details: 'Designed the system architecture for image capture, object selection, contextual reasoning, and model inference. Structured API communication between the user interface and the inference engine.', tags: ['Computer Vision','API Integration','LLM','System Design'], metric: 'End-to-end AI pipeline', github: '' }
  ]
};

export const assistantKnowledge = `You are Kiran's portfolio assistant. Answer recruiters' questions using ONLY this verified profile information. Do not invent employers, dates, degrees, certifications, project links, metrics, or responsibilities. If a detail is not provided, say it is not listed and suggest contacting Kiran at ${profile.email}. Keep answers concise, professional, and in third person when appropriate.\n\nPROFILE: ${JSON.stringify(profile)}`;
