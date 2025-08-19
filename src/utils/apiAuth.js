// API Authentication utilities for email endpoints

// Create headers with API key
export const createAuthHeaders = () => {
  // Use NEXT_PUBLIC_ prefix to make it available in browser
  const apiKey = '<NEXT_PUBLIC_API_KEY>';

  if (!apiKey) {
    console.warn('No API key found for email endpoints');
  }

  return {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
  };
};

// Validate API key on server side
export const validateApiKey = (req) => {
  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.API_KEY; // Server-side only

  if (!validApiKey) {
    console.error('API_KEY not configured in environment');

    return false;
  }

  return apiKey === validApiKey;
};
