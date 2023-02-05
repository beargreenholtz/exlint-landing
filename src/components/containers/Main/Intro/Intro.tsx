import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import mixpanel from 'mixpanel-browser';

import IntroView from './Intro.view';

interface IProps {}

const Intro: React.FC<IProps> = () => {
	const { t } = useTranslation();
	const [isCommandCopiedState, seIsCommandCopiedState] = useState<boolean>(false);
	const [isCommandOnHoverState, seIsCommandOnOverState] = useState<boolean>(false);

	const onCopyCommand = async () => {
		seIsCommandCopiedState(() => true);
		seIsCommandOnOverState(() => false);
		mixpanel.track('Copied command button CLICKED / Intro');

		await navigator.clipboard.writeText(t('main.intro.command.text'));

		setTimeout(() => seIsCommandCopiedState(() => false), 2000);
	};

	const onHoverCommand = (isHover: boolean) => {
		seIsCommandOnOverState(() => isHover);
	};

	const onGetStartedNavigate = () => {
		mixpanel.track('Get Statred button CLICKED / Intro');
		window.open('https://docs.exlint.io', '_blank');
	};

	return (
		<IntroView
			isCommandCopied={isCommandCopiedState}
			isCommandOnHover={isCommandOnHoverState}
			onCopyCommand={onCopyCommand}
			onHoverCommand={onHoverCommand}
			onGetStartedNavigate={onGetStartedNavigate}
		/>
	);
};

Intro.displayName = 'Intro';
Intro.defaultProps = {};

export default React.memo(Intro);
