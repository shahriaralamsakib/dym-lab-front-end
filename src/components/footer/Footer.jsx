import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Lab Management System. All rights reserved.</p>
        <p>
          Made with ❤️ by <a href="#" target="_blank" rel="noreferrer">Md. Shahriar Alam Sakib</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
