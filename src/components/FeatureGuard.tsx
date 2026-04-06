import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Wrap public feature pages that require login or guest mode.
 * If neither isLoggedIn nor isGuest, redirects to /auth-selection.
 */
export default function FeatureGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isGuest } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !isGuest) {
      navigate('/auth-selection', { replace: true });
    }
  }, [isLoggedIn, isGuest, navigate]);

  if (!isLoggedIn && !isGuest) return null;

  return <>{children}</>;
}
