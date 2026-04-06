import { useState, useRef } from 'react';
import { useAuth, CVData } from '../context/AuthContext';
import { enhanceCVWithAI } from '../services/llm';

const emptyCV: CVData = {
  photoBase64: '',
  fullName: '',
  title: '',
  email: '',
  phone: '',
  linkedin: '',
  summary: '',
  education: [{ school: '', degree: '', year: '' }],
  experience: [{ company: '', role: '', duration: '', description: '' }],
  skills: '',
  languages: '',
  aiEnhancement: '',
};

const MyCVDashboard = () => {
  const { user, saveCV } = useAuth();
  const [cv, setCv] = useState<CVData>(() => user?.cvData || emptyCV);
  const [aiRequest, setAiRequest] = useState('');
  const [aiPosition, setAiPosition] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const cvPreviewRef = useRef<HTMLDivElement>(null);

  const update = (field: keyof CVData, value: unknown) => setCv(prev => ({ ...prev, [field]: value }));

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => update('photoBase64', reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addEducation = () => update('education', [...cv.education, { school: '', degree: '', year: '' }]);
  const addExperience = () => update('experience', [...cv.experience, { company: '', role: '', duration: '', description: '' }]);

  const handleSave = () => {
    saveCV(cv);
    setSaveMsg('CV saved! ✅');
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const handleAIEnhance = async () => {
    if (!aiRequest.trim()) return;
    setAiLoading(true);
    try {
      const enhanced = await enhanceCVWithAI(cv.summary, aiRequest, aiPosition);
      setCv(prev => ({ ...prev, aiEnhancement: enhanced }));
    } catch { /* skip */ }
    setAiLoading(false);
  };

  const applyAIEnhancement = () => {
    if (!cv.aiEnhancement) return;
    setCv(prev => ({ ...prev, summary: prev.summary + '\n\n' + prev.aiEnhancement, aiEnhancement: '' }));
  };

  const handleDownloadPDF = () => {
    const content = cvPreviewRef.current;
    if (!content) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${cv.fullName || 'CV'} - CV</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Inter', sans-serif; color: #1a1a1a; background: #fff; padding: 40px; line-height: 1.6; }
          .header { display: flex; align-items: center; gap: 24px; border-bottom: 3px solid #40e0d0; padding-bottom: 24px; margin-bottom: 28px; }
          .photo { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid #40e0d0; }
          .photo-placeholder { width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg,#40e0d0,#2a9d8f); display:flex;align-items:center;justify-content:center;font-size:2.5rem;color:#fff; }
          h1 { font-size: 2rem; font-weight: 700; color: #1a1a1a; }
          .title { color: #40e0d0; font-size: 1.1rem; font-weight: 600; }
          .contacts { color: #555; font-size: 0.9rem; margin-top: 6px; }
          .section { margin-bottom: 24px; }
          .section-title { font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #40e0d0; border-bottom: 1px solid #e0e0e0; padding-bottom: 6px; margin-bottom: 14px; }
          .entry { margin-bottom: 14px; }
          .entry-head { display: flex; justify-content: space-between; font-weight: 600; }
          .entry-sub { color: #666; font-size: 0.9rem; }
          p { font-size: 0.95rem; color: #333; }
          .tags { display: flex; flex-wrap: wrap; gap: 8px; }
          .tag { background: #f0fdfa; color: #2a9d8f; border: 1px solid #40e0d0; padding: 3px 10px; border-radius: 20px; font-size: 0.85rem; }
        </style>
      </head>
      <body>
        <div class="header">
          ${cv.photoBase64 ? `<img class="photo" src="${cv.photoBase64}" />` : `<div class="photo-placeholder">👤</div>`}
          <div>
            <h1>${cv.fullName || 'Full Name'}</h1>
            <div class="title">${cv.title || 'Professional Title'}</div>
            <div class="contacts">${[cv.email, cv.phone, cv.linkedin].filter(Boolean).join(' · ')}</div>
          </div>
        </div>

        ${cv.summary || cv.aiEnhancement ? `
        <div class="section">
          <div class="section-title">Professional Summary</div>
          <p>${(cv.summary + (cv.aiEnhancement ? '\n\n' + cv.aiEnhancement : '')).replace(/\n/g, '<br>')}</p>
        </div>` : ''}

        ${cv.experience.some(e => e.company) ? `
        <div class="section">
          <div class="section-title">Work Experience</div>
          ${cv.experience.filter(e => e.company).map(e => `
            <div class="entry">
              <div class="entry-head"><span>${e.role}</span><span>${e.duration}</span></div>
              <div class="entry-sub">${e.company}</div>
              ${e.description ? `<p>${e.description}</p>` : ''}
            </div>
          `).join('')}
        </div>` : ''}

        ${cv.education.some(e => e.school) ? `
        <div class="section">
          <div class="section-title">Education</div>
          ${cv.education.filter(e => e.school).map(e => `
            <div class="entry">
              <div class="entry-head"><span>${e.school}</span><span>${e.year}</span></div>
              <div class="entry-sub">${e.degree}</div>
            </div>
          `).join('')}
        </div>` : ''}

        ${cv.skills ? `
        <div class="section">
          <div class="section-title">Skills</div>
          <div class="tags">${cv.skills.split(',').map(s => `<span class="tag">${s.trim()}</span>`).join('')}</div>
        </div>` : ''}

        ${cv.languages ? `
        <div class="section">
          <div class="section-title">Languages</div>
          <p>${cv.languages}</p>
        </div>` : ''}
      </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 500);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', borderRadius: '10px',
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
    color: '#fff', outline: 'none', fontSize: '0.9rem', fontFamily: 'Outfit, sans-serif'
  };
  const labelStyle: React.CSSProperties = { fontSize: '0.78rem', color: '#40e0d0', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '5px', display: 'block' };
  const sectionTitle: React.CSSProperties = { fontSize: '1rem', fontWeight: '700', color: '#40e0d0', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', borderBottom: '1px solid rgba(64,224,208,0.2)', paddingBottom: '8px' };

  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '40px', background: 'transparent', color: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#40e0d0', textTransform: 'uppercase', margin: 0 }}>My CV</h1>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {saveMsg && <span style={{ padding: '10px 18px', color: '#40e0d0', fontSize: '0.9rem', alignSelf: 'center' }}>{saveMsg}</span>}
          <button onClick={handleSave} style={{ background: 'rgba(64,224,208,0.15)', border: '1px solid #40e0d0', color: '#40e0d0', padding: '10px 22px', borderRadius: '50px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>
            💾 Save CV
          </button>
          <button onClick={handleDownloadPDF} style={{ background: 'linear-gradient(135deg,#40e0d0,#2a9d8f)', color: '#1a1a1a', border: 'none', padding: '10px 22px', borderRadius: '50px', cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem' }}>
            📄 Download PDF
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>

        {/* ===== LEFT: MANUAL CV BUILDER ===== */}
        <div style={{ background: 'rgba(25,25,25,0.7)', borderRadius: '24px', padding: '30px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={sectionTitle}>📋 Your CV</div>

          {/* Photo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #40e0d0', background: cv.photoBase64 ? `url(${cv.photoBase64}) center/cover` : 'rgba(64,224,208,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>
              {!cv.photoBase64 && '👤'}
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Profile Photo</label>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }} />
            </div>
          </div>

          {/* Basic Info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[['fullName', 'Full Name', 'John Doe'], ['title', 'Job Title', 'Software Engineer'], ['email', 'Email', 'john@email.com'], ['phone', 'Phone', '+1 234 567 8900'], ['linkedin', 'LinkedIn URL', 'linkedin.com/in/johndoe']].map(([field, label, ph]) => (
              <div key={field} style={{ gridColumn: field === 'linkedin' ? '1 / -1' : 'auto' }}>
                <label style={labelStyle}>{label}</label>
                <input value={(cv as any)[field]} onChange={e => update(field as keyof CVData, e.target.value)} placeholder={ph} style={inputStyle} />
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <label style={labelStyle}>Professional Summary</label>
            <textarea value={cv.summary} onChange={e => update('summary', e.target.value)} rows={4} placeholder="Write your professional summary..." style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          {/* Experience */}
          <div>
            <label style={sectionTitle}>Work Experience</label>
            {cv.experience.map((exp, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '14px', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <input value={exp.company} onChange={e => { const arr = [...cv.experience]; arr[i].company = e.target.value; update('experience', arr); }} placeholder="Company" style={inputStyle} />
                  <input value={exp.role} onChange={e => { const arr = [...cv.experience]; arr[i].role = e.target.value; update('experience', arr); }} placeholder="Role / Title" style={inputStyle} />
                  <input value={exp.duration} onChange={e => { const arr = [...cv.experience]; arr[i].duration = e.target.value; update('experience', arr); }} placeholder="Duration (e.g. 2022-2024)" style={inputStyle} />
                </div>
                <textarea value={exp.description} onChange={e => { const arr = [...cv.experience]; arr[i].description = e.target.value; update('experience', arr); }} placeholder="Description..." rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
            ))}
            <button onClick={addExperience} style={{ background: 'transparent', border: '1px dashed rgba(64,224,208,0.4)', color: '#40e0d0', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', width: '100%', fontSize: '0.85rem' }}>+ Add Experience</button>
          </div>

          {/* Education */}
          <div>
            <label style={sectionTitle}>Education</label>
            {cv.education.map((edu, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px', gap: '8px', marginBottom: '8px' }}>
                <input value={edu.school} onChange={e => { const arr = [...cv.education]; arr[i].school = e.target.value; update('education', arr); }} placeholder="School" style={inputStyle} />
                <input value={edu.degree} onChange={e => { const arr = [...cv.education]; arr[i].degree = e.target.value; update('education', arr); }} placeholder="Degree" style={inputStyle} />
                <input value={edu.year} onChange={e => { const arr = [...cv.education]; arr[i].year = e.target.value; update('education', arr); }} placeholder="Year" style={inputStyle} />
              </div>
            ))}
            <button onClick={addEducation} style={{ background: 'transparent', border: '1px dashed rgba(64,224,208,0.4)', color: '#40e0d0', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', width: '100%', fontSize: '0.85rem' }}>+ Add Education</button>
          </div>

          {/* Skills & Languages */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Skills (comma-separated)</label>
              <input value={cv.skills} onChange={e => update('skills', e.target.value)} placeholder="React, Python, Leadership..." style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Languages</label>
              <input value={cv.languages} onChange={e => update('languages', e.target.value)} placeholder="English (Native), Spanish (B2)..." style={inputStyle} />
            </div>
          </div>
        </div>

        {/* ===== RIGHT: AI ENHANCER ===== */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: 'rgba(25,25,25,0.7)', borderRadius: '24px', padding: '30px', border: '1px solid rgba(64,224,208,0.2)', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={sectionTitle}>🤖 AI CV Enhancer</div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: '1.6', marginTop: '-8px' }}>
              Tell the AI what you want to add or improve, and what position you're applying for. The AI will write a professional enhancement for your CV.
            </p>
            <div>
              <label style={labelStyle}>What to add / improve</label>
              <textarea value={aiRequest} onChange={e => setAiRequest(e.target.value)} rows={4} placeholder="e.g. 'I led a team of 5 developers on an e-commerce project and want to highlight leadership'"
                style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
            <div>
              <label style={labelStyle}>Target Position</label>
              <input value={aiPosition} onChange={e => setAiPosition(e.target.value)} placeholder="e.g. Senior Product Manager at Google" style={inputStyle} />
            </div>
            <button onClick={handleAIEnhance} disabled={aiLoading || !aiRequest.trim()} style={{
              background: aiLoading ? 'rgba(64,224,208,0.2)' : 'linear-gradient(135deg,#40e0d0,#2a9d8f)',
              color: aiLoading ? 'rgba(255,255,255,0.5)' : '#1a1a1a', border: 'none',
              padding: '12px', borderRadius: '12px', cursor: aiLoading ? 'not-allowed' : 'pointer',
              fontWeight: '700', fontSize: '1rem', transition: 'all 0.2s'
            }}>
              {aiLoading ? '✨ Enhancing...' : '✨ Enhance with AI'}
            </button>

            {cv.aiEnhancement && (
              <div style={{ background: 'rgba(64,224,208,0.06)', border: '1px solid rgba(64,224,208,0.2)', borderRadius: '14px', padding: '16px' }}>
                <div style={{ fontSize: '0.8rem', color: '#40e0d0', fontWeight: '700', marginBottom: '10px', textTransform: 'uppercase' }}>AI Suggestion:</div>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{cv.aiEnhancement}</p>
                <button onClick={applyAIEnhancement} style={{ marginTop: '12px', background: '#40e0d0', border: 'none', color: '#000', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem' }}>
                  ✅ Apply to CV
                </button>
              </div>
            )}
          </div>

          {/* Live Preview Hint */}
          <div style={{ background: 'rgba(25,25,25,0.5)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textAlign: 'center', lineHeight: '1.6' }}>
              💡 Click <strong style={{ color: '#40e0d0' }}>Download PDF</strong> at the top to generate a clean, professional PDF of your CV ready to share with employers.
            </div>
          </div>
        </div>

      </div>
      {/* Hidden ref for PDF */}
      <div ref={cvPreviewRef} style={{ display: 'none' }} />
    </div>
  );
};

export default MyCVDashboard;
