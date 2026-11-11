// EDIT HERE: all site content lives in this file.


export interface Component {
  name: string
  description: string
  responsibilities: string[]
  input: string
  output: string
}


export interface ProjectMedia {
  type: 'image' | 'video'
  src: string
  title: string
  alt?: string
}

export interface Project {
  // Keep all your existing properties
  id: string
  title: string
  category: string
  group: Group
  status: 'completed' | 'planned'
  summary: string
  problem: string
  solution: string
  flow: string[]
  features: string[]
  tech: string[]
  github?: string
  components?: Component[]
  media?: ProjectMedia[]
}



export type Group = 'Enterprise RPA' | 'Python & Data' | 'Generative AI'

export const profile = {
  name: 'Chika Okafor',
  title: 'RPA Developer | AI Automation Engineer | Intelligent Automation Specialist',
  email: 'okaforchika66@gmail.com',
  linkedin: 'https://www.linkedin.com/in/chika-ugonna-okafor/',
  github: 'https://github.com/chi-ka',
  resume: '/Chika Okafor - Resume.pdf', 
  photo: `${import.meta.env.BASE_URL}Profile_pic.jpg`
}

// Only verified values.
export const stats = [
  { label: 'Years in automation & software', value: 5, suffix: '+' },
  { label: 'Delivered projects', value: 4, suffix: '' },
  { label: 'Certifications & courses', value: 5, suffix: '' },
]

export const skillGroups = [
  { title: 'RPA & Intelligent Automation', icon: 'Bot', items: ['UiPath', 'Blue Prism', 'Power Automate', 'Workflow Automation', 'REFramework'] },
  { title: 'AI & Generative AI', icon: 'BrainCircuit', items: ['Python', 'LangChain', 'LangGraph', 'LLMs', 'Prompt Engineering', 'RAG', 'AI Agents', 'AI-powered classification'] },
  { title: 'Programming & Development', icon: 'Code2', items: ['Python', 'JavaScript', 'TypeScript', 'React', 'HTML', 'CSS', 'REST APIs'] },
  { title: 'Database & Integration', icon: 'Database', items: ['SQL Server', 'Oracle', 'PostgreSQL', 'Microsoft Graph API', 'Database Integration'] },
  { title: 'Development Tools', icon: 'Wrench', items: ['Git', 'GitHub', 'Azure DevOps', 'VS Code', 'UiPath Orchestrator'] },
]


export const projects: Project[] = [
  { id: 'email-classifier', 
    title: 'Intelligent Email Classification System', 
    category: 'AI Automation / Python / LLM', 
    group: 'Generative AI', 
    status: 'completed',
    summary: 'A Python console application that reads Outlook mail through Microsoft Graph API and classifies messages automatically.',
    problem: 'Shared mailboxes need manual reading and sorting, which is slow and inconsistent.',
    solution: 'Retrieves emails via Graph API, cleans the HTML, then classifies each message using rule-based logic with LLM classification for harder cases.',
    features: ['Microsoft Graph API integration', 'Automated Outlook email retrieval', 'HTML email content extraction and cleaning', 'Rule-based email classification', 'LLM-powered email classification', 'Structured logging', 'Python console application architecture'],
    tech: ['Python', 'Microsoft Graph API', 'MSAL', 'OpenAI API', 'BeautifulSoup'],
    flow: ['Outlook mailbox', 'Graph API + MSAL', 'HTML cleaning', 'Rules + LLM', 'Classified output'],
    github: 'https://github.com/your-username/email-classifier' },

    
  {
    id: 'chargeback',
    title: 'Mastercard International Chargeback Automation',
    category: 'Enterprise RPA / Financial Automation',
    group: 'Enterprise RPA',
    status: 'completed',
    summary:'An end-to-end RPA solution that automates Mastercard international transaction chargeback processing through three coordinated automation components.',
    problem:'Chargeback processing involved manual transaction retrieval, data validation, portal navigation, case creation and database updates.',
    solution:'A modular UiPath automation architecture consisting of a Dispatcher, Processor and Updater. Each component handles a distinct stage of the chargeback lifecycle, from transaction preparation to case creation and database synchronization.',
    features: [
      'Database transaction retrieval',
      'Data cleaning and validation',
      'Automated transaction filtering',
      'Mastercard Connect integration',
      'Automated chargeback case creation',
      'Processing status tracking',
      'Expected resolution date updates'
    ],
    tech: ['UiPath', 'Python', 'SQL Server'],
    flow: ['SQL Server', 'Dispatcher', 'Processor',  'Mastercard Connect', 'Updater', 'Database Update' ],
    components: [
      {
        name: 'Dispatcher',
        description:     'Responsible for extracting and preparing eligible transactions for chargeback processing.',
        responsibilities: [
          'Connects to the transaction database',
          'Retrieves relevant Mastercard transactions',
          'Cleans and validates transaction records',
          'Filters eligible transactions',
          'Prepares transactions for downstream processing',
          'Uploads them to a UiPath queue for the Processor component'
        ],
        input: 'Transaction records from SQL Server',
        output: 'Validated and filtered transactions ready for processing'
      },
      {
        name: 'Processor',
        description: 'Handles the actual chargeback case creation process through Mastercard Connect.',
        responsibilities: [
          'Receives prepared transaction records form the UiPath queue',
          'Automates interaction with Mastercard Connect',
          'Navigates the chargeback case creation process',
          'Submits eligible chargeback cases',
          'Captures case references and processing outcomes'
        ],
        input: 'Validated transactions from the Dispatcher',
        output: 'Created chargeback cases and processing results'
      },
      {
        name: 'Updater',
        description:'Synchronizes the results of chargeback processing with the transaction database.',
        responsibilities: [
          'Retrieves chargeback processing results',
          'Identifies corresponding transaction records',
          'Updates transaction processing status, declined, accepted, or pending',
          'Records chargeback case references',
          'Updates expected resolution dates'
        ],
        input: 'Chargeback case references and processing outcomes',
        output: 'Updated transaction records in SQL Server'
      }
    ],
    github: 'https://github.com/chi-ka/Mastercard-Chargeback-Automation',
    media: [
    {
      type: 'image',
      src:  `${import.meta.env.BASE_URL}media/mastercard-automation/MastercardIntPerformer.png`,
      title: 'Mastercard International Performer',
      alt: 'Mastercard International Performer'
    },
    {
      type: 'image',
      src: `${import.meta.env.BASE_URL}media/mastercard-automation/MastercardDispatcher.png`,
      title: 'Classification Results',
      alt: 'Classified email results'
    },
    {
      type: 'video',
      src: `${import.meta.env.BASE_URL}media/email-classifier/demo.mp4`,
      title: 'Live Automation Demo'
    }
  ]
  },


  { id: 'paydirect', title: 'PayDirect Settlement Automation', category: 'Enterprise RPA / Financial Automation', group: 'Enterprise RPA', status: 'completed',
    summary: 'Automates daily biller settlement and posting, with a front-end for authorized users to manage biller configuration.',
    problem: 'Daily settlement left manual processing gaps, and biller changes needed developer effort.',
    solution: 'A database-driven RPA process reads biller configuration that authorized users maintain through a React interface.',
    features: ['Automated settlement processing', 'Dynamic biller management', 'Database-driven configuration', 'Settlement and collection account management', 'Reduced manual processing gaps'],
    tech: ['UiPath', 'SQL Server', 'React', 'Python'],
    flow: ['React admin UI', 'SQL Server config', 'UiPath settlement bot', 'Posting', 'Daily report'] },


  { id: 'reconciliation', title: 'EPMA to PowerCard Transaction Reconciliation', category: 'Python Automation / Database Integration', group: 'Python & Data', status: 'completed',
    summary: 'Reconciles transactions between EPMA and PowerCard databases and validates refund statuses by RRN.',
    problem: 'Matching transactions across two different database systems was manual and error-prone.',
    solution: 'A console application queries both databases, matches records by RRN, retrieves the ARN, checks refund status and writes a CSV report.',
    features: ['SQL Server integration', 'Oracle database integration', 'Cross-database transaction matching', 'RRN-based transaction validation', 'ARN retrieval', 'Refund status verification', 'CSV report generation', 'Structured logging and error handling'],
    tech: ['Python', 'SQL Server', 'Oracle', 'pyodbc', 'CSV'],
    flow: ['EPMA (SQL Server)', 'Match by RRN', 'PowerCard (Oracle)', 'Refund check', 'CSV report'] },

  { id: 'rag', title: 'AI-Powered RAG Knowledge Assistant', category: 'Generative AI / RAG / LLM', group: 'Generative AI', status: 'planned',
    summary: 'Concept: an assistant that answers questions from uploaded documents using Retrieval-Augmented Generation.',
    problem: 'Teams lose time searching long documents for answers.',
    solution: 'Planned design: ingest and chunk documents, store embeddings, retrieve relevant context and generate grounded answers.',
    features: ['Document upload', 'Embedding and vector search', 'Context-aware answers', 'Source references'],
    tech: ['Python', 'LangChain', 'LangGraph', 'OpenAI', 'Vector Databases'],
    flow: ['Documents', 'Chunk + embed', 'Vector DB', 'Retrieve', 'LLM answer'] },

  { id: 'agent', title: 'AI Agent for Enterprise Process Automation', category: 'AI Agents / Intelligent Automation', group: 'Generative AI', status: 'planned',
    summary: 'Concept: an agent that understands business requests, picks tools and runs approved workflow tasks.',
    problem: 'Routine business requests still need people to route them to the right system.',
    solution: 'Planned design: an LLM agent that selects approved tools, calls enterprise APIs and databases, and asks for approval where needed.',
    features: ['Request understanding', 'Tool selection', 'Enterprise API interaction', 'Approval-gated execution'],
    tech: ['Python', 'LangGraph', 'LLMs', 'REST APIs', 'SQL'],
    flow: ['Business request', 'LLM planner', 'Tool selection', 'Approval', 'API / SQL action'] },
]

export const experience = {
  role: 'RPA Developer', company: 'Zenith Bank PLC', period: 'April 2021 – Present',
  points: ['Design and develop enterprise automation solutions.', 'Build and maintain UiPath workflows.', 'Develop Python-based automation utilities.', 'Integrate enterprise applications and databases.', 'Automate financial operations and reconciliation processes.', 'Troubleshoot and maintain production automations.', 'Collaborate with business stakeholders to identify automation opportunities.'],
}
export const certs = [
  { name: 'UiPath Advanced RPA Developer Certification', year: '2022' },
  { name: 'UiPath Foundation Training', year: '2022' },
  { name: 'IBM Python for Data Science, AI & Development', year: '2024' },
  { name: 'Google Crash Course on Python', year: '2021' },
  { name: 'Full Stack Web Development Bootcamp', year: '2025' },
]
export const education = { degree: 'Bachelor of Engineering, Chemical Engineering', school: 'University of Benin', honours: 'First Class Honours' }
