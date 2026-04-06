import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export interface NetworkStory {
    id: string;
    authorEmail: string;
    authorName: string;
    career: string;
    age: number;
    gender: string;
    traits: string;
    story: string;
    avatarBase64: string | null;
}

export interface ChatMessage {
    senderEmail: string;
    text: string;
    timestamp: number;
}

export interface ContactRequest {
    id: string;
    fromEmail: string;
    fromName: string;
    toEmail: string;
    toName: string;
    introduction: string; // Min 70 words
    status: 'pending' | 'accepted' | 'rejected';
    messages: ChatMessage[];
}

const MyNetwork = () => {
    const { user } = useAuth();
    
    const [stories, setStories] = useState<NetworkStory[]>([]);
    const [requests, setRequests] = useState<ContactRequest[]>([]);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCareer, setFilterCareer] = useState('');
    
    // Modals
    const [isSharingModalOpen, setIsSharingModalOpen] = useState(false);
    const [activeStory, setActiveStory] = useState<NetworkStory | null>(null);
    const [isContactingModalOpen, setIsContactingModalOpen] = useState(false);
    const [contactIntroText, setContactIntroText] = useState('');
    
    // Chat UI
    const [activeChatRequest, setActiveChatRequest] = useState<ContactRequest | null>(null);
    const [chatInput, setChatInput] = useState('');

    // Load Data
    useEffect(() => {
        const storedStories = localStorage.getItem('network_stories');
        if (storedStories) setStories(JSON.parse(storedStories));
        
        const storedRequests = localStorage.getItem('network_requests');
        if (storedRequests) setRequests(JSON.parse(storedRequests));
    }, []);

    // Save Data Helpers
    const saveStories = (newStories: NetworkStory[]) => {
        setStories(newStories);
        localStorage.setItem('network_stories', JSON.stringify(newStories));
    };

    const saveRequests = (newRequests: ContactRequest[]) => {
        setRequests(newRequests);
        localStorage.setItem('network_requests', JSON.stringify(newRequests));
    };

    // Derived Data
    const filteredStories = stories.filter(s => {
        if (searchQuery && !s.authorName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (filterCareer && !s.career.toLowerCase().includes(filterCareer.toLowerCase())) return false;
        return true;
    });

    const myIncomingRequests = requests.filter(r => user && r.toEmail === user.email);
    const myOutgoingRequests = requests.filter(r => user && r.fromEmail === user.email);

    // Form State
    const [formState, setFormState] = useState({
        career: '', age: 20, gender: 'Male', traits: '', story: '', avatarBase64: ''
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormState(prev => ({ ...prev, avatarBase64: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleShareStory = () => {
        const wordCount = formState.story.trim().split(/\s+/).length;
        if (wordCount > 500) return alert('Story max 500 words limit exceeded!');
        if (!user) return alert('Must be logged in.');

        const newStory: NetworkStory = {
            id: Date.now().toString(),
            authorEmail: user.email,
            authorName: user.name,
            ...formState
        };

        const existingFilter = stories.filter(s => s.authorEmail !== user.email);
        saveStories([newStory, ...existingFilter]); // Replace or add
        setIsSharingModalOpen(false);
    };

    const sendContactRequest = () => {
        if (!user || !activeStory) return;
        const wordCount = contactIntroText.trim().split(/\s+/).filter(Boolean).length;
        if (wordCount < 50) return alert('Please write at least 50-70 words specifying why you want to connect.');

        const req: ContactRequest = {
            id: Date.now().toString(),
            fromEmail: user.email,
            fromName: user.name,
            toEmail: activeStory.authorEmail,
            toName: activeStory.authorName,
            introduction: contactIntroText,
            status: 'pending',
            messages: []
        };
        saveRequests([...requests, req]);
        setIsContactingModalOpen(false);
        setActiveStory(null);
        setContactIntroText('');
        alert('Contact Request Sent!');
    };

    const acceptRequest = (reqId: string) => {
        const updated = requests.map(r => r.id === reqId ? { ...r, status: 'accepted' as const } : r);
        saveRequests(updated);
    };

    const sendChatMessage = (reqId: string) => {
        if (!chatInput.trim() || !user) return;
        const updated = requests.map(r => {
            if (r.id === reqId) {
                return {
                    ...r,
                    messages: [...r.messages, { senderEmail: user.email, text: chatInput, timestamp: Date.now() }]
                };
            }
            return r;
        });
        saveRequests(updated);
        setChatInput('');
        if (activeChatRequest) setActiveChatRequest(updated.find(r => r.id === reqId) || null);
    };

    return (
        <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '40px', background: 'transparent', color: '#fff', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* TOP BAR */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <h1 style={{ fontSize: '2rem', color: '#40e0d0', margin: 0, textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
                    Build Network
                </h1>
                
                <div style={{ display: 'flex', gap: '15px', flex: 1, justifyContent: 'center' }}>
                    <input 
                        type="text" placeholder="Search by name..." 
                        value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                        style={{ padding: '10px 20px', borderRadius: '50px', border: '1px solid rgba(64,224,208,0.3)', background: 'rgba(255,255,255,0.05)', color: '#fff', width: '250px' }}
                    />
                    <input 
                        type="text" placeholder="Filter by Career..." 
                        value={filterCareer} onChange={e => setFilterCareer(e.target.value)}
                        style={{ padding: '10px 20px', borderRadius: '50px', border: '1px solid rgba(64,224,208,0.3)', background: 'rgba(255,255,255,0.05)', color: '#fff', width: '200px' }}
                    />
                </div>

                <button 
                    onClick={() => {
                        if (!user) return alert("Sign in required.");
                        setIsSharingModalOpen(true);
                    }}
                    style={{ background: 'linear-gradient(135deg, #40e0d0, #2a9d8f)', color: '#1a1a1a', padding: '12px 24px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                >
                    + Share Your Story
                </button>
            </div>

            {/* FEED GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px', flex: 1, alignContent: 'start' }}>
                {filteredStories.map(story => (
                    <div 
                        key={story.id} 
                        onClick={() => setActiveStory(story)}
                        style={{
                            aspectRatio: '1/1', background: 'rgba(30,30,30,0.6)', borderRadius: '24px', padding: '20px',
                            border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'all 0.2s ease', position: 'relative', overflow: 'hidden'
                        }}
                        onMouseOver={e => e.currentTarget.style.borderColor = '#40e0d0'}
                        onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                    >
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: story.avatarBase64 ? `url(${story.avatarBase64}) center/cover` : '#444', border: '2px solid #40e0d0' }} />
                        <h3 style={{ margin: 0, fontSize: '1.2rem', textAlign: 'center' }}>{story.authorName}</h3>
                        <p style={{ margin: 0, color: '#40e0d0', fontSize: '0.9rem', textAlign: 'center' }}>{story.career}</p>
                    </div>
                ))}
            </div>

            {/* CONTACT REQUESTS SECTION */}
            {user && (
                <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#40e0d0', marginBottom: '15px' }}>Contact Requests & Messages</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        
                        <div style={{ background: 'rgba(20,20,20,0.5)', padding: '20px', borderRadius: '16px' }}>
                            <h4>Incoming Requests</h4>
                            {myIncomingRequests.map(r => (
                                <div key={r.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', marginBottom: '10px' }}>
                                    <strong>From: {r.fromName}</strong>
                                    <p style={{ fontSize: '0.85rem', color: '#ccc', margin: '5px 0' }}>{r.introduction}</p>
                                    {r.status === 'pending' ? (
                                        <button onClick={() => acceptRequest(r.id)} style={{ background: '#40e0d0', border: 'none', padding: '5px 15px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>Accept</button>
                                    ) : (
                                        <button onClick={() => setActiveChatRequest(r)} style={{ background: '#2a9d8f', border: 'none', padding: '5px 15px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', color: '#fff' }}>Open Chat</button>
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        <div style={{ background: 'rgba(20,20,20,0.5)', padding: '20px', borderRadius: '16px' }}>
                            <h4>Outgoing Requests</h4>
                            {myOutgoingRequests.map(r => (
                                <div key={r.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', marginBottom: '10px' }}>
                                    <strong>To: {r.toName}</strong>
                                    <span style={{ marginLeft: '10px', fontSize: '0.8rem', color: r.status === 'accepted' ? '#40e0d0' : '#888' }}>[{r.status.toUpperCase()}]</span>
                                    {r.status === 'accepted' && (
                                        <button onClick={() => setActiveChatRequest(r)} style={{ background: '#2a9d8f', border: 'none', padding: '5px 15px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', color: '#fff', marginLeft: '10px' }}>Open Chat</button>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            )}


            {/* ================= MODALS ================= */}

            {/* SHARE STORY MODAL */}
            {isSharingModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
                    <div style={{ background: '#1e1e1e', padding: '40px', borderRadius: '24px', width: '600px', maxWidth: '90%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <h2 style={{ color: '#40e0d0', margin: 0 }}>Share Your Story</h2>
                        
                        <label>Profile Picture</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input type="text" placeholder="Career / Title" value={formState.career} onChange={e => setFormState({...formState, career: e.target.value})} style={{ flex: 1, padding: '10px', borderRadius: '12px', background: '#333', border: 'none', color: '#fff' }}/>
                            <input type="number" placeholder="Age" value={formState.age} onChange={e => setFormState({...formState, age: Number(e.target.value)})} style={{ width: '80px', padding: '10px', borderRadius: '12px', background: '#333', border: 'none', color: '#fff' }}/>
                            <select value={formState.gender} onChange={e => setFormState({...formState, gender: e.target.value})} style={{ width: '120px', padding: '10px', borderRadius: '12px', background: '#333', border: 'none', color: '#fff' }}>
                                <option>Male</option><option>Female</option><option>Other</option>
                            </select>
                        </div>

                        <input type="text" placeholder="Personal Traits (e.g. Creative, Analytical)" value={formState.traits} onChange={e => setFormState({...formState, traits: e.target.value})} style={{ padding: '10px', borderRadius: '12px', background: '#333', border: 'none', color: '#fff' }}/>
                        
                        <textarea placeholder="Tell your story (Max 500 words)..." value={formState.story} onChange={e => setFormState({...formState, story: e.target.value})} rows={6} style={{ padding: '10px', borderRadius: '12px', background: '#333', border: 'none', color: '#fff', resize: 'vertical' }} />

                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                            <button onClick={() => setIsSharingModalOpen(false)} style={{ background: 'transparent', color: '#fff', border: '1px solid #555', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }}>Cancel</button>
                            <button onClick={handleShareStory} style={{ background: '#40e0d0', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>Publish</button>
                        </div>
                    </div>
                </div>
            )}

            {/* FULL STORY MODAL */}
            {activeStory && !isContactingModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
                    <div style={{ background: '#1e1e1e', padding: '50px', borderRadius: '24px', width: '800px', maxWidth: '90%', maxHeight: '80vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: activeStory.avatarBase64 ? `url(${activeStory.avatarBase64}) center/cover` : '#444', border: '3px solid #40e0d0' }} />
                            <div>
                                <h1 style={{ margin: 0, color: '#40e0d0' }}>{activeStory.authorName}</h1>
                                <p style={{ margin: '5px 0', fontSize: '1.2rem', color: '#ccc' }}>{activeStory.career}</p>
                                <p style={{ margin: 0, color: '#888' }}>{activeStory.age} · {activeStory.gender}</p>
                                <p style={{ margin: '5px 0', color: '#aaa', fontStyle: 'italic' }}>{activeStory.traits}</p>
                            </div>
                        </div>
                        <div style={{ borderTop: '1px solid #333', paddingTop: '20px', lineHeight: '1.8', fontSize: '1.05rem', color: '#eaeaea', whiteSpace: 'pre-wrap' }}>
                            {activeStory.story}
                        </div>
                        
                        <div style={{ display: 'flex', gap: '15px', marginTop: '20px', justifyContent: 'flex-end', borderTop: '1px solid #333', paddingTop: '20px' }}>
                            <button onClick={() => setActiveStory(null)} style={{ background: 'transparent', color: '#fff', border: '1px solid #555', padding: '12px 24px', borderRadius: '50px', cursor: 'pointer' }}>Close</button>
                            {user && user.email !== activeStory.authorEmail && (
                                <button onClick={() => setIsContactingModalOpen(true)} style={{ background: 'linear-gradient(135deg, #40e0d0, #2a9d8f)', color: '#1a1a1a', border: 'none', padding: '12px 24px', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' }}>
                                    Try to Contact
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* TRY TO CONTACT INPUT MODAL */}
            {isContactingModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
                    <div style={{ background: '#1e1e1e', padding: '40px', borderRadius: '24px', width: '600px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <h2 style={{ color: '#40e0d0', margin: 0 }}>Contact Request</h2>
                        <p style={{ color: '#aaa' }}>Write an introduction (Minimum 50 words) to {activeStory?.authorName}. Why do you want to connect?</p>
                        <textarea value={contactIntroText} onChange={e => setContactIntroText(e.target.value)} rows={8} style={{ padding: '15px', borderRadius: '12px', background: '#333', border: 'none', color: '#fff', resize: 'vertical' }} />
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                            <button onClick={() => setIsContactingModalOpen(false)} style={{ background: 'transparent', color: '#fff', border: '1px solid #555', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }}>Cancel</button>
                            <button onClick={sendContactRequest} style={{ background: '#40e0d0', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>Send Request</button>
                        </div>
                    </div>
                </div>
            )}

            {/* INSTAGRAM CHAT MODAL */}
            {activeChatRequest && user && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
                    <div style={{ background: '#1e1e1e', width: '500px', height: '600px', borderRadius: '24px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <div style={{ padding: '20px', background: '#252525', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333' }}>
                            <h3 style={{ margin: 0, color: '#40e0d0' }}>
                                Chat with {activeChatRequest.toEmail === user.email ? activeChatRequest.fromName : activeChatRequest.toName}
                            </h3>
                            <button onClick={() => setActiveChatRequest(null)} style={{ background: 'transparent', color: '#fff', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
                        </div>
                        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ padding: '12px', background: 'rgba(64,224,208,0.1)', borderRadius: '12px', alignSelf: 'center', fontSize: '0.85rem', color: '#40e0d0', maxWidth: '80%', textAlign: 'center' }}>
                                Request Introduction: "{activeChatRequest.introduction}"
                            </div>
                            {activeChatRequest.messages.map((m, i) => {
                                const isMe = m.senderEmail === user.email;
                                return (
                                    <div key={i} style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', background: isMe ? '#40e0d0' : '#333', color: isMe ? '#000' : '#fff', padding: '10px 15px', borderRadius: isMe ? '15px 15px 4px 15px' : '15px 15px 15px 4px', maxWidth: '75%' }}>
                                        {m.text}
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ padding: '15px', background: '#252525', display: 'flex', gap: '10px' }}>
                            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendChatMessage(activeChatRequest.id)} type="text" placeholder="Type a message..." style={{ flex: 1, padding: '12px', borderRadius: '50px', background: '#111', border: '1px solid #333', color: '#fff' }} />
                            <button onClick={() => sendChatMessage(activeChatRequest.id)} style={{ background: '#40e0d0', border: 'none', borderRadius: '50px', width: '45px', height: '45px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>➤</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MyNetwork;
