import logo from "../assets/NameLogo.png"

export default function Header() {
	return (
    <header className="site-header">
      <a href="/" target="_self" className="site-header-logo">
        <img className="nameLogo" src={logo} alt="Logo Audtransfer" />
      </a>
    </header>
	)
}