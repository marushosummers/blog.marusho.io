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
				className="adsbygoogle"
				style={{ display: "inline-block", width: "320px", height: "100px" }}
				data-ad-client="ca-pub-7961076646821939"
				data-ad-slot={slot}
				data-full-width-responsive="false"
			></ins>
		</>
	);
}
