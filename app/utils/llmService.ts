/**
 * LLM service to interact with Marlin Oyster CVM's Llama model
 */

interface LlamaGenerateResponse {
  response: string;
  success: boolean;
  error?: string;
}

/**
 * Extract skills from a job description using Llama LLM
 * @param jobDescription - The job description text
 * @returns An object with the LLM response containing extracted skills
 */
export async function extractSkillsFromDescription(jobDescription: string): Promise<LlamaGenerateResponse> {
  try {
    const prompt = `Analyze the following job description and extract only the technical skills, technologies, frameworks, programming languages, and tools mentioned or required.

Your response should ONLY contain the extracted skills as a comma-separated list with no additional text, explanations, or formatting.

For example, a good response would be: "JavaScript, React, Node.js, TypeScript, Git, AWS"

Job Description:
${jobDescription}`;
    
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama3.2",
        prompt: prompt
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    let skillsText = data.response || data.generated_text || "";
      // Clean up the response to ensure it's just a comma-separated list
    // Remove any leading/trailing text that's not part of the skills list
    skillsText = skillsText.replace(/^.*?(?=[\w])/, ''); // Remove text before first word
    skillsText = skillsText.replace(/[.:](?:\s*$|\s*\n.*$)/, ''); // Remove trailing periods or any text after
    
    return {
      response: skillsText.trim(),
      success: true
    };
  } catch (error: any) {
    console.error("Error extracting skills:", error);
    return {
      response: "",
      success: false,
      error: error.message
    };
  }
}

/**
 * Generate a job description from a list of skills using Llama LLM
 * @param skills - Comma-separated list of skills
 * @param jobTitle - Optional job title to provide context
 * @returns An object with the LLM response containing generated job description
 */
export async function generateJobDescriptionFromSkills(skills: string, jobTitle?: string): Promise<LlamaGenerateResponse> {
  try {
    const titleContext = jobTitle ? `for a ${jobTitle} position` : "";
    
    const prompt = `Create a comprehensive job description ${titleContext} that requires the following skills and technologies: ${skills}

Your response should be a well-structured job description that includes:
- Key responsibilities
- Required qualifications
- Technical requirements
- What the candidate will work on

Make it professional and detailed, focusing on how these skills will be used in the role.

Skills: ${skills}`;
    
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama3.2",
        prompt: prompt
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const jobDescription = data.response || data.generated_text || "";
    
    return {
      response: jobDescription.trim(),
      success: true
    };
  } catch (error: any) {
    console.error("Error generating job description:", error);
    return {
      response: "",
      success: false,
      error: error.message
    };
  }
}

/**
 * Extract skills from a resume using Llama LLM
 * @param resume - The resume text content
 * @returns An object with the LLM response containing extracted skills
 */
export async function extractSkillsFromResume(resume: string): Promise<LlamaGenerateResponse> {
  try {
    const prompt = `Analyze the following resume and extract all relevant technical skills, programming languages, frameworks, libraries, tools, technologies, certifications, and professional competencies mentioned.

Your response should ONLY contain the extracted skills as a comma-separated list with no additional text, explanations, or formatting.

Include:
- Programming languages (e.g., JavaScript, Python, Java)
- Frameworks and libraries (e.g., React, Angular, Django)
- Tools and platforms (e.g., Git, Docker, AWS)
- Databases (e.g., MySQL, MongoDB, PostgreSQL)
- Methodologies (e.g., Agile, Scrum)
- Certifications and qualifications
- Soft skills if clearly mentioned

For example, a good response would be: "JavaScript, React, Node.js, Python, AWS, Git, MySQL, Agile, Project Management"

Resume:
${resume}`;
    
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama3.2",
        prompt: prompt
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    let skillsText = data.response || data.generated_text || "";
    
    // Clean up the response to ensure it's just a comma-separated list
    // Remove any leading/trailing text that's not part of the skills list
    skillsText = skillsText.replace(/^.*?(?=[\w])/, ''); // Remove text before first word
    skillsText = skillsText.replace(/[.:](?:\s*$|\s*\n.*$)/, ''); // Remove trailing periods or any text after
    
    return {
      response: skillsText.trim(),
      success: true
    };
  } catch (error: any) {
    console.error("Error extracting skills from resume:", error);
    return {
      response: "",
      success: false,
      error: error.message
    };
  }
}