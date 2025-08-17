// Dentro de src/Components/ClientView/Body/GemCash/GemCash.js

import React from 'react';
import IntroSection from './IntroSection/IntroSection';
import ProblemSolution from './ProblemSolution/ProblemSolution';
import HowItWorks from './HowItWorks/HowItWorks';

const GemCash = () => {
    return (
        <>
            <IntroSection />
            <ProblemSolution />
            <HowItWorks />
        </>
    );
};

export default GemCash;