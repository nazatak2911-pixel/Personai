import { useState } from 'react';

const ADMIN_PASSWORD = 'PERSONAI_ADMIN_2024';

interface FlaggedAccount {
  email: string;
  name: string;
  reason: string;
  content: string;
  timestamp: number;
}

const loadFlags = (): FlaggedAccount[] => {
  const stored = localStorage.getItem('personai_flags');
  return stored ? JSON.parse(stored) : [];
};

const saveFlags = (flags: FlaggedAccount[]) => {
  localStorage.setItem('personai_flags', JSON.stringify(flags));
};

const loadBanned = (): string[] => {
  const stored = localStorage.getItem('personai_banned');
  return stored ? JSON.parse(stored) : [];
};

const saveBanned = (banned: string[]) => {
  localStorage.setItem('personai_banned', JSON.stringify(banned));
};

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [flags, setFlags] = useState<FlaggedAccount[]>(loadFlags);
  const [banned, setBanned] = useState<string[]>(loadBanned);

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setFlags(loadFlags());
      setBanned(loadBanned());
    } else {
      setAuthError('Incorrect password.');
    }
  };

  const dismissFlag = (email: string) => {
    const updated = flags.filter(f => f.email !== email);
    saveFlags(updated);
    setFlags(updated);
  };

  const banAccount = (email: string) => {
    // Ban the account in persona_accounts
    const accounts = JSON.parse(localStorage.getItem('persona_accounts') || '[]');
    const updated = accounts.map((a: any) => a.email === email ? { ...a, isBanned: true } : a);
    localStorage.setItem('persona_accounts', JSON.stringify(updated));

    // Add to banned list
    const newBanned = [...new Set([...banned, email])];
    saveBanned(newBanned);
    setBanned(newBanned);

    // Remove from flags
    dismissFlag(email);
  };

  const unban = (email: string) => {
    const accounts = JSON.parse(localStorage.getItem('persona_accounts') || '[]');
    const updated = accounts.map((a: any) => a.email === email ? { ...a, isBanned: false } : a);
    localStorage.setItem('persona_accounts', JSON.stringify(updated));

    const newBanned = banned.filter(b => b !== email);
    saveBanned(newBanned);
    setBanned(newBanned);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
        <div style={{ background: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,50,50,0.3)', borderRadius: '24px', padding: '50px 40px', width: '400px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ fontSize: '2.5rem' }}>🔒</div>
          <h1 style={{ color: '#ff6b6b', fontSize: '1.8rem', fontWeight: '800', textTransform: 'uppercase' }}>CoFounder Panel</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Restricted access — authorized personnel only.</p>
          <input
            type="password"
            value={passwordInput}
            onChange={e => setPasswordInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Enter admin password..."
            style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', outline: 'none', fontSize: '1rem', textAlign: 'center' }}
          />
          {authError && <p style={{ color: '#ff6b6b', fontSize: '0.9rem' }}>{authError}</p>}
          <button onClick={handleLogin} style={{ background: 'linear-gradient(135deg,#ff6b6b,#ee5a24)', border: 'none', color: '#fff', padding: '12px', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', fontSize: '1rem' }}>
            Access Panel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '40px', color: '#fff', background: 'transparent', display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid rgba(255,100,100,0.3)', paddingBottom: '20px' }}>
        <span style={{ fontSize: '2rem' }}>🛡️</span>
        <div>
          <h1 style={{ color: '#ff6b6b', fontSize: '2rem', fontWeight: '800', margin: 0 }}>CoFounder Admin Panel</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', margin: 0 }}>Moderation & Account Management</p>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {[
          { label: 'Flagged Accounts', value: flags.length, color: '#f59e0b', icon: '⚠️' },
          { label: 'Banned Accounts', value: banned.length, color: '#ff6b6b', icon: '🚫' },
          { label: 'Total Accounts', value: JSON.parse(localStorage.getItem('persona_accounts') || '[]').length, color: '#40e0d0', icon: '👤' },
        ].map((stat, i) => (
          <div key={i} style={{ background: 'rgba(25,25,25,0.8)', borderRadius: '16px', padding: '24px', border: `1px solid ${stat.color}33` }}>
            <div style={{ fontSize: '2rem' }}>{stat.icon}</div>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: stat.color, marginTop: '8px' }}>{stat.value}</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Flagged Accounts */}
      <div>
        <h2 style={{ fontSize: '1.4rem', color: '#f59e0b', marginBottom: '16px', fontWeight: '700' }}>⚠️ Flagged Accounts</h2>
        {flags.length === 0 ? (
          <div style={{ background: 'rgba(25,25,25,0.5)', borderRadius: '16px', padding: '30px', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
            No flagged accounts. All clear! ✅
          </div>
        ) : (
          flags.map((flag, i) => (
            <div key={i} style={{ background: 'rgba(25,25,25,0.7)', borderRadius: '16px', padding: '20px', marginBottom: '12px', border: '1px solid rgba(245,158,11,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', fontSize: '1.05rem' }}>{flag.name} <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: '400', fontSize: '0.9rem' }}>({flag.email})</span></div>
                  <div style={{ color: '#f59e0b', fontSize: '0.85rem', marginTop: '4px' }}>⚠️ {flag.reason}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '6px', fontStyle: 'italic', background: 'rgba(255,255,255,0.04)', padding: '8px 12px', borderRadius: '8px' }}>
                    "{flag.content.substring(0, 200)}{flag.content.length > 200 ? '...' : ''}"
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '6px' }}>
                    {new Date(flag.timestamp).toLocaleString()}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
                  <button onClick={() => dismissFlag(flag.email)} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '7px 16px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.85rem' }}>
                    Dismiss
                  </button>
                  <button onClick={() => banAccount(flag.email)} style={{ background: 'rgba(255,107,107,0.2)', border: '1px solid rgba(255,107,107,0.4)', color: '#ff6b6b', padding: '7px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem' }}>
                    🚫 Ban
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Banned Accounts */}
      <div>
        <h2 style={{ fontSize: '1.4rem', color: '#ff6b6b', marginBottom: '16px', fontWeight: '700' }}>🚫 Banned Accounts</h2>
        {banned.length === 0 ? (
          <div style={{ background: 'rgba(25,25,25,0.5)', borderRadius: '16px', padding: '30px', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
            No banned accounts.
          </div>
        ) : (
          banned.map((email, i) => {
            const account = JSON.parse(localStorage.getItem('persona_accounts') || '[]').find((a: any) => a.email === email);
            return (
              <div key={i} style={{ background: 'rgba(25,25,25,0.7)', borderRadius: '14px', padding: '16px 20px', marginBottom: '10px', border: '1px solid rgba(255,107,107,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '700' }}>{account?.name || 'Unknown'}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>{email}</div>
                </div>
                <button onClick={() => unban(email)} style={{ background: 'rgba(64,224,208,0.15)', border: '1px solid rgba(64,224,208,0.3)', color: '#40e0d0', padding: '7px 16px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.85rem' }}>
                  ✅ Unban
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
