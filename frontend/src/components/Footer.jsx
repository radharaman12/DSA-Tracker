import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} DSA Tracker. All rights reserved.</p>
        <p className="footer-subtext">Built to make algorithms visual and interactive.</p>
      </div>
    </footer>
  );
}
