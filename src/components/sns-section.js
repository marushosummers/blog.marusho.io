import React from "react";
import {
	FacebookShareButton,
	FacebookIcon,
	LineShareButton,
	LineIcon,
	TwitterShareButton,
	TwitterIcon,
} from "react-share";

const SNSSection = ({ title, articleUrl }) => {
	return (
		<div className="share">
			<div className="share_icon">
				<FacebookShareButton url={articleUrl}>
					<FacebookIcon size={28} round bgStyle={{fill: "black"}}/>
				</FacebookShareButton>
			</div>
			<div className="share_icon">
				<LineShareButton url={articleUrl}>
					<LineIcon size={28} round bgStyle={{fill: "black"}}/>
				</LineShareButton>
			</div>
			<div className="share_icon">
				<TwitterShareButton
					title={title}
					url={articleUrl}
				>
					<TwitterIcon
						size={28}
						round
						bgStyle={{fill: "black"}}
					/>
				</TwitterShareButton>
			</div>
		</div>
	);
};
export default SNSSection;
