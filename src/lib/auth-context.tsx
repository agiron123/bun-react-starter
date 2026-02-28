import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface AuthUser {
  id: number;
  email: string;
  createdAt: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (args: { email: string; password: string }) => Promise<void>;
  register: (args: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  resetPassword: (args: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AUTH_STORAGE_KEY = "auth.session";

interface StoredAuth {
  user: AuthUser;
  token: string;
}

function getStoredAuth(): StoredAuth | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as StoredAuth;
  } catch (error) {
    console.warn("Failed to parse stored auth session", error);
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredAuth();
    if (stored) {
      setUser(stored.user);
      setToken(stored.token);
    }
    setLoading(false);
  }, []);

  const persistAuth = useCallback((value: StoredAuth | null) => {
    if (typeof window === "undefined") {
      return;
    }

    if (!value) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(value));
  }, []);

  const login = useCallback(async ({ email, password }: { email: string; password: string }) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      let message = "Unable to log in.";
      try {
        const data = (await response.json()) as { message?: string };
        if (data?.message) {
          message = data.message;
        }
      } catch (error) {
        console.warn("Failed to parse login error response", error);
      }
      throw new Error(message);
    }

    const data = (await response.json()) as { token: string; user: AuthUser };

    setUser(data.user);
    setToken(data.token);
    persistAuth({ user: data.user, token: data.token });
  }, [persistAuth]);

  const register = useCallback(async ({ email, password }: { email: string; password: string }) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      let message = "Unable to create account.";
      try {
        const data = (await response.json()) as { message?: string };
        if (data?.message) {
          message = data.message;
        }
      } catch (error) {
        console.warn("Failed to parse register error response", error);
      }
      throw new Error(message);
    }

    const data = (await response.json()) as { token: string; user: AuthUser };

    setUser(data.user);
    setToken(data.token);
    persistAuth({ user: data.user, token: data.token });
  }, [persistAuth]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    persistAuth(null);
  }, [persistAuth]);

  const resetPassword = useCallback(
    async ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => {
      if (!token) {
        throw new Error("Not authenticated.");
      }

      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        let message = "Unable to reset password.";
        try {
          const data = (await response.json()) as { message?: string };
          if (data?.message) {
            message = data.message;
          }
        } catch (err) {
          console.warn("Failed to parse reset-password error response", err);
        }
        throw new Error(message);
      }
    },
    [token]
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      loading,
      login,
      register,
      logout,
      resetPassword,
    }),
    [loading, login, logout, register, resetPassword, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
