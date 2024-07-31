function Footer() {
    return <footer className="page-footer green lighten-4">
        <div className="footer-copyright">
            <div className="container">
                © {new Date().getFullYear()} {new Date().getUTCMonth()} Copyright Text
                <a className="grey-text text-lighten-4 right" href="/">React Shop</a>
            </div>
        </div>
    </footer>
}

export {Footer}