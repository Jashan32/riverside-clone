import { GoogleOAuthProvider } from '@react-oauth/google';

export default function AuthProviders({ children }: { children: React.ReactNode }) {
  console.log("AuthProviders initialized with clientId:", import.meta.env.VITE_CLIENT_ID);
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID || ""}>
      {children}
    </GoogleOAuthProvider>
  );
}