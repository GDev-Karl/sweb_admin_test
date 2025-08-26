export type SignInPayload = {
  email: string;
  password: string;
};

export type SignInResponse = {
  token: string;
};

export const authService = {
  /**
   * Sign in user with email and password
   * @param payload - user credentials
   * @returns Promise with authentication token
   */
  async signIn(payload: SignInPayload): Promise<SignInResponse> {
    const response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Extract error message from API if available
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to sign in");
    }

    return response.json();
  },
};
