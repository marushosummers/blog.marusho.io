import React, { useEffect } from "react";

// TODO: 環境変数を使うように変更

export default function AdsInlineCard({ path }, slot) {
	useEffect(() => {
		if (window.adsbygoogle && process.env.NODE_ENV !== "development") {
			window.adsbygoogle.push({});
		}
	}, [path]);

	return (
		<>
			<ins
				className="adsbygoogle adslot-inline"
				style={{ display: "block", textAlign: "center" }}
				data-ad-client="ca-pub-7961076646821939"
				data-ad-slot={slot}
				data-ad-format="horizontal"
			></ins>
		</>
	);
}
