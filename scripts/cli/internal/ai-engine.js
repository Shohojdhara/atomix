/**
 * Atomix CLI - AI Engine
 * Handles integration with LLMs for component generation
 */

import chalk from 'chalk';
import { logger } from '../utils/logger.js';
import { configLoader } from './config-loader.js';

/**
 * AI Scaffolding Engine
 */
export class AIEngine {
  constructor() {
    this.config = configLoader.get('ai') || {};
  }

  /**
   * Generate component code based on prompt
   */
  async generateComponent(name, prompt) {
    const provider = this.config.provider || 'openai';
    const apiKey = this.config.apiKey || process.env.ATOMIX_AI_API_KEY;

    if (!apiKey) {
      throw new Error(`AI API Key missing. Please configure it in atomix.config.ts or set ATOMIX_AI_API_KEY environment variable.`);
    }

    logger.info(chalk.blue(`🤖 AI Engine: Generating component "${name}" using ${provider}...`));

    try {
      let response;
      if (provider === 'openai') {
        response = await this.callOpenAI(name, prompt, apiKey);
      } else if (provider === 'anthropic') {
        response = await this.callAnthropic(name, prompt, apiKey);
      } else {
        throw new Error(`Unsupported AI provider: ${provider}`);
      }

      return this.parseAIResponse(response);
    } catch (error) {
      logger.error(`AI Generation failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Call OpenAI API
   */
  async callOpenAI(name, prompt, apiKey) {
    const model = this.config.model || 'gpt-4';
    const systemPrompt = this.getSystemPrompt(name);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  /**
   * Call Anthropic API
   */
  async callAnthropic(name, prompt, apiKey) {
    const model = this.config.model || 'claude-3-sonnet-20240229';
    const systemPrompt = this.getSystemPrompt(name);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: model,
        max_tokens: 4000,
        system: systemPrompt,
        messages: [
          { role: 'user', content: prompt }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Anthropic API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.content[0].text;
  }

  /**
   * Get system prompt for the AI
   */
  getSystemPrompt(name) {
    return `You are an expert design system engineer specializing in the Atomix design system.
Your task is to generate a high-quality React component named "${name}" based on the user's prompt.

The component should follow these rules:
1. Use React and TypeScript.
2. Use Atomix utility classes (u-*) and component classes (c-*).
3. Follow the Atomix component structure (Props interface, functional component, exports).
4. Include JSDoc comments for all props.
5. Ensure the component is accessible (aria labels, roles).
6. Return only a JSON object with the following structure:
{
  "component": "Full component code as a string",
  "styles": "Any custom CSS/SCSS if needed (optional)",
  "tests": "Unit test code using Vitest and React Testing Library",
  "stories": "Storybook story file code",
  "readme": "Usage documentation in Markdown"
}
Ensure the output is a valid JSON object. Do not include any other text or explanation.`;
  }

  /**
   * Parse AI response to extract files
   */
  parseAIResponse(content) {
    try {
      // Try to find JSON in the response if the AI included other text
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return JSON.parse(content);
    } catch (error) {
      logger.error('Failed to parse AI response as JSON. Raw content:');
      console.log(content);
      throw new Error('AI returned invalid JSON format. See console for raw output.');
    }
  }
}

export const aiEngine = new AIEngine();
