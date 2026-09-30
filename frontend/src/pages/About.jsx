export default function About() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
      <h1 style={{ color: 'var(--text-h)', fontSize: '2.5rem', marginBottom: '20px' }}>About DSA Tracker</h1>
      <p style={{ color: 'var(--text)', fontSize: '1.2rem', lineHeight: '1.6' }}>
        DSA Tracker was created to help students, developers, and educators visualize exactly how algorithms work. 
        <br /><br />
        Unlike static code, this application provides an interactive, step-by-step walkthrough of fundamental 
        searching and sorting algorithms—displaying variables, arrays, highlighted code, and complexity statistics in real-time.
      </p>
    </div>
  );
}
