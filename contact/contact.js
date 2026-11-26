// Contact form: topic chips swap the hint text; Send opens the visitor's mail app addressed to support.
// ponytail: mailto has no backend, so nothing is sent until the visitor hits Send in their mail app.
// Swap for a form endpoint (Formspree, a Supabase function) if you want messages delivered directly.
(() => {
  const hints = {
    feedback: 'What do you love, and what gets in the way?',
    feature: 'What were you trying to do, and what would have helped?',
    bug: 'What happened, and what did you tap just before?',
    account: 'Tell us what you need help with.',
    other: 'Tell us a little about yourself and what you have in mind.',
  };
  const form = document.getElementById('c-form');
  const message = document.getElementById('c-message');
  let topic = 'feedback';

  const pick = (t) => {
    if (!hints[t]) return;
    topic = t;
    document.querySelectorAll('[data-topic]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.topic === t)));
    document.querySelectorAll('[data-for]').forEach((el) => { el.hidden = el.dataset.for !== t; });
    message.placeholder = hints[t];
  };
  document.querySelectorAll('[data-topic]').forEach((b) => b.addEventListener('click', () => pick(b.dataset.topic)));
  pick(new URLSearchParams(location.search).get('topic') || 'feedback');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const label = document.querySelector(`[data-topic="${topic}"]`).textContent.trim();
    const f = new FormData(form);
    const lines = [f.get('message'), '', `From: ${f.get('name') || ''} <${f.get('email')}>`];
    if (topic === 'bug' && f.get('device')) lines.push(`Device: ${f.get('device')}`);
    location.href = `mailto:support@pawtio.app?subject=${encodeURIComponent(`Pawtio: ${label}`)}&body=${encodeURIComponent(lines.join('\n'))}`;
    document.getElementById('c-form-wrap').hidden = true;
    document.getElementById('c-sent').hidden = false;
  });
  document.getElementById('c-reset').addEventListener('click', () => {
    form.reset();
    pick(topic);
    document.getElementById('c-sent').hidden = true;
    document.getElementById('c-form-wrap').hidden = false;
  });
})();
