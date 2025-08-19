# Decentralized Job Marketplace with AI-Powered Matching

A blockchain-based job marketplace that implements both traditional O(n²) matchin### Smart Contract

- The traditional matching algorithm is implemented in the `calculateMatches()` function in JobMarketplace.sol
- Match scores are calculated based on:
  - Skills matching (50% of total score)
  - Location matching (30% of score)
  - Salary matching (20% of score)

### Frontend

- The application uses Next.js App Router with React Server Components
- Ethereum connectivity is handled through ethers.js
- UI is styled with Tailwind CSS
- AI matching integrates with Marlin Oyster CVM for secure LLM computations

### AI Integration

- **API Route**: `/api/ai-candidates` - Handles AI-powered candidate matching
- **LLM Service**: `utils/llmService.ts` - Contains AI integration functions
- **Smart Parsing**: Automatically parses AI responses for structured match data
- **Detailed Evaluation**: Provides comprehensive candidate analysis on demandnd AI-powered matching using Llama 3.2 to connect job seekers with employers based on comprehensive analysis.

## Features

- Smart contract for job postings and candidate profiles
- **Traditional O(n²) matching algorithm** that evaluates each job against each candidate
- **NEW: AI-Powered Matching** using Llama 3.2 for intelligent candidate analysis
- Scoring based on skills (50%), location (30%), and salary (20%) for traditional matching
- AI provides detailed reasoning and comprehensive candidate evaluation
- Next.js TypeScript frontend with Tailwind CSS for a modern UI
- Ethereum wallet integration (MetaMask support)
- Marlin Oyster CVM integration for secure AI computations

## Project Structure

```
job-marketplace/
├── contracts/ - Solidity smart contracts
│   ├── contracts/JobMarketplace.sol - Main contract with O(n²) matching
│   ├── scripts/deploy.ts - Deployment script
│   └── ...
└── frontend/ - Next.js frontend
    ├── app/ - Next.js App Router
    │   ├── components/ - React components
    │   ├── utils/ - Utility functions
    │   ├── page.tsx - Homepage
    │   └── ... - Various page routes
    └── ... - Next.js config files
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MetaMask extension installed in your browser

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd AI-job-Matching-dApp/
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

5. On first use, you'll be asked to enter the contract address from the deployment step. Enter the address and connect your MetaMask.

## Using the Application

### As an Employer

1. Connect your Ethereum wallet
2. Navigate to "Post a Job"
3. Fill in the job details, including title, description, required skills, location, and salary
4. Submit the transaction through your wallet

### As a Job Seeker

1. Connect your Ethereum wallet
2. Navigate to "Register as Job Seeker"
3. Fill in your profile, including name, skills, location, and expected salary
4. Submit the transaction through your wallet

### Finding Matches

1. Navigate to "View Matches"
2. Choose between two matching approaches:
   - **Traditional O(n²) Algorithm**: Click "Run O(n²) Algorithm" for rule-based matching
   - **AI-Powered Matching**: Click "Run AI Matching" for intelligent analysis using Llama 3.2
3. The system will calculate matches using your chosen algorithm
4. View the matches with their scores and detailed reasoning (for AI matches)
5. Click "Detailed Analysis" on AI matches for comprehensive candidate evaluation

## Matching Algorithms

### Traditional O(n²) Algorithm
- Compares each job with each candidate systematically
- Calculates scores based on:
  - Skills matching (50% of total score) - exact string matching
  - Location matching (30% of score) - exact location match
  - Salary matching (20% of score) - salary range compatibility
- Fast and deterministic results
- Stored on-chain in smart contract

### AI-Powered Matching (NEW)
- Uses Llama 3.2 LLM running on Marlin Oyster CVM
- Intelligently analyzes job descriptions and candidate profiles
- Considers context, synonyms, and semantic relationships
- Provides detailed reasoning for each match
- Offers comprehensive candidate evaluations on demand
- Scores candidates holistically beyond simple rule matching

## Development

### Smart Contract

- The matching algorithm is implemented in the `calculateMatches()` function in JobMarketplace.sol
- Match scores are calculated based on:
  - Skills matching (50% of total score)
  - Location matching (30% of score)
  - Salary matching (20% of score)

### Frontend

- The application uses Next.js App Router with React Server Components
- Ethereum connectivity is handled through ethers.js
- UI is styled with Tailwind CSS

## LLM Integration and AI Matching

This project integrates with a Llama LLM deployed on Marlin Oyster CVM for both skill extraction and intelligent candidate matching.

### Setup

1. Copy `env.example` to `.env.local`
2. Replace the `NEXT_PUBLIC_LLAMA_INSTANCE_IP` value with your deployed Llama instance IP
3. Both skill extraction and AI matching features will be available

### Available AI Features

1. **Skill Extraction**: Automatically extract skills from job descriptions
2. **AI-Powered Matching**: Intelligent candidate-job matching with reasoning
3. **Detailed Candidate Evaluation**: Comprehensive analysis of candidate fit
4. **Oyster Integration**: Secure and verifiable AI computations

### Example API Calls

**Basic LLM Query:**
```bash
curl http://{{instance-ip}}:5000/api/generate -d '{
  "model": "llama3.2",
  "prompt":"What is Ethereum?"
}'
```

**AI Candidate Matching:**
```javascript
// Via frontend API
const result = await fetch('/api/ai-candidates', {
  method: 'POST',
  body: JSON.stringify({ jobs: jobsArray, candidates: candidatesArray })
});
```

