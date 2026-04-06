import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface InternshipListing {
    id: string;
    company: string;
    role: string;
    field: 'Tech' | 'Marketing' | 'Design' | 'Finance' | 'HR';
    location: string;
    workType: 'Remote' | 'Hybrid' | 'On-site';
    salaryRange: string;
    postedDay: string; // e.g., "2 days ago"
    tags: string[];
    logoColor: string;
}

interface ApplicationStatus {
    id: string;
    company: string;
    role: string;
    status: 'Pending' | 'Reviewing' | 'Interview' | 'Accepted' | 'Rejected';
    date: string;
}

const MOCK_INTERNSHIPS: InternshipListing[] = [
    { id: '1', company: 'Google', role: 'Software Engineer Intern', field: 'Tech', location: 'London/Remote', workType: 'Remote', salaryRange: '$5k - $7k', postedDay: '1 day ago', tags: ['Python', 'React', 'Cloud'], logoColor: '#4285F4' },
    { id: '2', company: 'Meta', role: 'Product Design Intern', field: 'Design', location: 'Menlo Park', workType: 'Hybrid', salaryRange: '$6k - $8k', postedDay: '3 days ago', tags: ['Figma', 'UI/UX', 'Mobile'], logoColor: '#0668E1' },
    { id: '3', company: 'Spotify', role: 'Data Science Intern', field: 'Tech', location: 'Stockholm/Hybrid', workType: 'Hybrid', salaryRange: '$4k - $6k', postedDay: '5 days ago', tags: ['SQL', 'Machine Learning'], logoColor: '#1DB954' },
    { id: '4', company: 'Netflix', role: 'Marketing Strategy Intern', field: 'Marketing', location: 'Los Angeles', workType: 'On-site', salaryRange: '$4k - $5k', postedDay: '2 days ago', tags: ['Strategy', 'Entertainment'], logoColor: '#E50914' },
    { id: '5', company: 'Stripe', role: 'Financial Analyst Intern', field: 'Finance', location: 'Dublin/Remote', workType: 'Remote', salaryRange: '$5k - $6k', postedDay: 'Today', tags: ['Analysis', 'Excel', 'Stripe'], logoColor: '#635BFF' },
    { id: '6', company: 'Amazon', role: 'Backend Developer Intern', field: 'Tech', location: 'Seattle', workType: 'On-site', salaryRange: '$5k - $7k', postedDay: '4 days ago', tags: ['Java', 'AWS', 'Scalability'], logoColor: '#FF9900' },
];

const MyInternships = () => {
    const { t } = useLanguage();

    const [listings] = useState<InternshipListing[]>(MOCK_INTERNSHIPS);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterField, setFilterField] = useState('All');
    const [filterWorkType, setFilterWorkType] = useState('All');
    const [sortBy, setSortBy] = useState('Newest');

    const [applications, setApplications] = useState<ApplicationStatus[]>(() => {
        const saved = localStorage.getItem('persona_internship_apps');
        return saved ? JSON.parse(saved) : [];
    });

    const [isAppModalOpen, setIsAppModalOpen] = useState(false);
    const [selectedInternship, setSelectedInternship] = useState<InternshipListing | null>(null);
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [appSuccess, setAppSuccess] = useState(false);

    useEffect(() => {
        localStorage.setItem('persona_internship_apps', JSON.stringify(applications));
    }, [applications]);

    const filteredListings = listings.filter(l => {
        const matchesSearch = l.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             l.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             l.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesField = filterField === 'All' || l.field === filterField;
        const matchesWorkType = filterWorkType === 'All' || l.workType === filterWorkType;
        return matchesSearch && matchesField && matchesWorkType;
    });

    const sortedListings = [...filteredListings].sort((a, b) => {
        if (sortBy === 'Newest') {
            if (a.postedDay.includes('Today') && !b.postedDay.includes('Today')) return -1;
            if (!a.postedDay.includes('Today') && b.postedDay.includes('Today')) return 1;
            return 0;
        }
        return 0;
    });

    const handleApply = (internship: InternshipListing) => {
        setSelectedInternship(internship);
        setIsAppModalOpen(true);
        setAppSuccess(false);
        setCvFile(null);
    };

    const submitApplication = () => {
        if (!cvFile || !selectedInternship) return alert('Please upload your CV before submitting!');

        const newApp: ApplicationStatus = {
            id: Date.now().toString(),
            company: selectedInternship.company,
            role: selectedInternship.role,
            status: 'Pending',
            date: new Date().toLocaleDateString(),
        };

        setApplications(prev => [newApp, ...prev]);
        setAppSuccess(true);
        setTimeout(() => {
            setIsAppModalOpen(false);
            setSelectedInternship(null);
        }, 2000);
    };

    // === STYLES ===
    const glassStyle: React.CSSProperties = {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
    };

    return (
        <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '40px', color: '#fff', position: 'relative' }}>
            <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.9rem', marginBottom: '10px', fontStyle: 'italic' }}>
                Note: These are not real postings; this is a demonstration of how the website will look and function.
            </p>
            <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#40e0d0', textTransform: 'uppercase', marginBottom: '30px' }}>
                {t.internshipOpportunities}
            </h1>

            {/* TOP BAR / SEARCH */}
            <div style={{ ...glassStyle, padding: '20px', display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap' }}>
                <input 
                    type="text" 
                    placeholder="Search by company, role or skills..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ flex: 1, minWidth: '300px', padding: '14px 20px', borderRadius: '50px', background: 'rgba(0,0,0,0.3)', border: '1px solid #40e0d0', color: '#fff', fontSize: '1rem', outline: 'none' }}
                />
                <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{ padding: '12px 20px', borderRadius: '50px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
                >
                    <option value="Newest">Sort: Newest First</option>
                    <option value="Salary">Sort: Salary Range</option>
                </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 3fr', gap: '40px', alignItems: 'start' }}>
                
                {/* FILTERS SIDEBAR */}
                <div style={{ ...glassStyle, padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#40e0d0', fontWeight: '700' }}>Filters</h3>
                    
                    <div>
                        <label style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '10px' }}>Career Field</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {['All', 'Tech', 'Marketing', 'Design', 'Finance'].map(f => (
                                <button key={f} 
                                    onClick={() => setFilterField(f)}
                                    style={{
                                        textAlign: 'left', padding: '8px 12px', borderRadius: '8px', 
                                        background: filterField === f ? '#40e0d0' : 'transparent',
                                        color: filterField === f ? '#000' : '#fff',
                                        border: 'none', cursor: 'pointer', transition: 'all 0.2s'
                                    }}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '10px' }}>Work Type</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {['All', 'Remote', 'Hybrid', 'On-site'].map(w => (
                                <button key={w} 
                                    onClick={() => setFilterWorkType(w)}
                                    style={{
                                        padding: '6px 12px', borderRadius: '50px', 
                                        background: filterWorkType === w ? 'rgba(64, 224, 208, 0.2)' : 'rgba(255,255,255,0.05)',
                                        color: filterWorkType === w ? '#40e0d0' : '#fff',
                                        border: `1px solid ${filterWorkType === w ? '#40e0d0' : 'rgba(255,255,255,0.1)'}`,
                                        cursor: 'pointer', fontSize: '0.85rem'
                                    }}
                                >
                                    {w}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* LISTINGS GRID */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px' }}>
                    {sortedListings.map(listing => (
                        <div key={listing.id} style={{ ...glassStyle, padding: '24px', transition: 'all 0.3s', cursor: 'default' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'items-start', marginBottom: '16px' }}>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: listing.logoColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                        {listing.company[0]}
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>{listing.role}</h4>
                                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>{listing.company} · {listing.location}</p>
                                    </div>
                                </div>
                                <span style={{ padding: '4px 10px', borderRadius: '6px', background: 'rgba(64, 224, 208, 0.1)', color: '#40e0d0', fontSize: '0.75rem', fontWeight: '700' }}>
                                    {listing.postedDay}
                                </span>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                                {listing.tags.map(tag => (
                                    <span key={tag} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '3px 10px', borderRadius: '20px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>{tag}</span>
                                ))}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                                <div style={{ fontWeight: '700', fontSize: '1.1rem', color: '#40e0d0' }}>{listing.salaryRange}</div>
                                <button 
                                    onClick={() => handleApply(listing)}
                                    style={{ background: 'linear-gradient(135deg,#40e0d0,#2a9d8f)', color: '#000', border: 'none', padding: '10px 24px', borderRadius: '50px', fontWeight: '700', cursor: 'pointer' }}
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* APPLICATION RESULTS PANEL (Bottom Right Sticky) */}
            <div style={{ 
                position: 'fixed', bottom: '30px', right: '30px', width: '320px', maxHeight: '400px', 
                ...glassStyle, padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)', border: '1px solid rgba(64, 224, 208, 0.3)',
                zIndex: 100
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h5 style={{ margin: 0, fontSize: '1rem', color: '#40e0d0', fontWeight: '700', textTransform: 'uppercase' }}>Application Results</h5>
                    <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '10px' }}>{applications.length}</span>
                </div>
                
                <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {applications.length === 0 ? (
                        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', padding: '20px 0' }}>No applications yet. Start your career today! 🚀</p>
                    ) : (
                        applications.map(app => (
                            <div key={app.id} style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '4px' }}>{app.company}</div>
                                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>{app.role}</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ 
                                        fontSize: '0.7rem', fontWeight: '700', border: '1px solid', 
                                        padding: '2px 8px', borderRadius: '50px',
                                        borderColor: app.status === 'Accepted' ? '#1DB954' : app.status === 'Rejected' ? '#E50914' : '#40e0d0',
                                        color: app.status === 'Accepted' ? '#1DB954' : app.status === 'Rejected' ? '#E50914' : '#40e0d0'
                                    }}>
                                        {app.status}
                                    </span>
                                    <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>{app.date}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* APPLICATION MODAL */}
            {isAppModalOpen && selectedInternship && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
                    <div style={{ ...glassStyle, background: '#1c1c1c', padding: '40px', width: '500px', maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'center' }}>
                        {appSuccess ? (
                            <div style={{ color: '#40e0d0' }}>
                                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
                                <h2 style={{ fontSize: '2rem' }}>Application Sent!</h2>
                                <p>Good luck at {selectedInternship.company}!</p>
                            </div>
                        ) : (
                            <>
                                <h2 style={{ color: '#40e0d0', margin: 0 }}>Apply to {selectedInternship.company}</h2>
                                <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0 }}>You are applying for the <strong style={{ color: '#fff' }}>{selectedInternship.role}</strong> position.</p>
                                
                                <div style={{ textAlign: 'left', marginTop: '20px' }}>
                                    <label style={{ fontSize: '0.85rem', color: '#40e0d0', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Upload CV (PDF/DOCX) *</label>
                                    <div style={{ padding: '30px', border: '2px dashed rgba(64, 224, 208, 0.4)', borderRadius: '16px', textAlign: 'center', cursor: 'pointer', background: 'rgba(255,255,255,0.03)' }}>
                                        <input 
                                            type="file" 
                                            accept=".pdf,.doc,.docx" 
                                            onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                                            style={{ display: 'none' }} 
                                            id="cv-upload"
                                        />
                                        <label htmlFor="cv-upload" style={{ cursor: 'pointer' }}>
                                            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📄</div>
                                            <div style={{ fontSize: '0.9rem', color: '#fff' }}>{cvFile ? cvFile.name : 'Click to browse or drag & drop'}</div>
                                            {!cvFile && <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>Max file size: 5MB</div>}
                                        </label>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                                    <button 
                                        onClick={() => setIsAppModalOpen(false)}
                                        style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '14px', borderRadius: '14px', cursor: 'pointer' }}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={submitApplication}
                                        disabled={!cvFile}
                                        style={{ flex: 1, background: cvFile ? 'linear-gradient(135deg,#40e0d0,#2a9d8f)' : '#555', color: cvFile ? '#000' : '#888', border: 'none', padding: '14px', borderRadius: '14px', fontWeight: '700', cursor: cvFile ? 'pointer' : 'not-allowed' }}
                                    >
                                        Submit Application
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyInternships;
