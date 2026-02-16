// Auth Service - Handles authentication with backend verification
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Mock database of users (for demo purposes)
const mockUsers = [
  { username: 'demo', email: 'demo@example.com', password: 'password123' },
  { username: 'test', email: 'test@example.com', password: 'test123' },
  { username: 'user', email: 'user@example.com', password: 'user123' }
];

export const authService = {
  // Login - Verify user exists in database
  login: async (credentials) => {
    try {
      const { username, email, password } = credentials;

      // Validate inputs
      if (!username || !email || !password) {
        throw new Error('All fields are required');
      }

      // Try backend first
      try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
          const data = await response.json();
          return {
            success: true,
            user: data.user,
            token: data.token
          };
        } else if (response.status === 401) {
          throw new Error('Invalid username or email');
        }
      } catch (backendError) {
        // Fallback to mock verification if backend not available
        console.warn('Backend unavailable, using mock verification:', backendError.message);
      }

      // Mock verification (for demo)
      const user = mockUsers.find(u => 
        u.username === username && u.email === email && u.password === password
      );

      if (!user) {
        throw new Error('Invalid credentials. User not found in database.');
      }

      // Create user profile
      const userProfile = {
        id: Math.random().toString(36).substr(2, 9),
        username: user.username,
        email: user.email,
        name: user.username.charAt(0).toUpperCase() + user.username.slice(1),
        bio: "Dream enthusiast and night explorer",
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=random&color=fff`,
        joinedDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        createdAt: new Date().toISOString(),
        isVerified: true
      };

      return {
        success: true,
        user: userProfile,
        token: 'mock-token-' + Math.random().toString(36).substr(2)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Login failed. Please try again.'
      };
    }
  },

  // Register - Create new user
  register: async (credentials) => {
    try {
      const { username, email, password, confirmPassword } = credentials;

      // Validation
      if (!username || !email || !password || !confirmPassword) {
        throw new Error('All fields are required');
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Check if user already exists
      const existingUser = mockUsers.find(u => u.username === username || u.email === email);
      if (existingUser) {
        throw new Error('Username or email already exists');
      }

      // Try backend first
      try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
          const data = await response.json();
          return {
            success: true,
            user: data.user
          };
        }
      } catch (backendError) {
        console.warn('Backend unavailable, using mock registration');
      }

      // Mock registration
      const newUser = { username, email, password };
      mockUsers.push(newUser);

      const userProfile = {
        id: Math.random().toString(36).substr(2, 9),
        username,
        email,
        name: username.charAt(0).toUpperCase() + username.slice(1),
        bio: "Dream enthusiast",
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random&color=fff`,
        joinedDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        createdAt: new Date().toISOString(),
        isVerified: true
      };

      return {
        success: true,
        user: userProfile
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Registration failed. Please try again.'
      };
    }
  },

  // Get user profile
  getUserProfile: (userId) => {
    try {
      const stored = localStorage.getItem('userProfile');
      if (stored) {
        return JSON.parse(stored);
      }
      return null;
    } catch (error) {
      console.error('Error retrieving profile:', error);
      return null;
    }
  },

  // Update user profile
  updateProfile: async (userId, updates) => {
    try {
      const profile = localStorage.getItem('userProfile');
      if (!profile) {
        throw new Error('Profile not found');
      }

      const currentProfile = JSON.parse(profile);
      const updatedProfile = {
        ...currentProfile,
        ...updates,
        updatedAt: new Date().toISOString()
      };

      // Try backend first
      try {
        const response = await fetch(`${API_BASE_URL}/auth/profile/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify(updatedProfile)
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('userProfile', JSON.stringify(data.user));
          return { success: true, user: data.user };
        }
      } catch (backendError) {
        console.warn('Backend unavailable, using mock update');
      }

      // Mock update
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      return { success: true, user: updatedProfile };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to update profile'
      };
    }
  },

  // Logout
  logout: () => {
    try {
      localStorage.removeItem('userProfile');
      localStorage.removeItem('authToken');
      localStorage.removeItem('isAuthenticated');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem('isAuthenticated') === 'true' && 
           localStorage.getItem('userProfile') !== null;
  },

  // Verify token (mock implementation)
  verifyToken: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      return { success: false };
    }
  }
};
