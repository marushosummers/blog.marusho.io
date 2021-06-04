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
		<div>
			<FacebookShareButton url={articleUrl}>
				<FacebookIcon size={30} round />
			</FacebookShareButton>

			<LineShareButton url={articleUrl}>
				<LineIcon size={30} round />
			</LineShareButton>

			<TwitterShareButton title={title} via="@marusho_summers" url={articleUrl}>
				<TwitterIcon size={30} round />
			</TwitterShareButton>
		</div>
	);
};
export default SNSSection;
