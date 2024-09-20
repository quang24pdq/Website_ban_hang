/** @format */

import FooterBottom from "./footerBottom/FooterBottom";
import FooterTop from "./footerTop/FooterTop";

function Footer({line}) {
	return (
		<div>
			<FooterTop line={line} />
			<FooterBottom />
		</div>
	);
}

export default Footer;
