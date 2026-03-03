import { useRef, useState } from 'react'
import { PERSONAL_INFO } from '../../../lib/constants'
import { Container } from '../layout/Container'
import { Button } from '../elements/Button'

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async () => {
    setSending(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSending(false)
    setSent(true)
    setFormState({ name: '', email: '', message: '' })
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(0, 255, 255, 0.03)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    letterSpacing: '0.05em',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '120px 0',
      }}
    >
      <Container>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'start',
        }}
          className="contact-grid"
        >
          {/* Left */}
          <div>
            <div className="section-label">GET_IN_TOUCH // 04</div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '0.05em',
              color: 'var(--text-primary)',
              marginBottom: '24px',
            }}>
              LET'S BUILD
              <br />
              <span style={{ color: 'var(--cyan)', textShadow: '0 0 20px var(--cyan)' }}>
                SOMETHING
              </span>
            </h2>

            <p style={{
              fontFamily: 'var(--font-accent)',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '48px',
            }}>
              Have a project in mind? Looking for a creative developer 
              to bring your vision to life? Let's talk.
            </p>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { label: 'EMAIL', value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
                { label: 'GITHUB', value: 'github.com/katondev', href: PERSONAL_INFO.github },
                { label: 'LINKEDIN', value: 'linkedin.com/in/katondev', href: PERSONAL_INFO.linkedin },
              ].map(({ label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                    cursor: 'none',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget.querySelector('.link-val') as HTMLElement
                    if (el) el.style.color = 'var(--cyan)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget.querySelector('.link-val') as HTMLElement
                    if (el) el.style.color = 'var(--text-primary)'
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    color: 'var(--cyan)',
                    opacity: 0.6,
                    minWidth: '70px',
                  }}>
                    {label}
                  </span>
                  <span
                    className="link-val"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      color: 'var(--text-primary)',
                      transition: 'color 0.3s',
                    }}
                  >
                    {value}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="cyber-card corner-cut" style={{ padding: '36px' }}>
            {sent ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 0',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.3em',
                  color: 'var(--green)',
                  textShadow: '0 0 15px var(--green)',
                  marginBottom: '16px',
                }}>
                  MESSAGE_SENT ✓
                </div>
                <p style={{
                  fontFamily: 'var(--font-accent)',
                  color: 'var(--text-secondary)',
                }}>
                  Thanks for reaching out. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.25em',
                  color: 'var(--cyan)',
                  marginBottom: '8px',
                }}>
                  SEND_MESSAGE
                </div>

                <input
                  placeholder="YOUR_NAME"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--cyan)'
                    e.target.style.boxShadow = '0 0 10px var(--cyan-glow)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border)'
                    e.target.style.boxShadow = 'none'
                  }}
                />

                <input
                  type="email"
                  placeholder="YOUR_EMAIL"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--cyan)'
                    e.target.style.boxShadow = '0 0 10px var(--cyan-glow)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border)'
                    e.target.style.boxShadow = 'none'
                  }}
                />

                <textarea
                  rows={5}
                  placeholder="YOUR_MESSAGE"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--cyan)'
                    e.target.style.boxShadow = '0 0 10px var(--cyan-glow)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border)'
                    e.target.style.boxShadow = 'none'
                  }}
                />

                <Button
                  onClick={handleSubmit}
                  variant="primary"
                  disabled={sending}
                >
                  {sending ? 'TRANSMITTING...' : 'SEND_MESSAGE'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}
