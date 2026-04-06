import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { moderateContent, sendMessage } from '../services/llm';
import { supabase } from '../services/supabase';

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
    introduction: string;
    status: 'pending' | 'accepted' | 'rejected';
    messages: ChatMessage[];
}

const MyNetwork = () => {
    const { user } = useAuth();
    const { t, language } = useLanguage();

    const [stories, setStories] = useState<NetworkStory[]>([]);
    const [requests, setRequests] = useState<ContactRequest[]>([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterCareer, setFilterCareer] = useState('');

    const [isSharingModalOpen, setIsSharingModalOpen] = useState(false);
    const [activeStory, setActiveStory] = useState<NetworkStory | null>(null);
    const [isContactingModalOpen, setIsContactingModalOpen] = useState(false);
    const [contactIntroText, setContactIntroText] = useState('');

    // Inline chat state
    const [openChatId, setOpenChatId] = useState<string | null>(null);
    const [chatInput, setChatInput] = useState('');
    const [isTranslating, setIsTranslating] = useState<string | null>(null);
    const [translations, setTranslations] = useState<Record<string, string>>({});

    const [formState, setFormState] = useState({
        career: '', age: 20, gender: 'Male', traits: '', story: '', avatarBase64: ''
    });

    useEffect(() => {
        const fetchRemoteData = async () => {
            const { data: storiesData } = await supabase.from('network_stories').select('*').order('created_at', { ascending: false });
            if (storiesData) setStories(storiesData);

            const { data: reqData } = await supabase.from('network_requests').select('*');
            if (reqData) {
                // Filter out rejected requests so they don't show up again
                const activeRequests = reqData.filter((r: any) => r.status !== 'rejected');
                setRequests(activeRequests);
            }
        };
        fetchRemoteData();
    }, []);

    const deleteStory = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this story?')) {
            setStories(prev => prev.filter(s => s.id !== id));
            await supabase.from('network_stories').delete().eq('id', id);
            if (activeStory?.id === id) setActiveStory(null);
        }
    };

    const flagAccount = (email: string, name: string, reason: string, content: string) => {
        const flags = JSON.parse(localStorage.getItem('personai_flags') || '[]');
        const existing = flags.findIndex((f: any) => f.email === email);
        const newFlag = { email, name, reason, content, timestamp: Date.now() };
        if (existing >= 0) flags[existing] = newFlag; else flags.push(newFlag);
        localStorage.setItem('personai_flags', JSON.stringify(flags));
    };

    const filteredStories = stories.filter(s => {
        if (searchQuery && !s.authorName.toLowerCase().includes(searchQuery.toLowerCase()) && !s.story.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (filterCareer && !s.career.toLowerCase().includes(filterCareer.toLowerCase())) return false;
        return true;
    });

    const myIncomingRequests = requests.filter(r => user && r.toEmail === user.email);
    const myOutgoingRequests = requests.filter(r => user && r.fromEmail === user.email);

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

    const handleShareStory = async () => {
        const wordCount = formState.story.trim().split(/\s+/).filter(Boolean).length;
        if (wordCount > 500) return alert('Story maximum 500 words!');
        if (!user) return alert('Must be logged in.');

        // AI Moderation check
        const textToCheck = `${formState.career} ${formState.traits} ${formState.story}`;
        const modResult = await moderateContent(textToCheck);
        if (!modResult.safe) {
            flagAccount(user.email, user.name, modResult.reason || 'Inappropriate content detected', formState.story);
            alert(`❌ Content blocked: ${modResult.reason || 'Inappropriate content detected.'}\n\nYour account has been flagged for review.`);
            return;
        }

        const newStory: NetworkStory = {
            id: Date.now().toString(),
            authorEmail: user.email,
            authorName: user.name,
            career: formState.career,
            age: formState.age,
            gender: formState.gender,
            traits: formState.traits,
            story: formState.story,
            avatarBase64: formState.avatarBase64 || null
        };

        setStories(prev => [newStory, ...prev.filter(s => s.authorEmail !== user.email)]);
        
        await supabase.from('network_stories').delete().eq('authorEmail', user.email);
        await supabase.from('network_stories').insert([newStory]);
        setIsSharingModalOpen(false);
    };

    const sendContactRequest = async () => {
        if (!user || !activeStory) return;
        const wordCount = contactIntroText.trim().split(/\s+/).filter(Boolean).length;
        if (wordCount < 30) return alert('Please write at least 30 words about why you want to connect.');

        // AI Moderation
        const modResult = await moderateContent(contactIntroText);
        if (!modResult.safe) {
            flagAccount(user.email, user.name, modResult.reason || 'Offensive contact request', contactIntroText);
            alert(`❌ ${t.rejected}: ${modResult.reason || t.inappropriateContent}.`);
            return;
        }

        // Check if already sent a request to this person
        const alreadySent = requests.some(r => r.fromEmail === user.email && r.toEmail === activeStory.authorEmail);
        if (alreadySent) return alert('You already sent a request to this person.');

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
        setRequests(prev => [...prev, req]);
        await supabase.from('network_requests').insert([req]);
        
        setIsContactingModalOpen(false);
        setActiveStory(null);
        setContactIntroText('');
        alert('Contact request sent!');
    };

    const acceptRequest = async (reqId: string) => {
        setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'accepted' as const } : r));
        await supabase.from('network_requests').update({ status: 'accepted' }).eq('id', reqId);
    };

    const rejectRequest = async (reqId: string) => {
        setRequests(prev => prev.filter(r => r.id !== reqId)); // Hide immediately
        await supabase.from('network_requests').update({ status: 'rejected' }).eq('id', reqId);
    };

    const sendChatMessage = async (reqId: string) => {
        if (!chatInput.trim() || !user) return;

        // AI Moderation
        const modResult = await moderateContent(chatInput);
        if (!modResult.safe) {
            flagAccount(user.email, user.name, modResult.reason || 'Inappropriate chat message', chatInput);
            alert(`❌ ${t.rejected}: ${modResult.reason || t.inappropriateContent}.`);
            return;
        }

        const newMessage = { senderEmail: user.email, text: chatInput, timestamp: Date.now() };
        
        setRequests(prev => prev.map(r => {
            if (r.id === reqId) return { ...r, messages: [...r.messages, newMessage] };
            return r;
        }));

        const targetReq = requests.find(r => r.id === reqId);
        if (targetReq) {
            await supabase.from('network_requests').update({ 
                messages: [...targetReq.messages, newMessage] 
            }).eq('id', reqId);
        }

        setChatInput('');
    };

    const getActiveChat = (id: string) => requests.find(r => r.id === id);

    const translateStory = async (storyId: string, content: string) => {
        setIsTranslating(storyId);
        try {
            const prompt = `Translate the following professional story into the language with code "${language}". 
            Original text: "${content}"
            Respond ONLY with the translated text, no other commentary.`;
            const result = await sendMessage([{ role: 'user', content: prompt }]);
            setTranslations(prev => ({ ...prev, [storyId]: result }));
        } catch (err) {
            console.error("Translation failed:", err);
            alert(t.translationFailed);
        }
        setIsTranslating(null);
    };

    // === STYLES ===
    const cardStyle: React.CSSProperties = {
        background: 'rgba(25,25,25,0.8)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '18px',
        marginBottom: '12px',
    };

    const chatBubble = (isMe: boolean): React.CSSProperties => ({
        alignSelf: isMe ? 'flex-end' : 'flex-start',
        background: isMe ? '#40e0d0' : 'rgba(60,60,60,0.9)',
        color: isMe ? '#000' : '#fff',
        padding: '8px 14px',
        borderRadius: isMe ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
        maxWidth: '75%',
        fontSize: '0.9rem',
        lineHeight: '1.4',
        wordBreak: 'break-word',
    });

    return (
        <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '40px', background: 'transparent', color: '#fff', display: 'flex', flexDirection: 'column', gap: '30px' }}>

            {/* TOP BAR */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <h1 style={{ fontSize: '2rem', color: '#40e0d0', margin: 0, fontWeight: '800', textTransform: 'uppercase' }}>
                    {t.buildNetwork}
                </h1>
                <div style={{ display: 'flex', gap: '12px', flex: 1, justifyContent: 'center' }}>
                    <input
                        type="text" placeholder={`🔍 ${t.searchPlaceholder}`}
                        value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                        style={{ padding: '10px 20px', borderRadius: '50px', border: '1px solid rgba(64,224,208,0.3)', background: 'rgba(255,255,255,0.05)', color: '#fff', width: '220px', outline: 'none' }}
                    />
                    <input
                        type="text" placeholder={`${t.careerField}...`}
                        value={filterCareer} onChange={e => setFilterCareer(e.target.value)}
                        style={{ padding: '10px 20px', borderRadius: '50px', border: '1px solid rgba(64,224,208,0.3)', background: 'rgba(255,255,255,0.05)', color: '#fff', width: '180px', outline: 'none' }}
                    />
                </div>
                <button
                    onClick={() => { if (!user) return alert("Sign in required."); setIsSharingModalOpen(true); }}
                    style={{ background: 'linear-gradient(135deg,#40e0d0,#2a9d8f)', color: '#1a1a1a', padding: '12px 24px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                    + {t.shareStory}
                </button>
            </div>

            {/* STORIES GRID */}
            {filteredStories.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '60px 0', fontSize: '1.1rem' }}>
                    {t.noStories}
                </div>
            ) : (
                <div className="network-stories-grid">
                    {filteredStories.map(story => (
                        <div
                            key={story.id}
                            onClick={() => setActiveStory(story)}
                            style={{
                                aspectRatio: '1/1', background: 'rgba(30,30,30,0.6)', borderRadius: '20px',
                                border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                gap: '10px', transition: 'all 0.2s', overflow: 'hidden', position: 'relative'
                            }}
                            onMouseOver={e => { e.currentTarget.style.borderColor = '#40e0d0'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'none'; }}
                        >
                            {user && user.email === story.authorEmail && (
                                <button
                                    onClick={(e) => deleteStory(e, story.id)}
                                    style={{
                                        position: 'absolute', top: '10px', right: '10px',
                                        background: 'rgba(255,100,100,0.1)', border: '1px solid rgba(255,100,100,0.3)', color: '#ff6b6b',
                                        borderRadius: '50%', width: '32px', height: '32px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer', zIndex: 10, fontSize: '0.9rem'
                                    }}
                                    title="Delete Story"
                                >
                                    🗑️
                                </button>
                            )}
                            <div style={{
                                width: '72px', height: '72px', borderRadius: '50%', border: '2px solid #40e0d0', flexShrink: 0,
                                background: story.avatarBase64 ? `url(${story.avatarBase64}) center/cover` : (story.gender === 'Female' ? 'linear-gradient(135deg,#a78bfa,#c084fc)' : 'linear-gradient(135deg,#60a5fa,#3b82f6)')
                            }}>
                                {!story.avatarBase64 && (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>
                                        {story.gender === 'Female' ? '👩' : '👨'}
                                    </div>
                                )}
                            </div>
                            <div style={{ textAlign: 'center', padding: '0 12px' }}>
                                <div style={{ justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#40e0d0', margin: 0 }}>{story.authorName}</div>
                                        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>{story.career}</div>
                                    </div>
                                    <button 
                                        onClick={() => translateStory(story.id, story.story)}
                                        disabled={isTranslating === story.id}
                                        style={{ background: 'rgba(64, 224, 208, 0.1)', border: '1px solid #40e0d0', color: '#40e0d0', padding: '4px 10px', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer' }}
                                    >
                                        {isTranslating === story.id ? '⌛...' : `🌐 ${t.translate}`}
                                    </button>
                                </div>
                                <p style={{ 
                                    fontSize: '1rem', lineHeight: '1.6', color: '#eee', 
                                    marginBottom: '20px', fontStyle: 'italic',
                                    maxHeight: '120px', overflow: 'hidden', textOverflow: 'ellipsis'
                                }}>
                                    "{translations[story.id] || story.story}"
                                </p>
                                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginTop: '4px' }}>{story.age} · {story.gender}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* CONTACT REQUESTS SECTION */}
            {user && (
                <div className="network-requests-grid" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px' }}>

                    {/* INCOMING */}
                    <div>
                        <h2 style={{ fontSize: '1.3rem', color: '#40e0d0', marginBottom: '16px', fontWeight: '700' }}>📥 {t.incomingRequests}</h2>
                        {myIncomingRequests.length === 0 ? (
                            <div style={{ ...cardStyle, textAlign: 'center', color: 'rgba(255,255,255,0.35)', padding: '30px' }}>No requests yet.</div>
                        ) : (
                            myIncomingRequests.map(r => (
                                <div key={r.id} style={cardStyle}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: '700', fontSize: '1.05rem' }}>{r.fromName}</div>
                                            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', marginTop: '4px', lineHeight: '1.4' }}>{r.introduction}</div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
                                            {r.status === 'pending' && (
                                                <>
                                                    <button onClick={() => acceptRequest(r.id)} style={{ background: '#40e0d0', border: 'none', padding: '6px 14px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>{t.accepted}</button>
                                                    <button onClick={() => rejectRequest(r.id)} style={{ background: 'rgba(255,100,100,0.15)', border: '1px solid rgba(255,100,100,0.3)', color: '#ff6b6b', padding: '6px 14px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.85rem' }}>{t.rejected}</button>
                                                </>
                                            )}
                                            {r.status === 'rejected' && (
                                                <span style={{ color: '#ff6b6b', fontSize: '0.8rem' }}>{t.rejected}</span>
                                            )}
                                            {r.status === 'accepted' && (
                                                <button onClick={() => setOpenChatId(openChatId === r.id ? null : r.id)} style={{ background: '#2a9d8f', border: 'none', padding: '6px 14px', borderRadius: '20px', cursor: 'pointer', color: '#fff', fontWeight: 'bold', fontSize: '0.85rem' }}>
                                                    {openChatId === r.id ? t.closeChat : t.openChat}
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Inline Chat Popup */}
                                    {openChatId === r.id && r.status === 'accepted' && (() => {
                                        const chat = getActiveChat(r.id);
                                        return (
                                            <div style={{ marginTop: '14px', background: 'rgba(0,0,0,0.3)', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(64,224,208,0.15)' }}>
                                                <div style={{ padding: '10px 14px', background: 'rgba(64,224,208,0.08)', fontSize: '0.8rem', color: '#40e0d0', fontWeight: '600' }}>
                                                    {t.chatWith} {r.fromName}
                                                </div>
                                                <div style={{ height: '200px', overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    {(!chat || chat.messages.length === 0) && (
                                                        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', margin: 'auto' }}>{t.sayHi}</div>
                                                    )}
                                                    {chat?.messages.map((m, i) => (
                                                        <div key={i} style={chatBubble(m.senderEmail === user.email)}>{m.text}</div>
                                                    ))}
                                                </div>
                                                <div style={{ display: 'flex', gap: '8px', padding: '10px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                                                    <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendChatMessage(r.id)} placeholder={t.typeMessage} style={{ flex: 1, padding: '8px 14px', borderRadius: '30px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none', fontSize: '0.9rem' }} />
                                                    <button onClick={() => sendChatMessage(r.id)} style={{ background: '#40e0d0', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', color: '#000', fontWeight: '700', flexShrink: 0 }}>➤</button>
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>
                            ))
                        )}
                    </div>

                    {/* OUTGOING */}
                    <div>
                        <h2 style={{ fontSize: '1.3rem', color: '#40e0d0', marginBottom: '16px', fontWeight: '700' }}>📤 {t.outgoingRequests}</h2>
                        {myOutgoingRequests.length === 0 ? (
                            <div style={{ ...cardStyle, textAlign: 'center', color: 'rgba(255,255,255,0.35)', padding: '30px' }}>{t.noRequestsYet}</div>
                        ) : (
                            myOutgoingRequests.map(r => (
                                <div key={r.id} style={cardStyle}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: '700', fontSize: '1.05rem' }}>To: {r.toName}</div>
                                            <div style={{ color: r.status === 'accepted' ? '#40e0d0' : r.status === 'rejected' ? '#ff6b6b' : 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                {r.status === 'pending' ? `⏳ ${t.waiting}` : r.status === 'accepted' ? `✅ ${t.accepted}` : `❌ ${t.rejected}`}
                                            </div>
                                        </div>
                                        {r.status === 'accepted' && (
                                            <button onClick={() => setOpenChatId(openChatId === r.id ? null : r.id)} style={{ background: '#2a9d8f', border: 'none', padding: '6px 14px', borderRadius: '20px', cursor: 'pointer', color: '#fff', fontWeight: 'bold', fontSize: '0.85rem', flexShrink: 0 }}>
                                                {openChatId === r.id ? t.closeChat : t.openChat}
                                            </button>
                                        )}
                                    </div>

                                    {/* Inline Chat Popup */}
                                    {openChatId === r.id && r.status === 'accepted' && (() => {
                                        const chat = getActiveChat(r.id);
                                        return (
                                            <div style={{ marginTop: '14px', background: 'rgba(0,0,0,0.3)', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(64,224,208,0.15)' }}>
                                                <div style={{ padding: '10px 14px', background: 'rgba(64,224,208,0.08)', fontSize: '0.8rem', color: '#40e0d0', fontWeight: '600' }}>
                                                    {t.chatWith} {r.toName}
                                                </div>
                                                <div style={{ height: '200px', overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    {(!chat || chat.messages.length === 0) && (
                                                        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', margin: 'auto' }}>{t.sayHi}</div>
                                                    )}
                                                    {chat?.messages.map((m, i) => (
                                                        <div key={i} style={chatBubble(m.senderEmail === user.email)}>{m.text}</div>
                                                    ))}
                                                </div>
                                                <div style={{ display: 'flex', gap: '8px', padding: '10px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                                                    <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendChatMessage(r.id)} placeholder={t.typeMessage} style={{ flex: 1, padding: '8px 14px', borderRadius: '30px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none', fontSize: '0.9rem' }} />
                                                    <button onClick={() => sendChatMessage(r.id)} style={{ background: '#40e0d0', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', color: '#000', fontWeight: '700', flexShrink: 0 }}>➤</button>
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}


            {/* ===== MODALS ===== */}

            {/* SHARE STORY MODAL */}
            {isSharingModalOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
                    <div style={{ background: '#1c1c1c', padding: '40px', borderRadius: '24px', width: '580px', maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h2 style={{ color: '#40e0d0', margin: 0, fontWeight: '800' }}>{t.shareStory}</h2>
                        <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>{t.profilePicture}</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} style={{ color: '#fff' }} />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input type="text" placeholder={`${t.careerField} *`} value={formState.career} onChange={e => setFormState({ ...formState, career: e.target.value })} style={{ flex: 1, padding: '10px 15px', borderRadius: '12px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }} />
                            <input type="number" placeholder={t.age} value={formState.age} onChange={e => setFormState({ ...formState, age: Number(e.target.value) })} style={{ width: '80px', padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }} />
                            <select value={formState.gender} onChange={e => setFormState({ ...formState, gender: e.target.value })} style={{ padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }}>
                                <option value="Male">{t.male}</option><option value="Female">{t.female}</option><option value="Other">{t.other}</option>
                            </select>
                        </div>
                        <input type="text" placeholder={t.traitsPlaceholder} value={formState.traits} onChange={e => setFormState({ ...formState, traits: e.target.value })} style={{ padding: '10px 15px', borderRadius: '12px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }} />
                        <div>
                            <textarea placeholder={t.storyPlaceholder} value={formState.story} onChange={e => setFormState({ ...formState, story: e.target.value })} rows={7} style={{ width: '100%', padding: '12px 15px', borderRadius: '12px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', resize: 'vertical', outline: 'none', fontFamily: 'Outfit, sans-serif' }} />
                            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', textAlign: 'right' }}>
                                {formState.story.trim().split(/\s+/).filter(Boolean).length} / 500 words
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button onClick={() => setIsSharingModalOpen(false)} style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 22px', borderRadius: '20px', cursor: 'pointer' }}>Cancel</button>
                            <button onClick={handleShareStory} style={{ background: '#40e0d0', color: '#000', border: 'none', padding: '10px 22px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>{t.publish}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* FULL STORY VIEW */}
            {activeStory && !isContactingModalOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
                    <div style={{ background: '#1c1c1c', padding: '50px', borderRadius: '24px', width: '760px', maxWidth: '100%', maxHeight: '85vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <div style={{
                                width: '110px', height: '110px', borderRadius: '50%', border: '3px solid #40e0d0', flexShrink: 0,
                                background: activeStory.avatarBase64 ? `url(${activeStory.avatarBase64}) center/cover` : (activeStory.gender === 'Female' ? 'linear-gradient(135deg,#a78bfa,#c084fc)' : 'linear-gradient(135deg,#60a5fa,#3b82f6)'),
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem'
                            }}>
                                {!activeStory.avatarBase64 && (activeStory.gender === 'Female' ? '👩' : '👨')}
                            </div>
                            <div>
                                <h1 style={{ margin: 0, color: '#40e0d0', fontWeight: '800' }}>{activeStory.authorName}</h1>
                                <p style={{ margin: '5px 0 0', fontSize: '1.1rem', color: '#ccc' }}>{activeStory.career}</p>
                                <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>{activeStory.age} · {activeStory.gender}</p>
                                {activeStory.traits && <p style={{ margin: '6px 0 0', color: '#88d8c0', fontStyle: 'italic', fontSize: '0.9rem' }}>{activeStory.traits}</p>}
                            </div>
                        </div>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', lineHeight: '1.8', color: '#e8e8e8', whiteSpace: 'pre-wrap' }}>
                            {activeStory.story}
                        </div>
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                            <button onClick={() => setActiveStory(null)} style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 24px', borderRadius: '50px', cursor: 'pointer' }}>Close</button>
                            {user && user.email !== activeStory.authorEmail && (
                                <button onClick={() => setIsContactingModalOpen(true)} style={{ background: 'linear-gradient(135deg,#40e0d0,#2a9d8f)', color: '#1a1a1a', border: 'none', padding: '12px 24px', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' }}>
                                    {t.connect} 🤝
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* CONTACT REQUEST WRITE MODAL */}
            {isContactingModalOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
                    <div style={{ background: '#1c1c1c', padding: '40px', borderRadius: '24px', width: '560px', maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <h2 style={{ color: '#40e0d0', margin: 0, fontWeight: '800' }}>{t.connect}</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: '0.9rem' }}>
                            Write a short introduction to <strong style={{ color: '#fff' }}>{activeStory?.authorName}</strong>. Why do you want to connect? (Min. 50 words)
                        </p>
                        <textarea value={contactIntroText} onChange={e => setContactIntroText(e.target.value)} rows={8} style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', resize: 'vertical', fontFamily: 'Outfit, sans-serif', outline: 'none', fontSize: '0.95rem' }} placeholder={t.introConnectPlaceholder} />
                        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', textAlign: 'right', marginTop: '-8px' }}>
                            {contactIntroText.trim().split(/\s+/).filter(Boolean).length} words
                        </div>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button onClick={() => setIsContactingModalOpen(false)} style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 22px', borderRadius: '20px', cursor: 'pointer' }}>{t.cancel}</button>
                            <button onClick={sendContactRequest} style={{ background: '#40e0d0', color: '#000', border: 'none', padding: '10px 22px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>{t.send}</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MyNetwork;
