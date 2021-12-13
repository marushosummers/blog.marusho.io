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
			<style jsx>{`
				.adslot-inline { max-height: 60px; }
				@media(min-width: 768px) { .adslot-inline { max-height: 100px; } }
			`}</style>
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
