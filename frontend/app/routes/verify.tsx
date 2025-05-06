// Assuming this code is part of a larger application using a database or similar method for user profiles.  This example uses a hypothetical 'user' object and a 'set' method.
// Adapt as necessary for your specific implementation.

const user = {
  profileIsActive: false,
  profileActivationToken: 'someToken',
  // ... other user properties
};

const verifyEmail = async (token) => {
  // ... Logic to verify the email using the token ... 
  if ( /* email verification successful */ ) {
      await user.set({ profileActivationToken: null }); //Only removes the token
  } else {
      // Handle email verification failure
      console.error("Email verification failed.");
  }
};


//Example Usage
verifyEmail('someToken');