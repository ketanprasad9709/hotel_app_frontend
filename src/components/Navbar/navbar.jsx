import "./navbar.css";

export const Navbar = () => {
    return (
        <header className="heading d-flex align-center">
            <h1 className="heading-1 text-border">
                <a className="link" href="/">Book My Hotel!</a>
            </h1>
            <div className="form-container d-flex align-center cursor-pointer shadow">
                <span className="form-option">Select Location</span>
                <span className ="border-right-1px"></span>
                <span className="form-option">Select Date</span>
                <span className ="border-right-1px"></span>
                <span className="form-option">Add Guest(s)</span>
                <span className="material-symbols-outlined search">search</span>
            </div>
            <nav className="d-flex align-center gap-large">
                <div className="nav d-flex align-center cursor-pointer">
                    <span className="material-symbols-outlined profile-option menu">menu</span>
                    <span className="material-symbols-outlined profile-option person">account_circle</span>
                </div>
            </nav>

        </header>
    );
};