import Logo from "./Logo"
import Container from "../Global/Container"
import NavSearch from "./NavSearch"
import CartButton from "./CartButton"
import DarkMode from "./DarkMode"
import LinksDropdown from "./LinksDropdown"

function NavBar() {
    return (
        <nav className="border-b">
            <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap py-8 gap-4">
                <Logo />
                <NavSearch />
                <div className="flex gap-4 items-center">
                    <CartButton />
                    <DarkMode />
                    <LinksDropdown />
                </div>
            </Container>
        </nav>
    )
}
export default NavBar