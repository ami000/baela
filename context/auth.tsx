
import React, { createContext, useContext, useState } from 'react';
import { useSegments, useRouter } from 'expo-router';
import { useEffect } from 'react';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const inAuthGroup = segments[0] === '(auth)';

        if (!isAuthenticated && !inAuthGroup) {
            router.replace('/(auth)/login');
        } else if (isAuthenticated && inAuthGroup) {
            router.replace('/(app)/dashboard');
        }
    }, [isAuthenticated, segments]);

    const signIn = () => setIsAuthenticated(true);
    const signOut = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);