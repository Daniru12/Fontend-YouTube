import { useMemo, useState } from 'react';

import { sendWhatsAppMessage } from './services/ultramsg';

function App() {
  const instanceId = import.meta.env.VITE_ULTRAMSG_INSTANCE_ID ?? '';
  const token = import.meta.env.VITE_ULTRAMSG_TOKEN ?? '';

  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const hasCreds = useMemo(() => {
    return Boolean(instanceId.trim() && token.trim());
  }, [instanceId, token]);

  const canSend = useMemo(() => {
    return Boolean(to.trim() && message.trim());
  }, [to, message]);

  async function onSubmit(event) {
    event.preventDefault();
    setError('');
    setResult(null);

    if (!canSend) {
      setError('Please fill: To and Message.');
      return;
    }

    if (!hasCreds) {
      setError(
        'Missing UltraMsg credentials. Set VITE_ULTRAMSG_INSTANCE_ID and VITE_ULTRAMSG_TOKEN in .env (restart `npm run dev` after editing .env).'
      );
      return;
    }

    setIsSending(true);
    try {
      const response = await sendWhatsAppMessage({
        instanceId: instanceId.trim(),
        token: token.trim(),
        to: to.trim(),
        body: message,
      });
      setResult(response);
    } catch (err) {
      setError(err?.message || 'Failed to send message.');
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      <div className="background-glow"></div>
      <div className="container">
        <div className="glass-card">
          <h1>UltraMsg</h1>
          <p>WhatsApp Message Demo</p>

          <form className="form" onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="to">To (phone number)</label>
              <input
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="e.g. 94771234567"
                autoComplete="off"
              />
            </div>

            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                rows={4}
              />
            </div>

            <button type="submit" className="btn" disabled={!canSend || isSending}>
              {isSending ? 'Sending…' : 'Send WhatsApp Message'}
            </button>
          </form>

          {error ? <div className="status status-error">{error}</div> : null}
          {result ? (
            <pre className="status status-ok">{JSON.stringify(result, null, 2)}</pre>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
